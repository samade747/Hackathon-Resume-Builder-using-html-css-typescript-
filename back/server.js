const express = require('express');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // For generating UUIDs
const app = express();
const PORT = 3000;

// Load environment variables from .env file
require('dotenv').config();

// Middleware
app.use(express.json()); // Parse JSON body

// Connect to MongoDB using the URI from environment variables
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Define a CV schema and model
const cvSchema = new mongoose.Schema({
    name: String,
    email: String,
    experience: String,
    skills: String,
    uniqueId: String, // This will store the unique shareable link ID
});

const CV = mongoose.model('CV', cvSchema);

// Save CV route
app.post('/saveCV', async (req, res) => {
    const { name, email, experience, skills } = req.body;
    
    // Generate a unique ID for the CV
    const uniqueId = uuidv4(); // Use UUID for unique link generation
    
    // Save CV to the database
    const newCV = new CV({
        name,
        email,
        experience,
        skills,
        uniqueId
    });

    try {
        await newCV.save();
        res.json({ success: true, uniqueId: uniqueId });
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }
});

// Fetch CV by unique ID route
app.get('/cv/:uniqueId', async (req, res) => {
    const { uniqueId } = req.params;

    try {
        const cv = await CV.findOne({ uniqueId });
        if (cv) {
            res.json({ success: true, cv: cv });
        } else {
            res.status(404).json({ success: false, message: 'CV not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
