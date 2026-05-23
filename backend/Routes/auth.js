const express = require('express');
const router = express.Router();
const User = require('../models/UserSchema');
const Doctor = require('../models/DoctorSchema');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { getToken } = require('../utils/helpers');
const app = express();

router.post('/register', async (req, res) => {
    // Extracting user details from the request body
    const { email, password, name, role, photo, gender } = req.body;
    // console.log(photo);

    try {
        // Check if user with the same email already exists
        const existingUser = role === 'user' ? await User.findOne({ email }) : await Doctor.findOne({ email });

        if (existingUser) {
            return res.status(403).json({ error: "A user with this email already exists" });
        }

        // Hash the password using bcrypt
        const hashPass = await bcrypt.hash(password, 10);

        // Create a new user based on the role
        let user;
        if (role === 'patient') {
            user = new User({ name, email, password: hashPass, gender, role, photo});
        } else if (role === 'doctor') {
            user = new Doctor({ name, email, password: hashPass, gender, role, photo});
        }
        // console.log(user);
        // Save the user to the database
        await user.save();

        // Prepare user data to return in the response
        const userToReturn = { ...user.toJSON() };
        // Remove the password from the response for security reasons
        delete userToReturn.password;

        res.status(200).json({ user: userToReturn, success: true });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

// Login endpoint
router.post('/login', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }).withMessage('should contain min 5 char'),
], async (req, res) => {

    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(400).json({ err: result.array() });
    }

    try {
        let email = req.body.email;
        let userData = null;
        const patient = await User.findOne({ email });
        const doctor = await Doctor.findOne({ email });
        if (patient) {
            userData = patient;
        }
        else if (doctor) {
            userData = doctor;
        }

        if (!userData) {
            return res.status(400).json({ err: 'Email not found! Enter correct email' });
        }

        // Compare the provided password with the hashed password stored in the database
        const isValidPass = await bcrypt.compare(req.body.password, userData.password);

        // If the password is not valid, return a 403 status with an error message
        if (!isValidPass) {
            return res.status(400).json({ err: 'Enter valid Credentials' });
        }

        const jwtPayload = {
            id: userData._id,
            role: userData.role,  // 'patient' or 'doctor'
        };
        const token = await getToken(userData.email, jwtPayload);

        // Prepare user data to return in the response
        const userToReturn = { ...userData.toJSON()};
        // Remove the password from the response for security reasons
        delete userToReturn.password;
        return res.status(200).json({data: userToReturn, token: token});
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Internal server error' });
    }
});

module.exports=router;

