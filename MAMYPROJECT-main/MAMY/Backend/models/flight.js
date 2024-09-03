const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FlightSchema = new Schema({
      From: {
        type: String,
        required: true
      },
      To: {
        type: String,
        required: true
      },Date: {
        type: Date,
        required: true
      },
      Arrival: {
        type: Date,
        required: true
      },Departure: {
        type: Date,
        required: true
      },
      Economy: {
        type: Number,
        required: true
      },
      Business: {
        type: Number,
        required: true
      },
      First: {
        type: Number,
        required: true
      },FirstSeats:{
        type: Array
      },EconomySeats:{
        type: Array
      },BusinessSeats:{
        type: Array
      }
      
    },
    { timestamps: true });
    
    const flight = mongoose.model('flight', FlightSchema);
    module.exports = flight;