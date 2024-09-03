const { text } = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    
    username: {
    type: String,
    required: true,
    unique: true
  },
  firstName:{
type: String,
required: true,


  },
  lastName:{
    type: String,
    required: true,
    
    
      },
  password: {
    type: String,
    required: true
  },email: {
    type: String,
    required: true
  },passportNumber: {
    type: Number,
    required: true
  },departure:{
    type: Array
  },arrival:{
    type: Array
  },seats:{
    type: Array
  }
  
}, { timestamps: true });
const user = mongoose.model('user', userSchema);
module.exports = user;

