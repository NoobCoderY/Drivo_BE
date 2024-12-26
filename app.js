const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');

connectToDb();

app.use(cors({
    origin: ['http://localhost:5174', 'http://localhost:5173','https://rg7cjw6w-5173.inc1.devtunnels.ms'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/captains', captainRoutes);
app.use('/api/v1/maps', mapsRoutes);
app.use('/api/v1/rides', rideRoutes);




module.exports = app;

