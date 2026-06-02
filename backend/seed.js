const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();
const Doctor = require('./models/DoctorSchema');
const User = require('./models/UserSchema');

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
    about: "Dr. Alfaz Ahmed is a top surgeon specializing in general surgery with over 10 years of experience at Apollo Hospital.",
    qualifications: [{ startingDate: "2010-01-01", endingDate: "2014-01-01", degree: "MBBS", university: "AIIMS Delhi" }],
    experiences: [{ startingDate: "2014-01-01", endingDate: "2024-01-01", position: "Senior Surgeon", hospital: "Apollo Hospital" }],
    timeSlots: [{ day: "monday", startingTime: "10:00", endingTime: "14:00" }, { day: "wednesday", startingTime: "10:00", endingTime: "14:00" }],
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
    about: "Dr. Saleh Mahmud specializes in brain and nervous system disorders with extensive research experience.",
    qualifications: [{ startingDate: "2008-01-01", endingDate: "2012-01-01", degree: "MBBS", university: "PGI Chandigarh" }],
    experiences: [{ startingDate: "2012-01-01", endingDate: "2024-01-01", position: "Neurologist", hospital: "Fortis Hospital" }],
    timeSlots: [{ day: "tuesday", startingTime: "09:00", endingTime: "13:00" }, { day: "thursday", startingTime: "09:00", endingTime: "13:00" }],
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
    about: "Dr. Priya Sharma is a certified dermatologist treating a wide range of skin, hair, and nail conditions.",
    qualifications: [{ startingDate: "2012-01-01", endingDate: "2016-01-01", degree: "MBBS", university: "JIPMER" }],
    experiences: [{ startingDate: "2016-01-01", endingDate: "2024-01-01", position: "Dermatologist", hospital: "Max Hospital" }],
    timeSlots: [{ day: "monday", startingTime: "11:00", endingTime: "15:00" }, { day: "friday", startingTime: "11:00", endingTime: "15:00" }],
    averageRating: 4.6,
    totalRating: 28,
    isApproved: "approved"
  },
  {
    name: "Dr. Meera Kapoor",
    email: "meera@medicare.com",
    password: "doctor123",
    phone: 9876543213,
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    gender: "female",
    specialization: "Gynecology",
    ticketPrice: 600,
    role: "doctor",
    bio: "Women health specialist, 9 years exp.",
    about: "Dr. Meera Kapoor is a leading gynecologist with expertise in maternal care, fertility, and women's health.",
    qualifications: [{ startingDate: "2009-01-01", endingDate: "2013-01-01", degree: "MBBS", university: "Maulana Azad Medical College" }],
    experiences: [{ startingDate: "2013-01-01", endingDate: "2024-01-01", position: "Senior Gynecologist", hospital: "AIIMS Delhi" }],
    timeSlots: [{ day: "tuesday", startingTime: "10:00", endingTime: "14:00" }, { day: "saturday", startingTime: "09:00", endingTime: "12:00" }],
    averageRating: 4.7,
    totalRating: 42,
    isApproved: "approved"
  },
  {
    name: "Dr. Arjun Patel",
    email: "arjun@medicare.com",
    password: "doctor123",
    phone: 9876543214,
    photo: "https://randomuser.me/api/portraits/men/55.jpg",
    gender: "male",
    specialization: "Orthopedics",
    ticketPrice: 650,
    role: "doctor",
    bio: "Orthopedic surgeon, joint specialist.",
    about: "Dr. Arjun Patel is an orthopedic surgeon specializing in joint replacement, sports injuries, and spine disorders.",
    qualifications: [{ startingDate: "2007-01-01", endingDate: "2011-01-01", degree: "MBBS", university: "Grant Medical College Mumbai" }],
    experiences: [{ startingDate: "2011-01-01", endingDate: "2024-01-01", position: "Orthopedic Surgeon", hospital: "Kokilaben Hospital" }],
    timeSlots: [{ day: "wednesday", startingTime: "09:00", endingTime: "13:00" }, { day: "friday", startingTime: "14:00", endingTime: "18:00" }],
    averageRating: 4.9,
    totalRating: 55,
    isApproved: "approved"
  },
  {
    name: "Dr. Riya Singh",
    email: "riya@medicare.com",
    password: "doctor123",
    phone: 9876543215,
    photo: "https://randomuser.me/api/portraits/women/66.jpg",
    gender: "female",
    specialization: "Psychiatry",
    ticketPrice: 800,
    role: "doctor",
    bio: "Mental health expert, 7 years exp.",
    about: "Dr. Riya Singh is a compassionate psychiatrist helping patients with anxiety, depression, and other mental health disorders.",
    qualifications: [{ startingDate: "2011-01-01", endingDate: "2015-01-01", degree: "MBBS", university: "NIMHANS Bangalore" }],
    experiences: [{ startingDate: "2015-01-01", endingDate: "2024-01-01", position: "Consultant Psychiatrist", hospital: "Medanta Hospital" }],
    timeSlots: [{ day: "monday", startingTime: "14:00", endingTime: "18:00" }, { day: "thursday", startingTime: "14:00", endingTime: "18:00" }],
    averageRating: 4.7,
    totalRating: 38,
    isApproved: "approved"
  },
  {
    name: "Dr. Vikram Bose",
    email: "vikram@medicare.com",
    password: "doctor123",
    phone: 9876543216,
    photo: "https://randomuser.me/api/portraits/men/77.jpg",
    gender: "male",
    specialization: "Neurologist",
    ticketPrice: 750,
    role: "doctor",
    bio: "Neurologist specializing in epilepsy.",
    about: "Dr. Vikram Bose is a senior neurologist with deep expertise in epilepsy, stroke management, and movement disorders.",
    qualifications: [{ startingDate: "2005-01-01", endingDate: "2009-01-01", degree: "MBBS", university: "CMC Vellore" }],
    experiences: [{ startingDate: "2009-01-01", endingDate: "2024-01-01", position: "Senior Neurologist", hospital: "Narayana Health" }],
    timeSlots: [{ day: "tuesday", startingTime: "11:00", endingTime: "15:00" }, { day: "friday", startingTime: "09:00", endingTime: "13:00" }],
    averageRating: 4.8,
    totalRating: 60,
    isApproved: "approved"
  },
  {
    name: "Dr. Neha Gupta",
    email: "neha@medicare.com",
    password: "doctor123",
    phone: 9876543217,
    photo: "https://randomuser.me/api/portraits/women/88.jpg",
    gender: "female",
    specialization: "Dermatologist",
    ticketPrice: 450,
    role: "doctor",
    bio: "Cosmetic dermatologist, skin expert.",
    about: "Dr. Neha Gupta specializes in cosmetic dermatology, acne treatment, and advanced skin care procedures.",
    qualifications: [{ startingDate: "2013-01-01", endingDate: "2017-01-01", degree: "MBBS", university: "Lady Hardinge Medical College" }],
    experiences: [{ startingDate: "2017-01-01", endingDate: "2024-01-01", position: "Cosmetic Dermatologist", hospital: "Skin & You Clinic" }],
    timeSlots: [{ day: "wednesday", startingTime: "14:00", endingTime: "18:00" }, { day: "saturday", startingTime: "10:00", endingTime: "14:00" }],
    averageRating: 4.5,
    totalRating: 32,
    isApproved: "approved"
  }
];

const users = [
  {
    name: "Rahul Verma",
    email: "rahul@patient.com",
    password: "patient123",
    phone: 9911223344,
    photo: "https://randomuser.me/api/portraits/men/1.jpg",
    role: "patient",
    gender: "male",
    bloodType: "O+"
  },
  {
    name: "Sneha Mishra",
    email: "sneha@patient.com",
    password: "patient123",
    phone: 9911223345,
    photo: "https://randomuser.me/api/portraits/women/2.jpg",
    role: "patient",
    gender: "female",
    bloodType: "B+"
  },
  {
    name: "Amit Kumar",
    email: "amit@patient.com",
    password: "patient123",
    phone: 9911223346,
    photo: "https://randomuser.me/api/portraits/men/3.jpg",
    role: "patient",
    gender: "male",
    bloodType: "A+"
  }
];

async function seed() {
  const uri = process.env.MONGO_URI || process.env.URL;
  await mongoose.connect(uri);
  console.log('Connected to DB');

  for (let doc of doctors) {
    const exists = await Doctor.findOne({ email: doc.email });
    if (!exists) {
      doc.password = await bcrypt.hash(doc.password, 10);
      await Doctor.create(doc);
      console.log(`✔ Doctor created: ${doc.name}`);
    } else {
      console.log(`⚡ Already exists: ${doc.name}`);
    }
  }

  for (let user of users) {
    const exists = await User.findOne({ email: user.email });
    if (!exists) {
      user.password = await bcrypt.hash(user.password, 10);
      await User.create(user);
      console.log(`✔ Patient created: ${user.name}`);
    } else {
      console.log(`⚡ Already exists: ${user.name}`);
    }
  }

  console.log('\n✅ Seeding complete!');
  console.log('\n--- LOGIN CREDENTIALS ---');
  console.log('DOCTORS (password: doctor123)');
  doctors.forEach(d => console.log(`  ${d.email}`));
  console.log('\nPATIENTS (password: patient123)');
  users.forEach(u => console.log(`  ${u.email}`));
  process.exit();
}

seed().catch(err => { console.error(err); process.exit(1); });
