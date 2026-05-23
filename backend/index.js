// Importing necessary modules and configurations
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const cors = require('cors');
// Getting the secret key from environment variables
const SECRET = process.env.SECRET;
const URL = process.env.URL;
// Importing the User model and authentication routes
const User = require('./models/UserSchema');
const Doctor = require('./models/DoctorSchema');
const authRoutes = require('./Routes/auth');
const userRoutes = require('./Routes/user');
const doctorRoutes = require('./Routes/doctor');
const reviewRoutes = require('./Routes/review');
const bookingRoutes = require('./Routes/booking');
// Creating an Express application
const app = express();

// Setting up the port for the server
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_SITE_URL, credentials: true }));
// Middleware to parse incoming JSON data
app.use(express.json());

// Simple route to test if the server is running
app.get("/", (req, res) => {
    res.send('Hello world');
});

// Setting up routes for authentication
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/doctor', doctorRoutes);
app.use('/review', reviewRoutes);
app.use('/booking', bookingRoutes);

// Connecting to the MongoDB database
mongoose.connect(URL).then((x) => {
    console.log('Connected to the database');
}).catch((err) => {
    console.log(err);
    console.log('Error connecting to the database');
    process.exit(1);
});

// Setting up Passport middleware for JWT authentication
// This code checks the user against the authToken
//The name of this strategy is by default jwt
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET;

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    // console.log('JWT Payload:', jwt_payload);

    try {
        let user;
        if (jwt_payload.role === 'patient') {
            // console.log(jwt_payload.identifier)
            user = await User.findById(jwt_payload.identifier);
        } else if (jwt_payload.role === 'doctor') {
            user = await Doctor.findById(jwt_payload.identifier);
        }

        if (user) {
            // console.log('User found:', user);
            return done(null, user);
        } else {
            // console.log('User not found');
            return done(null, false);
        }
    } catch (err) {
        console.error('Error during authentication:', err);
        return done(err, false);
    }
}));


// Starting the Express server
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
