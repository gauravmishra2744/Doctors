const express=require('express');
const passport=require('passport');
const router = express.Router({mergeParams: true});
const Review=require('../models/ReviewSchema');
const Doctor=require('../models/DoctorSchema');
const { restrict } =  require( '../utils/helpers');

const getAllReviews=async(req, res)=>{
    try{
        const reviews=await Review.find({});

        res.status(200).json({success: true, messsage: "Successful", data: reviews});
    }
    catch(err){
        res.status(404).json({success: false, messsage: "Not found!"})
    }
}

const createReview = async (req, res) => {
    // console.log(req.user);
    if (!req.body.doctor) req.body.doctor = req.params.doctorId;
    if (!req.body.user) req.body.user = req.user._id;

    const newReview = new Review(req.body);

    try {
        const savedReview = await newReview.save(); // Use await here
        // console.log(savedReview); // Log savedReview._doc instead of savedReview
        await Doctor.findByIdAndUpdate(req.body.doctor, {
            $push: { reviews: savedReview._id }
        });

        res.status(200).json({ success: true, message: "Review Submitted", data: savedReview});
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};


router.get('/', getAllReviews);
router.post('/', passport.authenticate("jwt", {session: false}), restrict(["patient"]), createReview);
module.exports=router;