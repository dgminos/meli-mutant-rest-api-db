import 'dotenv/config'
import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to my MELI challenge!");
});

// Main function to check if the DNA belongs to a mutant
function isMutant(dna) {
    return dna?.some(hasConsecutiveLetters) ?? false;
  }
  
// Function to check if a sequence has 4 consecutive identical letters
  function hasConsecutiveLetters(sequence) {
    for (let i = 0, count = 1; i < sequence.length - 1; i++) {
      if (sequence[i] === sequence[i + 1]) {
        if (++count === 4) return true;
      } else {
        count = 1;
      }
    }
    return false;
  }
  
// Endpoint to receive the DNA sequence and check if it's a mutant
  app.post('/mutant', (req, res) => {
    const { dna } = req.body;
  
   // Basic input format validation
    if (!dna || !Array.isArray(dna)) {
      return res.status(400).json({ message: "Invalid DNA format" });
    }
  
// Check if the sequence corresponds to a mutant
    if (isMutant(dna)) {
      return res.status(200).json({ message: "Mutant detected" });
       } else {
      return res.status(403).json({ message: "Forbidden: Not a mutant" });
    }
  });

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})