const Policy = require('../models/Policy');
const Claim = require('../models/Claim');

const purchasePolicy = async (req, res) => {
  try {
    const { planId, durationYears, handlerId } = req.body;
    if (!handlerId) return res.status(400).json({ message: 'Please select a handler (admin) for your policy.' });
    
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + Number(durationYears));

    const policy = await Policy.create({
      user: req.user._id,
      plan: planId,
      handler: handlerId,
      endDate,
      policyNumber: 'IND' + Date.now() + Math.floor(Math.random() * 1000)
    });
    res.status(201).json(policy);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMyPolicies = async (req, res) => {
  try {
    const policies = await Policy.find({ user: req.user._id }).populate('plan').populate('handler', 'name email');
    res.json(policies);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const fileClaim = async (req, res) => {
  try {
    const { policyId, description, claimAmount } = req.body;
    const policy = await Policy.findOne({ _id: policyId, user: req.user._id }).populate('plan');
    if (!policy) return res.status(404).json({ message: 'Policy not found or unauthorized' });
    
    // Logic Validations
    if (new Date() > new Date(policy.endDate)) {
      return res.status(400).json({ message: 'Cannot file a claim on an expired policy.' });
    }
    if (claimAmount <= 0) {
      return res.status(400).json({ message: 'Claim amount must be greater than zero.' });
    }
    if (policy.plan && claimAmount > policy.plan.coverageAmount) {
      return res.status(400).json({ message: `Claim exceeds maximum policy coverage of ₹${policy.plan.coverageAmount.toLocaleString('en-IN')}` });
    }

    const claim = await Claim.create({ user: req.user._id, policy: policyId, description, claimAmount });
    res.status(201).json(claim);
  } catch (error) { res.status(400).json({ message: error.message }); }
};

const getMyClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ user: req.user._id }).populate({ path: 'policy', populate: [{ path: 'plan' }, { path: 'handler', select: 'name email' }] });
    res.json(claims);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const verifyRenewal = async (req, res) => {
  try {
    const { policyNumber, email } = req.body;
    const policy = await Policy.findOne({ policyNumber }).populate('plan').populate('user', 'email');
    if (!policy || policy.user.email !== email) {
      return res.status(404).json({ message: 'Invalid policy number or email credentials.' });
    }
    if (policy.renewalStatus === 'pending') {
      return res.status(400).json({ message: 'A renewal request for this policy is already pending.' });
    }
    res.json({
      policyNumber: policy.policyNumber,
      premium: policy.plan.premiumAmount,
      planTitle: policy.plan.title,
      endDate: policy.endDate,
      policyId: policy._id
    });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

const requestRenewal = async (req, res) => {
  try {
    const { policyId } = req.body;
    const policy = await Policy.findById(policyId);
    if (!policy) return res.status(404).json({ message: 'Policy not found.' });
    policy.renewalStatus = 'pending';
    await policy.save();
    res.json({ message: 'Renewal request submitted to advisor.' });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

module.exports = { purchasePolicy, getMyPolicies, fileClaim, getMyClaims, verifyRenewal, requestRenewal };
