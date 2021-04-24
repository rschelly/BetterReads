const mongoose = require('mongoose');
const Schema = mongoose.Schema;

<<<<<<< HEAD



const sessionSchema = new Schema({
    cookieId: { type: String, required: true, unique: true },
    createdAt: { type: Date, expires: 30, default: Date.now }
});

module.exports = mongoose.model('Session', sessionSchema);
=======
const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 30, default: Date.now },
});

module.exports = mongoose.model('Session', sessionSchema);
>>>>>>> 5738f0c2f65aa56b18c3b03533fc2543e9560fc9
