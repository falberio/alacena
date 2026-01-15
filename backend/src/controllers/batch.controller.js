// src/controllers/batch.controller.js

import prisma from '../prisma/client.js'
import { CreateBatchSchema, UpdateBatchSchema, FilterBatchSchema } from '../schemas/batch.schema.js'

async function createBatch(req, res) {
  try {
    const data = CreateBatchSchema.parse(req.body)
    const batch = await prisma.batch.create({
      data,
      include: { item: true }
    })
    res.status(201).json(batch)
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: 'Datos inválidos', details: error.errors })
    }
    res.status(500).json({ error: 'Error al crear batch', message: error.message })
  }
}

async function listBatches(req, res) {
  try {
    const filters = FilterBatchSchema.parse(req.query)
    
    const where = {}
    if (filters.itemId) where.itemId = filters.itemId
    
    const [batches, total] = await Promise.all([
      prisma.batch.findMany({
        where,
        include: { item: true },
        take: filters.limit,
        skip: filters.offset,
        orderBy: { createdOn: 'desc' }
      }),
      prisma.batch.count({ where })
    ])
    
    res.json({ data: batches, pagination: { total, limit: filters.limit, offset: filters.offset, hasMore: filters.offset + filters.limit < total } })
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: 'Filtros inválidos', details: error.errors })
    }
    res.status(500).json({ error: 'Error al listar batches', message: error.message })
  }
}

async function getBatch(req, res) {
  try {
    const { id } = req.params
    const batch = await prisma.batch.findUnique({
      where: { id },
      include: { item: true, reserves: true }
    })
    if (!batch) {
      return res.status(404).json({ error: 'Batch no encontrado' })
    }
    res.json(batch)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener batch', message: error.message })
  }
}

async function updateBatch(req, res) {
  try {
    const { id } = req.params
    const data = UpdateBatchSchema.parse(req.body)
    const batch = await prisma.batch.update({
      where: { id },
      data,
      include: { item: true }
    })
    res.json(batch)
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Batch no encontrado' })
    }
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: 'Datos inválidos', details: error.errors })
    }
    res.status(500).json({ error: 'Error al actualizar batch', message: error.message })
  }
}

async function deleteBatch(req, res) {
  try {
    const { id } = req.params
    await prisma.batch.delete({ where: { id } })
    res.status(204).send()
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Batch no encontrado' })
    }
    res.status(500).json({ error: 'Error al eliminar batch', message: error.message })
  }
}

export {
  createBatch,
  listBatches,
  getBatch,
  updateBatch,
  deleteBatch,
}
