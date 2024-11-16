import DnaRecord from '../models/dnaRecordModel.js';

// Function to check if a sequence is mutant
function isMutant(dna) {
  return dna?.some(hasConsecutiveLetters) ?? false;
}

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

// Endpoint ('/mutant') to check for mutants
export const checkMutant = async (req, res) => {
  const { dna } = req.body;
 
  if (!dna || !Array.isArray(dna)) {
    return res.status(400).json({ message: "Invalid DNA format" });
  }

  const isMutantDna = isMutant(dna);

 // Save the result to the db
  try {
    console.log("Attempting to save DNA record...");
    const newRecord = await DnaRecord.create({ dna, isMutant: isMutantDna });
    console.log('DNA record saved:', newRecord);


    if (isMutantDna) {
      return res.status(200).json({ message: "Mutant detected" });
    } else {
      return res.status(403).json({ message: "Forbidden: Not a mutant" });
    }
  } catch (error) {
    console.error('Error saving DNA record:', error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Endpoint ('/stats') for statistics
export const getStats = async (req, res) => {
  try {
    const totalRecords = await DnaRecord.countDocuments();
    const mutantCount = await DnaRecord.countDocuments({ isMutant: true });
    const humanCount = totalRecords - mutantCount;

    const ratio = humanCount === 0 ? mutantCount : (mutantCount / humanCount).toFixed(2);

    return res.status(200).json({
      count_mutant_dna: mutantCount,
      count_human_dna: humanCount,
      ratio: parseFloat(ratio)
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
