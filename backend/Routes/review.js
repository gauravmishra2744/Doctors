const express = require('express');
const passport = require('passport');
const router = express.Router({ mergeParams: true });
const Review = require('../models/ReviewSchema');
const Doctor = require('../models/DoctorSchema');
const { restrict } = require('../utils/helpers');

const jwtAuth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err) return res.status(500).json({ success: false, message: 'Auth error' });
        if (!user) return res.status(401).json({ success: false, message: 'Unauthorized. Please login.' });
        req.user = user;
        next();
    })(req, res, next);
};

const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({});
        res.status(200).json({ success: true, message: 'Successful', data: reviews });
    } catch (err) {
        res.status(404).json({ success: false, message: 'Not found!' });
    }
};

const createReview = async (req, res) => {
    if (!req.body.doctor) req.body.doctor = req.params.doctorId;
    if (!req.body.user) req.body.user = req.user._id;

    const newReview = new Review(req.body);
    try {
        const savedReview = await newReview.save();
        await Doctor.findByIdAndUpdate(req.body.doctor, {
            $push: { reviews: savedReview._id }
        });
        res.status(200).json({ success: true, message: 'Review Submitted', data: savedReview });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

router.get('/', getAllReviews);
router.post('/', jwtAuth, restrict(['patient']), createReview);
module.exports = router;
