// src/controllers/menuItem.controller.js

import prisma from '../prisma/client.js'
import { CreateMenuItemSchema, UpdateMenuItemSchema, FilterMenuItemSchema } from '../schemas/menuItem.schema.js'

async function createMenuItem(req, res) {
  try {
    const data = CreateMenuItemSchema.parse(req.body)
    const menuItem = await prisma.menuItem.create({
      data,
      include: { item: true }
    })
    res.status(201).json(menuItem)
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: 'Datos inválidos', details: error.errors })
    }
    res.status(500).json({ error: 'Error al crear menuItem', message: error.message })
  }
}

async function listMenuItems(req, res) {
  try {
    const filters = FilterMenuItemSchema.parse(req.query)
    
    const where = {}
    if (filters.section) where.section = filters.section
    if (filters.isActive !== undefined) where.isActive = filters.isActive
    
    const [menuItems, total] = await Promise.all([
      prisma.menuItem.findMany({
        where,
        include: { item: true },
        take: filters.limit,
        skip: filters.offset,
        orderBy: { name: 'asc' }
      }),
      prisma.menuItem.count({ where })
    ])
    
    res.json({ data: menuItems, pagination: { total, limit: filters.limit, offset: filters.offset, hasMore: filters.offset + filters.limit < total } })
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: 'Filtros inválidos', details: error.errors })
    }
    res.status(500).json({ error: 'Error al listar menuItems', message: error.message })
  }
}

async function getMenuItem(req, res) {
  try {
    const { id } = req.params
    const menuItem = await prisma.menuItem.findUnique({
      where: { id },
      include: { item: true }
    })
    if (!menuItem) {
      return res.status(404).json({ error: 'MenuItem no encontrado' })
    }
    res.json(menuItem)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener menuItem', message: error.message })
  }
}

async function updateMenuItem(req, res) {
  try {
    const { id } = req.params
    const data = UpdateMenuItemSchema.parse(req.body)
    const menuItem = await prisma.menuItem.update({
      where: { id },
      data,
      include: { item: true }
    })
    res.json(menuItem)
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'MenuItem no encontrado' })
    }
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: 'Datos inválidos', details: error.errors })
    }
    res.status(500).json({ error: 'Error al actualizar menuItem', message: error.message })
  }
}

async function deleteMenuItem(req, res) {
  try {
    const { id } = req.params
    await prisma.menuItem.delete({ where: { id } })
    res.status(204).send()
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'MenuItem no encontrado' })
    }
    res.status(500).json({ error: 'Error al eliminar menuItem', message: error.message })
  }
}

export {
  createMenuItem,
  listMenuItems,
  getMenuItem,
  updateMenuItem,
  deleteMenuItem,
}
