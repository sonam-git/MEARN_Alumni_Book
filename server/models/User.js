// import necessary packages
const { Schema, model } = require('mongoose');
// for password hashing.
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  image: {
    type: String,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  friends:[{
    type: Schema.Types.ObjectId,
      ref: 'User',
  }]
});
// middleware function is defined to execute before saving a user document.
userSchema.pre('save', async function (next) {
  // checks if the user is new or the password is modified.
  if (this.isNew || this.isModified('password')) {
    // f it is new or modified, it uses bcrypt to hash the password with the given salt rounds.
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});
//  to compare a provided password with the hashed password stored in the user document.
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// model is created using the model function from Mongoose
const User = model('User', userSchema);

//model is exported
module.exports = User;
