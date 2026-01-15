// src/routes/menuItems.routes.js

import express from 'express'
import { createMenuItem, listMenuItems, getMenuItem, updateMenuItem, deleteMenuItem } from '../controllers/menuItem.controller.js'

const router = express.Router()

router.post('/', createMenuItem)
router.get('/', listMenuItems)
router.get('/:id', getMenuItem)
router.put('/:id', updateMenuItem)
router.delete('/:id', deleteMenuItem)

export default router
