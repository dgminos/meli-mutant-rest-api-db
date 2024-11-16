import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'
import { checkMutant, getStats } from './controllers/mutantController.js';


const app = express();
app.use(express.json());

// Connection to MongoDB
mongoose.connect(process.env.MONGODB_URI, {})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Endpoints
app.get("/", (req, res) => {
  res.send("Welcome to my MELI challenge!");
})
app.post('/mutant', checkMutant);
app.get('/stats', getStats);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
