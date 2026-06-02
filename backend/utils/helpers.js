const User = require('../models/UserSchema');
const Doctor = require('../models/DoctorSchema');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.SECRET;

const getToken = async (email, user) => {
    const token = jwt.sign(
        { identifier: user.identifier, role: user.role },
        SECRET,
        { expiresIn: '7d' }
    );
    return token;
};

const restrict = roles => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(401).json({ success: false, message: 'You are not authorized!' });
    }
    next();
};

module.exports = { getToken, restrict };
