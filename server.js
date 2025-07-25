const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const classRoutes = require('./routes/classRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const unitRoutes = require('./routes/unitRoutes');
const assignmentRoutes = require('./routes/assignments');
const submissionRoutes = require('./routes/submissions');
const apiRoutes = require('./routes/staffRoutes');
const studentRoutes = require('./routes/studentRoutes');
const admin = require('firebase-admin');
const messageRoutes = require('./routes/messages');
const studLogin = require('./routes/activityRoutes')
require('dotenv').config();



const serviceAccount = require('./southbaymart-firebase-adminsdk-fbsvc-d2845529cf.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/lms', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/classes', classRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/units', unitRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api', apiRoutes);
app.use('/api/students', studentRoutes);
app.use('/api', messageRoutes);
app.use('/api/activity', studLogin);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});