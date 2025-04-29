const express = require('express');
const router = express.Router();
const { createOC, getOCs, getOCById, getOCByUserId, updateOC, deleteOC } = require('../controllers/ocController');
const { protect } = require('../middleware/authMiddleware'); // Import the protect middleware

//PUBLIC
// GET /api/ocs - Get all OCs
router.get('/', getOCs);

// GET /api/ocs/:id - Get a single OC by ID
router.get('/:id', getOCById);

// GET /api/ocs/user/:userId - Get OCs by user ID
router.get('/user/:userId', getOCByUserId);


//PROTECTED
// POST /api/ocs - create a new OC
router.post('/', protect, createOC);

// PUT /api/ocs/:id - Update an OC by ID
router.put('/:id', protect, updateOC);

// DELETE /api/ocs/:id - Delete an OC by ID
router.delete('/:id', protect, deleteOC);

module.exports = router;
