const mongoose = require('mongoose');
const Doctor = require('./DoctorSchema');
const { stat } = require('fs');
const reviewSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name photo"
  });
  next();
});

reviewSchema.statics.calcAvgRatings = async function (doctorId) {
  const stats = await this.aggregate([
    {
      $match: { doctor: doctorId },
    },
    {
      $group: {
        _id: "$doctor",
        numOfRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  if (stats.length > 0) {
    // console.log(stats);
    await Doctor.findByIdAndUpdate(doctorId, {
      totalRating: stats[0].numOfRating,
      averageRating: stats[0].avgRating,
    });
  } else {
    // Handle the case where there are no reviews for the doctor
    // You may want to update Doctor with default values or handle it accordingly
    console.log("No reviews found for the doctor.");
  }
};


reviewSchema.post("save", function () {
  this.constructor.calcAvgRatings(this.doctor);
})


module.exports = mongoose.model("Review", reviewSchema);
