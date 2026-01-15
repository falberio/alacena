// src/routes/items.routes.js

const express = require('express')
const {
  createItem,
  listItems,
  getItem,
  updateItem,
  deleteItem,
} = require('../controllers/item.controller.js')

const router = express.Router()

router.post('/', createItem)
router.get('/', listItems)
router.get('/:id', getItem)
router.put('/:id', updateItem)
router.delete('/:id', deleteItem)

module.exports = router