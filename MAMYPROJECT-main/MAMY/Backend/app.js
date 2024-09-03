const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const stripe = require('stripe')('sk_test_51KH6uJInKywrx2SvIjXUaa3dRjHblY1Bmz936ZsaRLtZ1pqvklSlZPo67yk6fwYBZPQE7s80BqQjMpn7aFmDTkod00AJeqXyz2');
const bcrypt = require('bcrypt')
var cors = require('cors')
app.use(cors())
app.use(express.json());



const uri = process.env.URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true}).then(result =>console.log("MongoDB is now connected") )
.catch(err => console.log(err));


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const home =require('./routes/homeRoute');
const adminHome =require('./routes/adminRoute');
const user =require('./routes/userRoute');
app.use('/Home',home);
app.use("/AdminHome",adminHome);
app.use("/UserHomePage",user);



app.get('/', (req, res) => {

 res.redirect('/Home')

});


const port = process.env.PORT   ;




app.listen(port, () => console.log(`Server running on port ${port}`));