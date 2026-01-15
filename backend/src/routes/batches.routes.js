// src/routes/batches.routes.js

const express = require('express')
const { createBatch, listBatches, getBatch, updateBatch, deleteBatch } = require('../controllers/batch.controller.js')

const router = express.Router()

router.post('/', createBatch)
router.get('/', listBatches)
router.get('/:id', getBatch)
router.put('/:id', updateBatch)
router.delete('/:id', deleteBatch)

module.exports = router
