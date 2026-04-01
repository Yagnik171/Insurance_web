const Plan = require('../models/Plan');
const User = require('../models/User');
const Claim = require('../models/Claim');
const Policy = require('../models/Policy');

const createPlan = async (req, res) => {
  try { const plan = await Plan.create(req.body); res.status(201).json(plan); }
  catch (error) { res.status(400).json({ message: error.message }); }
};
const updatePlan = async (req, res) => {
  try { const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true }); if (!plan) return res.status(404).json({ message: 'Plan not found' }); res.json(plan); }
  catch (error) { res.status(400).json({ message: error.message }); }
};
const deletePlan = async (req, res) => {
  try { const plan = await Plan.findByIdAndDelete(req.params.id); if (!plan) return res.status(404).json({ message: 'Plan not found' }); res.json({ message: 'Plan removed' }); }
  catch (error) { res.status(400).json({ message: error.message }); }
};

// Admin sees users who chose THEM as handler on any policy
const getAllUsers = async (req, res) => {
  try {
    const myPolicies = await Policy.find({ handler: req.user._id }).select('user');
    const userIds = [...new Set(myPolicies.map(p => p.user.toString()))];
    const users = await User.find({ _id: { $in: userIds } }).select('-password');
    res.json(users);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// Admin sees policies where they are the handler
const getAllPolicies = async (req, res) => {
  try {
    const policies = await Policy.find({ handler: req.user._id }).populate('plan').populate('user', 'name email');
    res.json(policies);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// Admin sees claims on policies they handle
const getAllClaims = async (req, res) => {
  try {
    const myPolicies = await Policy.find({ handler: req.user._id }).select('_id');
    const policyIds = myPolicies.map(p => p._id);
    const claims = await Claim.find({ policy: { $in: policyIds } })
      .populate('user', 'name email')
      .populate({ path: 'policy', populate: { path: 'plan' } });
    res.json(claims);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const updateClaimStatus = async (req, res) => {
  try {
    const { status, adminRemarks } = req.body;
    const claim = await Claim.findById(req.params.id).populate('policy');
    if (!claim) return res.status(404).json({ message: 'Claim not found' });
    
    // Authorization Check
    if (claim.policy.handler.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized: You are not the handler for this policy.' });
    }

    claim.status = status || claim.status;
    claim.adminRemarks = adminRemarks || claim.adminRemarks;
    await claim.save();
    res.json(claim);
  } catch (error) { res.status(400).json({ message: error.message }); }
};

const updateRenewalStatus = async (req, res) => {
  try {
    const { status } = req.body; // 'approved' or 'rejected'
    const policy = await Policy.findById(req.params.id).populate('plan');
    if (!policy) return res.status(404).json({ message: 'Policy not found' });
    if (policy.handler.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    if (status === 'approved') {
      // Extend end date by plan duration
      const currentEnd = new Date(policy.endDate);
      currentEnd.setFullYear(currentEnd.getFullYear() + policy.plan.durationYears);
      policy.endDate = currentEnd;
      policy.renewalStatus = 'none';
    } else if (status === 'rejected') {
      policy.renewalStatus = 'rejected';
    }
    
    await policy.save();
    res.json(policy);
  } catch (error) { res.status(400).json({ message: error.message }); }
};

module.exports = { createPlan, updatePlan, deletePlan, getAllUsers, getAllPolicies, getAllClaims, updateClaimStatus, updateRenewalStatus };
