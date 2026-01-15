// src/routes/containers.routes.js

const express = require('express')
const { createContainer, listContainers, getContainer, updateContainer, deleteContainer } = require('../controllers/container.controller.js')

const router = express.Router()

router.post('/', createContainer)
router.get('/', listContainers)
router.get('/:id', getContainer)
router.put('/:id', updateContainer)
router.delete('/:id', deleteContainer)

module.exports = router
