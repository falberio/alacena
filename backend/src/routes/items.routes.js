// src/routes/items.routes.js

import express from 'express'
import {
  createItem,
  listItems,
  getItem,
  updateItem,
  deleteItem,
} from '../controllers/item.controller.js'

const router = express.Router()

router.post('/', createItem)
router.get('/', listItems)
router.get('/:id', getItem)
router.put('/:id', updateItem)
router.delete('/:id', deleteItem)

export default router
