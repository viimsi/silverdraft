const mongoose = require('mongoose');

const ocSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  fullname: {
    type: String,
    required: true,
  },
  nickname: String,
  age: Number,
  backstory: String,
  personality: String,
  likes: String,
  dislikes: String,
  imageUrl: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('OC', ocSchema);
