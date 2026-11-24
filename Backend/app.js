require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");


const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000


// Routes
const projectRoutes = require('./routes/project.route')
const profileRoutes = require('./routes/profile.route')
const skillRoutes = require('./routes/skill.route');
const Upload = require('./middleware/Upload');


mongoose
    .connect(process.env.MONGODB_URL)

    .then(() => {
        console.log('MongoDB connected');

    })
    .catch((err) => {
        console.error('MongoDB connection failed:', err.message);
    });


app.use('/api/projects', projectRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/skill', skillRoutes)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

