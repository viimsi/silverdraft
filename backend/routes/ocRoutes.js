const express = require('express');
const router = express.Router();
const { createOC, getOCs, getOCById, updateOC, deleteOC } = require('../controllers/ocController');

// POST /api/ocs - create a new OC
router.post('/', createOC);

// GET /api/ocs Get all OCs
router.get('/', getOCs);

// GET /api/ocs/:id Get a single OC by ID
router.get('/:id', getOCById);

// PUT /api/ocs/:id Update an OC by ID
router.put('/:id', updateOC);

// DELETE /api/ocs/:id Delete an OC by ID
router.delete('/:id', deleteOC);

module.exports = router;
