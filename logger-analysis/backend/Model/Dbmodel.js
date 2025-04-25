const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: false },
  file: { type: [String], required: false },
  company: { type: String, required: false },
  userrole: { type: String, required: false },
  userpkg :{ type: String, required: false },
  salt: { type: String, required: true },
  rdate: { type: Date, required: true },
  user_status:{type:String}
});

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
