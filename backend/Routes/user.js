const User = require('../models/UserSchema');
const Booking = require('../models/BookingSchema');
const Doctor = require('../models/DoctorSchema');
const express = require('express');
const {restrict} = require('../utils/helpers');
const passport = require('passport');

const jwtAuth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err) return res.status(500).json({ success: false, message: 'Auth error' });
        if (!user) return res.status(401).json({ success: false, message: 'Unauthorized. Please login.' });
        req.user = user;
        next();
    })(req, res, next);
};

const updateUser = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });

        if (!updatedUser) {
            // User not found
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Successfully updated
        return res.status(200).json({ success: true, message: 'Successfully updated', data: updatedUser });
    } catch (err) {
        console.error('Error updating user:', err);
        return res.status(500).json({ success: false, message: 'Failed to update user' });
    }
};


const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Successfully deleted', data: deletedUser });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed' });
    }
};

const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id).select('-password');
        // console.log('User:', user);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, message: 'Successfully found', data: user });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ success: false, message: 'Failed' });
    }
};


const getAllUser = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.status(200).json({ success: true, message: 'Successfully found', data: users });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed' });
    }
};

const getUserProfile = async(req, res)=>{
    // console.log(req);
    const userId=req.user._id;

    try{
        const user=await User.findById(userId);

        if(!user){
            return res.status(404).json({success: false, message: "User not found"});
        }

        const {password, ...rest} = user._doc;

        res.status(200).json({success: true, message: "Profile info is getting", data: {...rest}});
    }
    catch(err){
        res.status(500).json({ success: false, message: 'Something went wrong, cannot get' });
    }
};


const getMyAppointments = async (req, res) => {
    try {
        // Step 1: Retrieve appointments from bookings for the specific user
        const bookings = await Booking.find({ user: req.user._id });

        // Step 2: Extract doctor IDs from the appointment bookings
        const doctorIds = bookings.map((booking) => booking.doctor);

        // Step 3: Retrieve doctors using doctor IDs
        const doctors = await Doctor.find({ _id: { $in: doctorIds } }).select("-password");
        // console.log(doctors);
        res.status(200).json({ success: true, message: "Appointments retrieved", data: doctors });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Something went wrong, cannot get appointments' });
    }
};



const router = express.Router();

router.get('/profile/me', jwtAuth, restrict(["patient"]), getUserProfile);
router.get('/appointments/my-appointments', jwtAuth, restrict(["patient"]), getMyAppointments);
router.get('/:id', jwtAuth, restrict(["patient"]), getSingleUser);
router.get('/', jwtAuth, restrict(["admin"]), getAllUser);
router.put('/:id', jwtAuth, restrict(["patient"]), updateUser);
router.delete('/:id', jwtAuth, restrict(["patient"]), deleteUser);

module.exports= router;