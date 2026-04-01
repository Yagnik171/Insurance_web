const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User with this email already exists' });

    const finalRole = (role === 'admin') ? 'admin' : 'user';

    const user = await User.create({ name, email, password, role: finalRole, phone });

    res.status(201).json({
      _id: user.id, name: user.name, email: user.email, role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password, roleAttempt } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      if (roleAttempt && roleAttempt !== user.role) {
        return res.status(403).json({ message: `Access Denied. You are not an ${roleAttempt === 'admin' ? 'Administrator' : 'standard User'}.` });
      }
      res.json({
        _id: user.id, name: user.name, email: user.email, role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Public endpoint: get list of all admins (for user to pick handler)
const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' }).select('name email _id');
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser, getAdmins };
