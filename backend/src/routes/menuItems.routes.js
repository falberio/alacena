// src/routes/menuItems.routes.js

const express = require('express')
const { createMenuItem, listMenuItems, getMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menuItem.controller.js')

const router = express.Router()

router.post('/', createMenuItem)
router.get('/', listMenuItems)
router.get('/:id', getMenuItem)
router.put('/:id', updateMenuItem)
router.delete('/:id', deleteMenuItem)

module.exports = router
