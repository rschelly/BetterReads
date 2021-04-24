const mongoose = require('mongoose');
const Schema = mongoose.Schema;

<<<<<<< HEAD

=======
>>>>>>> 5738f0c2f65aa56b18c3b03533fc2543e9560fc9
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

//set up a schema for a user. Username and password are required. Username must be unique.
const userSchema = new Schema({
<<<<<<< HEAD
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

userSchema.pre('save', function(next) {
    if (this.password) {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }
    return next();
})

module.exports = mongoose.model('User', userSchema)
=======
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre('save', function (next) {
  if (this.password) {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }
  return next();
});

module.exports = mongoose.model('User', userSchema);
>>>>>>> 5738f0c2f65aa56b18c3b03533fc2543e9560fc9
