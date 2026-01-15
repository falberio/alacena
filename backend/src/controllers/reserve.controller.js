// src/controllers/reserve.controller.js
// Lógica de negocio para Reserves (CRUD + validaciones)

import prisma from '../prisma/client.js'
import { CreateReserveSchema, UpdateReserveSchema, FilterReserveSchema } from '../schemas/reserve.schema.js'

/**
 * Crear una nueva reserva
 * Valida que el item y ubicación existan antes de crear
 */
async function createReserve(req, res) {
  try {
    // Validar datos del request
    const data = CreateReserveSchema.parse(req.body)
    
    // Verificar que el item exista
    const item = await prisma.item.findUnique({
      where: { id: data.itemId }
    })
    
    if (!item) {
      return res.status(404).json({ 
        error: 'Item no encontrado',
        itemId: data.itemId 
      })
    }
    
    // Crear la reserva
    const reserve = await prisma.reserve.create({
      data,
      include: {
        item: true,
        location: true,
        container: true,
        batch: true,
      }
    })
    
    res.status(201).json(reserve)
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ 
        error: 'Datos inválidos',
        details: error.errors 
      })
    }
    
    res.status(500).json({ 
      error: 'Error al crear reserva',
      message: error.message 
    })
  }
}

/**
 * Obtener todas las reservas con filtros opcionales
 */
async function listReserves(req, res) {
  try {
    const filters = FilterReserveSchema.parse(req.query)
    
    // Construir where dinámicamente
    const where = {}
    if (filters.status) where.status = filters.status
    if (filters.itemId) where.itemId = filters.itemId
    if (filters.locationId) where.locationId = filters.locationId
    
    const [reserves, total] = await Promise.all([
      prisma.reserve.findMany({
        where,
        include: {
          item: true,
          location: true,
          container: true,
        },
        take: filters.limit,
        skip: filters.offset,
        orderBy: { createdOn: 'desc' }
      }),
      prisma.reserve.count({ where })
    ])
    
    res.json({
      data: reserves,
      pagination: {
        total,
        limit: filters.limit,
        offset: filters.offset,
        hasMore: filters.offset + filters.limit < total
      }
    })
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ 
        error: 'Filtros inválidos',
        details: error.errors 
      })
    }
    
    res.status(500).json({ 
      error: 'Error al listar reservas',
      message: error.message 
    })
  }
}

/**
 * Obtener una reserva por ID
 */
async function getReserve(req, res) {
  try {
    const { id } = req.params
    
    const reserve = await prisma.reserve.findUnique({
      where: { id },
      include: {
        item: true,
        location: true,
        container: true,
        batch: true,
        parentReserve: true,
        childReserves: true,
      }
    })
    
    if (!reserve) {
      return res.status(404).json({ 
        error: 'Reserva no encontrada',
        id 
      })
    }
    
    res.json(reserve)
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al obtener reserva',
      message: error.message 
    })
  }
}

/**
 * Actualizar una reserva
 */
async function updateReserve(req, res) {
  try {
    const { id } = req.params
    const data = UpdateReserveSchema.parse(req.body)
    
    // Verificar que la reserva exista
    const existing = await prisma.reserve.findUnique({
      where: { id }
    })
    
    if (!existing) {
      return res.status(404).json({ 
        error: 'Reserva no encontrada',
        id 
      })
    }
    
    const updated = await prisma.reserve.update({
      where: { id },
      data,
      include: {
        item: true,
        location: true,
        container: true,
      }
    })
    
    res.json(updated)
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ 
        error: 'Datos inválidos',
        details: error.errors 
      })
    }
    
    res.status(500).json({ 
      error: 'Error al actualizar reserva',
      message: error.message 
    })
  }
}

/**
 * Eliminar una reserva
 */
async function deleteReserve(req, res) {
  try {
    const { id } = req.params
    
    // Verificar que exista
    const existing = await prisma.reserve.findUnique({
      where: { id }
    })
    
    if (!existing) {
      return res.status(404).json({ 
        error: 'Reserva no encontrada',
        id 
      })
    }
    
    // Eliminar
    await prisma.reserve.delete({
      where: { id }
    })
    
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al eliminar reserva',
      message: error.message 
    })
  }
}

/**
 * Marcar una reserva como consumida
 */
async function consumeReserve(req, res) {
  try {
    const { id } = req.params
    
    const reserve = await prisma.reserve.update({
      where: { id },
      data: { status: 'CONSUMED' },
      include: { item: true }
    })
    
    res.json(reserve)
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Reserva no encontrada' })
    }
    
    res.status(500).json({ 
      error: 'Error al marcar como consumida',
      message: error.message 
    })
  }
}

export {
  createReserve,
  listReserves,
  getReserve,
  updateReserve,
  deleteReserve,
  consumeReserve,
}
