const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const cors = require('cors');

const SECRET = process.env.SECRET;
const MONGO_URI = process.env.MONGO_URI || process.env.URL;
const PORT = process.env.PORT || 5000;

const User = require('./models/UserSchema');
const Doctor = require('./models/DoctorSchema');
const authRoutes = require('./Routes/auth');
const userRoutes = require('./Routes/user');
const doctorRoutes = require('./Routes/doctor');
const reviewRoutes = require('./Routes/review');
const bookingRoutes = require('./Routes/booking');

const app = express();

const allowedOrigins = [
    'http://localhost:3000',
    process.env.CLIENT_SITE_URL,
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// Passport JWT setup (must be before routes)
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET;

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        let user;
        if (jwt_payload.role === 'patient') {
            user = await User.findById(jwt_payload.identifier);
        } else if (jwt_payload.role === 'doctor') {
            user = await Doctor.findById(jwt_payload.identifier);
        }
        return user ? done(null, user) : done(null, false);
    } catch (err) {
        return done(err, false);
    }
}));

app.get('/', (req, res) => res.send('Medicare API running'));

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/doctor', doctorRoutes);
app.use('/review', reviewRoutes);
app.use('/booking', bookingRoutes);

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to the database');
        app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err.message);
        process.exit(1);
    });
