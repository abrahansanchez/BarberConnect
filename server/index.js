require('dotenv').config(); // LOAD  MongoDB connection string
const express = require('express'); // express library
const mongoose = require('mongoose'); // mongoose library
const cors = require('cors');// lets front end access the backend 
const connectDB = require('./config/db');
const calendlyRoutes = require('./routes/calendlyRoutes'); // import calendly routes



const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});


const appointmentRoutes = require('./routes/appointmentRoutes'); // import appointment routes
const authRoutes = require('./routes/authRoutes'); // import auth routes
const twilioRoutes = require('./routes/twilioRoutes'); // import twilio routes
const smsRoutes = require('./routes/smsRoutes'); // import sms routes



const PORT = process.env.PORT || 5000;

//connect to MongoDB using the connection string in the .env file
 connectDB();

app.use(cors());
app.use(express.json()); // parse JSON data into javascript objects
app.use(express.urlencoded({ extended: true }));

app.use('/api/appointments', require('./routes/appointmentRoutes')); // use the appointment routes for the /api/appointments endpoint
app.use('/api/auth', require('./routes/authRoutes')); // use the auth routes for the /api/auth endpoint
app.use('/api/twilio', require('./routes/twilioRoutes')); // use the twilio routes for the /api/twilio endpoint
app.use('/api/voicemails', require('./routes/voicemailRoutes')); // use the voicemail routes for the /api/voicemail endpoint
app.use('/api/twilio/sms', require('./routes/smsRoutes')); // use the sms routes for the /api/sms endpoint
app.use('/api/calendly', require('./routes/calendlyRoutes'));
app.use('/api/barbers', require('./routes/barberRoutes'));




app.get('/', (req, res) => {
    res.send('BarberConnect backend  is runnning');
});


//start the server and listen for requests
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

});


