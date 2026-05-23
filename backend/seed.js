const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();
const Doctor = require('./models/DoctorSchema');

const doctors = [
  {
    name: "Dr. Alfaz Ahmed",
    email: "alfaz@medicare.com",
    password: "doctor123",
    phone: 9876543210,
    photo: "https://randomuser.me/api/portraits/men/11.jpg",
    gender: "male",
    specialization: "Surgeon",
    ticketPrice: 500,
    role: "doctor",
    bio: "Experienced surgeon with 10+ years.",
    about: "Dr. Alfaz Ahmed is a top surgeon specializing in general surgery.",
    qualifications: [{ startingDate: "2010-01-01", endingDate: "2014-01-01", degree: "MBBS", university: "AIIMS Delhi" }],
    experiences: [{ startingDate: "2014-01-01", endingDate: "2024-01-01", position: "Senior Surgeon", hospital: "Apollo Hospital" }],
    timeSlots: [{ day: "Monday", startingTime: "10:00", endingTime: "14:00" }, { day: "Wednesday", startingTime: "10:00", endingTime: "14:00" }],
    averageRating: 4.5,
    totalRating: 20,
    isApproved: "approved"
  },
  {
    name: "Dr. Saleh Mahmud",
    email: "saleh@medicare.com",
    password: "doctor123",
    phone: 9876543211,
    photo: "https://randomuser.me/api/portraits/men/22.jpg",
    gender: "male",
    specialization: "Neurologist",
    ticketPrice: 700,
    role: "doctor",
    bio: "Expert neurologist with 8 years experience.",
    about: "Dr. Saleh Mahmud specializes in brain and nervous system disorders.",
    qualifications: [{ startingDate: "2008-01-01", endingDate: "2012-01-01", degree: "MBBS", university: "PGI Chandigarh" }],
    experiences: [{ startingDate: "2012-01-01", endingDate: "2024-01-01", position: "Neurologist", hospital: "Fortis Hospital" }],
    timeSlots: [{ day: "Tuesday", startingTime: "09:00", endingTime: "13:00" }, { day: "Thursday", startingTime: "09:00", endingTime: "13:00" }],
    averageRating: 4.8,
    totalRating: 35,
    isApproved: "approved"
  },
  {
    name: "Dr. Priya Sharma",
    email: "priya@medicare.com",
    password: "doctor123",
    phone: 9876543212,
    photo: "https://randomuser.me/api/portraits/women/33.jpg",
    gender: "female",
    specialization: "Dermatologist",
    ticketPrice: 400,
    role: "doctor",
    bio: "Skin specialist with 6 years experience.",
    about: "Dr. Priya Sharma is a certified dermatologist treating skin conditions.",
    qualifications: [{ startingDate: "2012-01-01", endingDate: "2016-01-01", degree: "MBBS", university: "JIPMER" }],
    experiences: [{ startingDate: "2016-01-01", endingDate: "2024-01-01", position: "Dermatologist", hospital: "Max Hospital" }],
    timeSlots: [{ day: "Monday", startingTime: "11:00", endingTime: "15:00" }, { day: "Friday", startingTime: "11:00", endingTime: "15:00" }],
    averageRating: 4.6,
    totalRating: 28,
    isApproved: "approved"
  }
];

async function seed() {
  await mongoose.connect(process.env.URL);
  console.log('Connected to DB');

  for (let doc of doctors) {
    const exists = await Doctor.findOne({ email: doc.email });
    if (!exists) {
      doc.password = await bcrypt.hash(doc.password, 10);
      await Doctor.create(doc);
      console.log(`Created: ${doc.name}`);
    } else {
      console.log(`Already exists: ${doc.name}`);
    }
  }

  console.log('Seeding done!');
  process.exit();
}

seed().catch(err => { console.error(err); process.exit(1); });
