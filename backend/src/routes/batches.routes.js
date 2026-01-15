// src/routes/batches.routes.js

import express from 'express'
import { createBatch, listBatches, getBatch, updateBatch, deleteBatch } from '../controllers/batch.controller.js'

const router = express.Router()

router.post('/', createBatch)
router.get('/', listBatches)
router.get('/:id', getBatch)
router.put('/:id', updateBatch)
router.delete('/:id', deleteBatch)

export default router
