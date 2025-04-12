// Define the Picture schema (can be for courses, profile pictures, etc.)
const pictureSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    description: {
      type: String,
      trim: true
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  });
  
  // Create the model for storing images
  const Picture = mongoose.model('Picture', pictureSchema);
  module.exports = Picture;
  