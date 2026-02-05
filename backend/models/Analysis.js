import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    result: {
        classification: String,
        confidenceScore: Number,
        redFlags: [String],
        analysis: String,
        actionSteps: [String]
    }
}, { timestamps: true });

export default mongoose.model('Analysis', analysisSchema);
