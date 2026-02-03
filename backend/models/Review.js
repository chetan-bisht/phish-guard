// server/models/Review.js

import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true, // Validation: Name is mandatory
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5, // Validation: Rating must be 1-5
  },
  reviewText: {
    type: String,
    required: true,
  },
  // We will add an AI-generated field later, but let's prepare for it
  sentiment: {
    type: String,
    enum: ['Positive', 'Negative', 'Neutral', 'Unchecked'],
    default: 'Unchecked',
  },
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt'

const Review = mongoose.model('Review', reviewSchema);

export default Review;