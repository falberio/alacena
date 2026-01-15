// src/routes/containers.routes.js

import express from 'express'
import { createContainer, listContainers, getContainer, updateContainer, deleteContainer } from '../controllers/container.controller.js'

const router = express.Router()

router.post('/', createContainer)
router.get('/', listContainers)
router.get('/:id', getContainer)
router.put('/:id', updateContainer)
router.delete('/:id', deleteContainer)

module.exports = router
