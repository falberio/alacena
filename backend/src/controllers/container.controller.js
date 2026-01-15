// src/controllers/container.controller.js

import prisma from '../prisma/client.js'
import { CreateContainerSchema, UpdateContainerSchema, FilterContainerSchema } from '../schemas/container.schema.js'

async function createContainer(req, res) {
  try {
    const data = CreateContainerSchema.parse(req.body)
    const container = await prisma.container.create({
      data,
      include: { type: true, location: true }
    })
    res.status(201).json(container)
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: 'Datos inválidos', details: error.errors })
    }
    res.status(500).json({ error: 'Error al crear container', message: error.message })
  }
}

async function listContainers(req, res) {
  try {
    const filters = FilterContainerSchema.parse(req.query)
    
    const where = {}
    if (filters.typeId) where.typeId = filters.typeId
    if (filters.locationId) where.locationId = filters.locationId
    
    const [containers, total] = await Promise.all([
      prisma.container.findMany({
        where,
        include: { type: true, location: true },
        take: filters.limit,
        skip: filters.offset,
        orderBy: { code: 'asc' }
      }),
      prisma.container.count({ where })
    ])
    
    res.json({ data: containers, pagination: { total, limit: filters.limit, offset: filters.offset, hasMore: filters.offset + filters.limit < total } })
  } catch (error) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: 'Filtros inválidos', details: error.errors })
    }
    res.status(500).json({ error: 'Error al listar containers', message: error.message })
  }
}

async function getContainer(req, res) {
  try {
    const { id } = req.params
    const container = await prisma.container.findUnique({
      where: { id },
      include: { type: true, location: true, reserves: true }
    })
    if (!container) {
      return res.status(404).json({ error: 'Container no encontrado' })
    }
    res.json(container)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener container', message: error.message })
  }
}

async function updateContainer(req, res) {
  try {
    const { id } = req.params
    const data = UpdateContainerSchema.parse(req.body)
    const container = await prisma.container.update({
      where: { id },
      data,
      include: { type: true, location: true }
    })
    res.json(container)
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Container no encontrado' })
    }
    if (error.name === 'ZodError') {
      return res.status(400).json({ error: 'Datos inválidos', details: error.errors })
    }
    res.status(500).json({ error: 'Error al actualizar container', message: error.message })
  }
}

async function deleteContainer(req, res) {
  try {
    const { id } = req.params
    await prisma.container.delete({ where: { id } })
    res.status(204).send()
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Container no encontrado' })
    }
    res.status(500).json({ error: 'Error al eliminar container', message: error.message })
  }
}

export {
  createContainer,
  listContainers,
  getContainer,
  updateContainer,
  deleteContainer,
}
