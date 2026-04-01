const express = require('express');
const router = express.Router();
const { purchasePolicy, getMyPolicies, fileClaim, getMyClaims, verifyRenewal, requestRenewal } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/policies', protect, purchasePolicy);
router.get('/policies', protect, getMyPolicies);
router.post('/claims', protect, fileClaim);
router.get('/claims', protect, getMyClaims);

// Renewal endpoints
router.post('/renew/verify', verifyRenewal);
router.post('/renew/submit', requestRenewal);

module.exports = router;
