const User = require('../models/UserSchema');
const Booking = require('../models/BookingSchema');
const Doctor = require('../models/DoctorSchema');
const express = require('express');
const passport = require('passport');

const router = express.Router();

const jwtAuth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err) return res.status(500).json({ success: false, message: 'Auth error' });
        if (!user) return res.status(401).json({ success: false, message: 'Unauthorized. Please login.' });
        req.user = user;
        next();
    })(req, res, next);
};

const getCheckoutSession = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.doctorId);
        if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found!' });

        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found! Please login as a patient.' });

        const booking = new Booking({
            doctor: doctor._id,
            user: user._id,
            ticketPrice: doctor.ticketPrice,
            session: 'direct_' + Date.now(),
            isPaid: true
        });

        const savedBooking = await booking.save();

        await Doctor.findByIdAndUpdate(doctor._id, { $push: { appointments: savedBooking._id } });
        await User.findByIdAndUpdate(user._id, { $push: { appointments: savedBooking._id } });

        res.status(200).json({
            success: true,
            message: 'Appointment booked successfully!',
            session: { url: `${process.env.CLIENT_SITE_URL}/checkout-success` }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: err.message || 'Error creating checkout session!' });
    }
};

router.post('/checkout-session/:doctorId', jwtAuth, getCheckoutSession);

module.exports = router;