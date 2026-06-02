const Doctor = require('../models/DoctorSchema');
const Booking = require('../models/BookingSchema');
const express = require('express');
const reviewRouter=require('./review');
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

const updateDoctor = async (req, res) => {
    const id = req.params.id;
    // console.log(req.body)
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).json({ success: true, message: 'Successfully updated', data: updatedDoctor });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed' });
    }
};

const deleteDoctor = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Successfully deleted', data: deletedDoctor });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed' });
    }
};

const getSingleDoctor = async (req, res) => {
    const id = req.params.id;
    try {
        const doctor = await Doctor.findById(id).populate('reviews').select('-password');
        if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });
        res.status(200).json({ success: true, message: 'Successfully found', data: doctor });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed' });
    }
};


const getAllDoctor = async (req, res) => {
    try {
        // console.log(req);
        const query=req.query.search;
        // console.log(query);
        let doctors;
        if(query){
            doctors=await Doctor.find({
                isApproved: "approved",
                $or: [
                    {name: {$regex: query, $options: "i"}},
                    {specialization: {$regex: query, $options: "i"}},
                ],
                
            }).select('-password');
        }  else {
            doctors = await Doctor.find({isApproved: "approved"}).select('-password');
        }
        res.status(200).json({ success: true, message: 'Successfully found', data: doctors });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed' });
    }
};

const getDoctorProfile = async(req, res)=>{
    // console.log(req.user);
    const doctorId=req.user._id;

    try{
        const doctor=await Doctor.findById(doctorId);

        if(!doctor){
            return res.status(404).json({success: false, message: "Doctor not found"});
        }

        const appointments=await Booking.find({doctor: doctorId}).populate('user');

        const {password, ...rest} = doctor._doc;

        res.status(200).json({success: true, message: "Profile info is getting", data: {...rest, appointments}});
    }
    catch(err){
        res.status(500).json({ success: false, message: 'Something went wrong, cannot get' });
    }
};

const router = express.Router();

router.use('/:doctorId/review', reviewRouter);
router.get('/profile/me', jwtAuth, restrict(["doctor"]), getDoctorProfile);
router.get('/:id', getSingleDoctor);
router.get('/', getAllDoctor);
router.put('/:id', jwtAuth, restrict(["doctor"]), updateDoctor);
router.delete('/:id', jwtAuth, restrict(["doctor"]), deleteDoctor);

module.exports= router;