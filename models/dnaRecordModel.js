import mongoose from 'mongoose';

const dnaRecordSchema = new mongoose.Schema({
  dna: { 
    type: [String], 
    required: true 
},
  isMutant: { 
    type: Boolean, 
    required: true 
}
});

export default mongoose.model('DnaRecord', dnaRecordSchema);