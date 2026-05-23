const User = require('../models/UserSchema');
const Doctor = require('../models/DoctorSchema');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.SECRET;

// Creating an exports object for modularization
exports = {};

// Async function to generate a JWT token for a given user
exports.getToken = async (email, user) => {
    // Sign the JWT with the user's identifier, role, and the secret key
    // console.log(user.id);
    const token = jwt.sign({ identifier: user.id, role: user.role }, SECRET, { expiresIn: '7d' });

    // Return the generated token
    return token;
};

exports.restrict = roles => async (req, res, next) => {
    // console.log(req.user._id);
    const userId = req.user._id;

    let user;

    const patient = await User.findById(userId);
    const doctor = await Doctor.findById(userId);

    if (patient) {
        user = patient;
    }
    if (doctor) {
        user = doctor;
    }

    if (!roles.includes(user.role)) {
        return res.status(401).json({ success: false, message: 'You are not authorized!' });
    }

    next();
}

// Exporting the 'getToken' function for use in other parts of the application
module.exports = exports;
