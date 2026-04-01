const express = require('express');
const router = express.Router();
const { createPlan, updatePlan, deletePlan, getAllUsers, getAllPolicies, getAllClaims, updateClaimStatus, updateRenewalStatus } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.post('/plans', protect, admin, createPlan);
router.put('/plans/:id', protect, admin, updatePlan);
router.delete('/plans/:id', protect, admin, deletePlan);

router.get('/users', protect, admin, getAllUsers);
router.get('/policies', protect, admin, getAllPolicies); // New Endpoint for CRM
router.get('/claims', protect, admin, getAllClaims);
router.put('/claims/:id', protect, admin, updateClaimStatus);
router.put('/policies/:id/renew', protect, admin, updateRenewalStatus);

module.exports = router;
