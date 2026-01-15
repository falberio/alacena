// src/controllers/item.controller.js

import prisma from '../prisma/client.js'
import { CreateItemSchema, UpdateItemSchema, FilterItemSchema } from '../schemas/item.schema.js'

async function createItem(req, res) {
  try {
    const data = CreateItemSchema.parse(req.body)
    
    const item = await prisma.item.create({
      data,
      include: { recipeIngredients: true, menuItems: true }
    })
    
    res.status(201).json(item)
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: 'Datos inválidos', details: error.errors })
    }
    res.status(500).json({ error: 'Error al crear item', message: error.message })
  }
}

async function listItems(req, res) {
  try {
    const filters = FilterItemSchema.parse(req.query)
    
    const where = {}
    if (filters.kind) where.kind = filters.kind
    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { code: { contains: filters.search, mode: 'insensitive' } }
      ]
    }
    
    const [items, total] = await Promise.all([
      prisma.item.findMany({
        where,
        take: filters.limit,
        skip: filters.offset,
        orderBy: { name: 'asc' }
      }),
      prisma.item.count({ where })
    ])
    
    res.json({
      data: items,
      pagination: {
        total,
        limit: filters.limit,
        offset: filters.offset,
        hasMore: filters.offset + filters.limit < total
      }
    })
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: 'Filtros inválidos', details: error.errors })
    }
    res.status(500).json({ error: 'Error al listar items', message: error.message })
  }
}

async function getItem(req, res) {
  try {
    const { id } = req.params
    
    const item = await prisma.item.findUnique({
      where: { id },
      include: { recipeIngredients: true, menuItems: true, reserves: true }
    })
    
    if (!item) {
      return res.status(404).json({ error: 'Item no encontrado' })
    }
    
    res.json(item)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener item', message: error.message })
  }
}

async function updateItem(req, res) {
  try {
    const { id } = req.params
    const data = UpdateItemSchema.parse(req.body)
    
    const item = await prisma.item.update({
      where: { id },
      data,
      include: { recipeIngredients: true, menuItems: true }
    })
    
    res.json(item)
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Item no encontrado' })
    }
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: 'Datos inválidos', details: error.errors })
    }
    res.status(500).json({ error: 'Error al actualizar item', message: error.message })
  }
}

async function deleteItem(req, res) {
  try {
    const { id } = req.params
    
    await prisma.item.delete({ where: { id } })
    
    res.status(204).send()
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Item no encontrado' })
    }
    res.status(500).json({ error: 'Error al eliminar item', message: error.message })
  }
}

export {
  createItem,
  listItems,
  getItem,
  updateItem,
  deleteItem,
}
