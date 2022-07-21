const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  isListingPublic:{
    type: Boolean,
    default:false,
  },
  cartTotal:{
    type: Number,
    default: 0,
  },
  listings:[
    {
      type: Schema.Types.ObjectId,
      ref: 'Listing',
    },
  ],
  cart:[
    {
      type: Schema.Types.ObjectId,
      ref: 'Listing',
    },
  ],
});

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
