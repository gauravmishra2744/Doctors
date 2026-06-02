const mongoose=require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    session: { type: String },
    isPaid: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports= mongoose.model("Booking", bookingSchema);
