const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const router = express.Router();
const bodyParser = require('body-parser');
const { decodeBase64 } = require('bcryptjs');
let User = require('../models/user');
let Flight = require('../models/flight');
const { db } = require('../models/user');
const stripe = require("stripe")('sk_test_51KH6uJInKywrx2SvIjXUaa3dRjHblY1Bmz936ZsaRLtZ1pqvklSlZPo67yk6fwYBZPQE7s80BqQjMpn7aFmDTkod00AJeqXyz2');
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt')

    router.post('/searchFlights',function(req,res) {
        var numberoftrue = 0
        const BDeparture= Boolean(req.body.Departure !== null)
        if(BDeparture)
        {numberoftrue++;
          console.log(numberoftrue+"BDep");}
        const BArrival= Boolean(req.body.Arrival !== null)
        if(BArrival)
        {numberoftrue++;
          console.log(numberoftrue+"BArrival");}
          
      
        
        
      const BFrom = Boolean(req.body.From !== '')
      if(BFrom)
      {numberoftrue++;
        console.log(numberoftrue+"From");}
      const BTo = Boolean(req.body.To !== '')
      if(BTo)
      {numberoftrue++;
        console.log(numberoftrue+"To");}
      const BCapinClass = Boolean(req.body.CabinClass !== "")
      if(BCapinClass)
      {numberoftrue++;
        console.log(numberoftrue+"capin class");}
      const BNumberofPassengers = Boolean(req.body.NumberofPassengers !== -1)
      if(BNumberofPassengers)
      {numberoftrue++;
        console.log(numberoftrue+"NumberofPassengers");}
      
       var x = [];
     
      console.log(numberoftrue);
    
         Flight.find({
        },function(err, result) 
         {//console.log(x);
           
            while(result.length>0)
            {    var target =0;
                 var tmp = result.pop();
               //  console.log(tmp.Departure)
                // console.log( new Date(req.body.Departure))
                // console.log('----------------')
                
                 if(BFrom&&tmp.From===req.body.From)
                 {target++
                console.log("FROM")
                
                }
                 if(BTo&&tmp.To===req.body.To)
                 {target++
                    console.log("To")
                }
                 if(BCapinClass)
                 {
                   if(BNumberofPassengers)
                   {switch(req.body.CabinClass){
                    case "1": if(tmp.Business>=req.body.NumberofPassengers)
                    {target++;
                        target++;
                        console.log("class Buss BNumber")
                    }break;
                    case "2": if(tmp.First>=req.body.NumberofPassengers)
                    {
                        target++;
                        target++;
                        console.log("class First BNumber")
                    }
                    break;
                    case "3": if(tmp.Economy>=req.body.NumberofPassengers)
                    {
                        target++;
                        target++;
                        console.log("class Economy BNumber")
                    }
                    break;

                  }}
                   else
                   {
                      switch(req.body.CabinClass){
                        case "1": if(tmp.Business>0)
                        {target++;
                            console.log("class Buss notBNumber")
                        }break;
                        case "2": if(tmp.First>0)
                        {
                            target++;
                            console.log("class First notBNumber")
                        }
                        break;
                        case "3": if(tmp.Economy>0)
                        {
                            target++;
                            console.log("class Econ notBNumber")
                        }
                        break;

                      }


                   }


                 }
                 //if(BBusiness&&tmp.Business===req.body.Business)
                 //{target++}
                 //if(BFirst&&tmp.First===req.body.First)
                 //{target++}
                 //if(BEconomy&&tmp.Economy===req.body.Economy)
                 //{target++}
                 //if(BDate&&tmp.Date.getTime()===new Date(req.body.Date).getTime())
                 //{target++}
                 //if(BDate&&tmp.Date.getTime()===new Date(req.body.Date).getTime())
                 //{target++}
                 if(BArrival&&tmp.Arrival.getTime()===new Date(req.body.Arrival).getTime())
                 {target++
                    console.log("Arrival")
                }
                 if(BDeparture&&tmp.Departure.getTime()===new Date(req.body.Departure).getTime())
                 {target++
                    console.log("Dedp")
                
                }
                 console.log(tmp);
                 console.log(numberoftrue+" da el target el mafrood");
                 console.log(target+" da ely welena leh el mafrood");
                 console.log("----------------------");
                if(target === numberoftrue)
                {x.push(tmp)}
                         

            }
            while(x.length>0)
            {result.push(x.pop())}
            console.log("<<<<<<<>>>>>"+result+"<<<<<<<<>>>>>>>>>")
          res.send(result);
        }
        
        )
       

       
        })

    router.get('/SelectedFlight/:id',function(req,res) {
          // console.log(req.params.id+"sad") 
          Flight.findById(req.params.id)
          .then(flights =>res.send(flights) )
          .catch(err => res.status(400).json('Error: ' + err));
          // console.log(req.params.id+"Hello")
          })

          router.get('/SelectedFlight2/:id',function(req,res) {
            // console.log(req.params.id+"sad") 
            Flight.findById(req.params.id)
            .then(flights =>res.send(flights) )
            .catch(err => res.status(400).json('Error: ' + err));
            // console.log(req.params.id+"Hello")
            })

          router.get('/personalInformation/:id',function(req,res)
          
          {
            console.log(req.params.id);
            User.findById(req.params.id)
          .then(users =>res.send(users) )
          .catch(err => res.status(400).json('Error: ' + err));

          }
          
          )
          router.post('/editUser/:id',function(req,res) {
            User.findById(req.params.id)
            .then(curruser => {
                    curruser.passportNumber = req.body.passportNumber;
                    curruser.email = req.body.email;
                    curruser.firstName = req.body.firstName;
                    curruser.lastName = req.body.lastName;

            
            console.log("///////////////////////////")
            console.log(curruser.lastName)
            curruser.save(curruser)
                    .then(() => res.json('user updated!'))
                    .catch(err => res.status(400).json('Error: ' + err));
            
            })
            .catch(err => res.status(400).json('Error: ' + err));
            })
          
          
          
          router.get('/flightdata/:id',function(req,res) {
            //   console.log(req.params.id) res.send(flights)
            // console.log(req.body)
            // console.log("////////////")
              Flight.findById(req.params.id)
              .then(flights =>res.send(flights))
              .catch(err => res.status(400).json('Error: ' + err));
              
              })      
          
          

              router.post('/chooseSeat/:id',function(req,res) {
              //  console.log(req.body.ID );
               console.log(req.params.id +"hope");
                User.findById(req.params.id)
                .then(users => {
                  // console.log(req.body.seatsArr);
                  var temp={
                    Depflight_ID:req.body.id1,
                    Retflight_ID:req.body.id2,
                    seats:req.body.seatsArr,
                    Class:req.body.class,
                    Class2:req.body.class2
                  }
                  // console.log(users);
                  // console.log(req.body.seatsArr+"#############################################");
                  users.seats.push(temp);
                  users.save()
                        .then(() => res.json('Flight updated!'))
                        .catch(err => res.status(400).json('Error: ' + err));
                  
                })
                .catch(err => res.status(400).json('Error: ' + err));
                         
                    })

                    router.post('/classBoolean/:id',function(req,res) {
                      Flight.findById(req.params.id)
                      .then(currflight => {
                        console.log(req.params.id);
                        if(req.body.class2 === 1)
                        {  
                          // console.log(currflight);
                          // console.log("index backend"+req.body.index);
                          // console.log(req.body.index);
                          // for(var i=0;i<currflight.BusinessSeats ;i++){
                          //   currflight.BusinessSeats[i] = req.body.Bool[i];
                          // }
                          currflight.BusinessSeats = req.body.Bool2;
                          // console.log(currflight.BusinessSeats[req.body.index]);
                        }
                        else{
                          if(req.body.class2 === 2)
                        {  
                          // console.log(currflight);
                          // console.log("index backend"+req.body.index);
                          // console.log(req.body.index);
                          // for(var i=0;i<currflight.BusinessSeats ;i++){
                          //   currflight.BusinessSeats[i] = req.body.Bool[i];
                          // }
                          currflight.FirstSeats = req.body.Bool2;
                          // console.log(currflight.BusinessSeats[req.body.index]);
                        }else{
                          if(req.body.class2 === 3)
                        {  
                          // console.log(currflight);
                          // console.log("index backend"+req.body.index);
                          // console.log(req.body.index);
                          // for(var i=0;i<currflight.BusinessSeats ;i++){
                          //   currflight.BusinessSeats[i] = req.body.Bool[i];
                          // }
                          currflight.EconomySeats = req.body.Bool2;
                          // console.log(currflight.BusinessSeats[req.body.index]);
                        }
                        }
                        } 
                        
                        currflight.save()
                        .then(() => res.json('Flight updated!'))
                        .catch(err => res.status(400).json('Error: ' + err));
                        // console.log("al3ab trai");
                        // console.log(req.body.Bool);
                        // console.log(currflight.BusinessSeats);
                      })
                      .catch(err => res.status(400).json('Error: ' + err));
                          })



                          router.post('/classBoolean2/:id',function(req,res) {
                            Flight.findById(req.params.id)
                            .then(currflight => {
                              console.log(req.params.id);
                              if(req.body.class === 1)
                              {  
                                // console.log(currflight);
                                // console.log("index backend"+req.body.index);
                                // console.log(req.body.index);
                                // for(var i=0;i<currflight.BusinessSeats ;i++){
                                //   currflight.BusinessSeats[i] = req.body.Bool[i];
                                // }
                                currflight.BusinessSeats = req.body.Bool;
                                // console.log(currflight.BusinessSeats[req.body.index]);
                              }
                              else{
                                if(req.body.class === 2)
                              {  
                                // console.log(currflight);
                                // console.log("index backend"+req.body.index);
                                // console.log(req.body.index);
                                // for(var i=0;i<currflight.BusinessSeats ;i++){
                                //   currflight.BusinessSeats[i] = req.body.Bool[i];
                                // }
                                currflight.FirstSeats = req.body.Bool;
                                // console.log(currflight.BusinessSeats[req.body.index]);
                              }else{
                                if(req.body.class === 3)
                              {  
                                // console.log(currflight);
                                // console.log("index backend"+req.body.index);
                                // console.log(req.body.index);
                                // for(var i=0;i<currflight.BusinessSeats ;i++){
                                //   currflight.BusinessSeats[i] = req.body.Bool[i];
                                // }
                                currflight.EconomySeats = req.body.Bool;
                                // console.log(currflight.BusinessSeats[req.body.index]);
                              }
                              }
                              } 
                              
                              currflight.save()
                              .then(() => res.json('Flight updated!'))
                              .catch(err => res.status(400).json('Error: ' + err));
                              // console.log("al3ab trai");
                              // console.log(req.body.Bool);
                              // console.log(currflight.BusinessSeats);
                            })
                            .catch(err => res.status(400).json('Error: ' + err));
                                })


            router.get('/allReservations/:id',function(req,res) {
            //   console.log(req.params.id) res.send(flights)
            console.log("////");
            User.findById(req.params.id)
            .then(user =>res.send(user))
            .catch(err => res.status(400).json('Error: ' + err));
            // console.log(req.params.id+"HHHH")
            })
                                    
       
            router.post('/Cancel/:id',function(req,res) {
              User.findById(req.params.id)
              .then(curruser => {
                     var seats = curruser.seats;
                     var seatsfinal = []
                     var len = seats.length
                     for(var i=0;i<len;i++){
                        if(i != req.body.index){
                          seatsfinal.push(seats[i]);
                          console.log(i); 
                        }
                     }
                     curruser.seats=seatsfinal;
                     console.log("XXXXXXXXXXXXXX");
                     
              console.log(curruser.lastName)
              curruser.save(curruser)
                      .then(() => res.json('user updated!'))
                      .catch(err => res.status(400).json('Error: ' + err));
              
              })
              .catch(err => res.status(400).json('Error: ' + err));
              })



              router.post('/editPass/:id',function(req,res) {
                User.findById(req.params.id)
                .then(curruser => {
                  
                  if( curruser.password == req.body.oldPass ){
                    console.log(curruser.password+"&&&&&&&"+req.body.oldPass);
                    curruser.password=req.body.newPass;
                    curruser.save(curruser)
                    .then(() => res.json('user updated!'))
                    .catch(err => res.status(400).json('Error: ' + err));
                  }
                  else{
                    res.send({_id: "null"});
                  }
                })
                .catch(err => res.status(400).json('Error: ' + err));
                })


                router.post('/SelectFlight/:id',function(req,res) {
                  User.findById(req.params.id)
                  .then(curruser => {
                        //  console.log(curruser);
                         res.send(curruser);
                  
                  
                  })
                  .catch(err => res.status(400).json('Error: ' + err));
                  }) 
                  
                  router.get('/SelectFlight/:id',function(req,res) {
                    User.findById(req.params.id)
                    .then(curruser => {
                          //  console.log(curruser);
                           res.send(curruser);
                    
                    
                    })
                    .catch(err => res.status(400).json('Error: ' + err));
                    }) 


                    router.post('/chooseSeat2/:id',function(req,res) {
                      //  console.log(req.body.ID+"QQQQQQQQQQQQQQQQQQQ" );
                      //  console.log(req.params.id +"hope");
                        User.findById(req.params.id)
                        .then(users => {
                          // console.log(req.body.seatsArr);
                          var x=users.seats[req.body.IND].seats;
                          var y=[]
                          if(req.body.CID==0){
                            // console.log(req.body.seatsArr+"QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ");
                          var i=0;
                          for(;x[i]!=-1;i++){
                            y.push(req.body.seatsArr[i]);
                          }
                          // y.push(-1);
                          for(;i<x.length;i++){
                            y.push(x[i])
                          }
                        }else{
                          
                          if(req.body.CID==1){
                            console.log("Helloooooooooooooos");
                            // console.log(req.body.seatsArr+"QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ");
                          var i=0;
                          for(;i<x.length;i++){
                              if(x[i]==-1)
                                break;
                            y.push(x[i]);
                          }
                          y.push(-1);
                          i=0;
                          var length = req.body.seatsArr.length
                          for(;i<length;i++){
                            y.push(req.body.seatsArr.pop())
                          }
                          console.log(req.body.seatsArr+"QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ"+y);

                          }
                        }
                          // i=0;
                          // var z=x.length;
                          // for(;i<z;i++){
                          //   users.seats[req.body.IND].seats.pop();
                          // }
                          // i=0;
                          // for(;i<y.length;i++){
                          //   users.seats[req.body.IND].seats.push(y[i]);
                          // }
                          // users.seats[req.body.IND].seats=y;

                          // users.update({users.seats[req.body.IND].seats:y});
                          // console.log(y);
                          
                          // users.seats.push(temp);
                          // users.markModified("seats");

                         
                          var temp={
                            Depflight_ID: users.seats[req.body.IND].Depflight_ID,
                            Retflight_ID:users.seats[req.body.IND].Retflight_ID,
                            seats:y,
                            Class:users.seats[req.body.IND].Class,
                            Class2: users.seats[req.body.IND].Class2
                          }
                          users.seats[req.body.IND]=temp;
                          
                          // console.log(y+"QQQQQQQQQQQQQQQQQQQQQQQQQQ");
                          // console.log(users.seats[req.body.IND].seats+"#############################################");
                         

                          users.save(users)
                                .then(() => console.log('Flight updated!'))
                                .catch(err => console.log('Error: ' + err));
                          
                        })
                        .catch(err => res.status(400).json('Error: ' + err));
                               
                      });
                      router.post('/searchEditFlights/',function(req,res) {
                        var numberoftrue = 0
             const BClass= Boolean(req.body.CabinClass !== null)
        if(BClass)
        {numberoftrue++;
          }
        const BDeparture= Boolean(req.body.Departure !== "")
        if(BDeparture)
        {numberoftrue++;
        }
        // console.log("req.body.Departure = "+req.body.Departure)
          
        var x = []  

        



         Flight.find({ From:req.body.From,To:req.body.To 
        },function(err, result) 
         {
         
          while(result.length>0)
         { var target = 0 
           var tmp = result.pop()
          if(BClass)
          { switch(req.body.CabinClass)
            { case "1": if(tmp.Business>0)
            {target++;
                
            }break;
            case "2": if(tmp.First>0)
            {
                target++;
                console.log("class First notBNumber")
            }
            break;
            case "3": if(tmp.Economy>0)
            {
                target++;
                console.log("class Econ notBNumber")
            }
            break;


            }




          }
          // console.log(tmp)
          // console.log("traget = " + target)
          // console.log("numberoftrue = " + numberoftrue)
          if(target === numberoftrue)
          {x.push(tmp)}

        }
        
        while(x.length>0)
        {result.push(x.pop())}
      //  console.log("????????????????"+req.body.Departure.substring(0,10)+"?????????????????????????????????????????????????????");
      res.send(result)

      }
         
         )
                            
                           
                                 
                        });

                        const calculateOrderAmount = (items) => {
                          // Replace this constant with a calculation of the order's amount
                          // Calculate the order total on the server to prevent
                          // people from directly manipulating the amount on the client
                          return Number.parseInt(items)*100;
                        };
                        
                        router.post("/create-payment-intent", async (req, res) => {
                          const { items } = req.body;
                        
                          // Create a PaymentIntent with the order amount and currency
                          const paymentIntent = await stripe.paymentIntents.create({
                            amount: calculateOrderAmount(items),
                            currency: "eur",
                            automatic_payment_methods: {
                              enabled: true,
                            },
                          });
                        
                          res.send({
                            clientSecret: paymentIntent.client_secret,
                          });
                        });  


                         const sendEmail = (email,f1,f2) => {  
                          const output = `
                          <h1>Your Flights Itinerary </h1>
                          <p> ${f1}</p>
                          <p> ${f2}</p>
                          <h3>Message</h3>
                          <b>Thanks for Travelling the world with us</b>`;
                      
                            

                           
                          let transporter = nodemailer.createTransport({
                            host:"smtp-mail.outlook.com" ,
                            port: 587,
                           secure: false,
                            auth: {
                              user: 'fsr_mamy@outlook.com', // generated ethereal user
                              pass: 'Ams5854654', // generated ethereal password
                            },
                          });

                         let options =  {
                            from: "fsr_mamy@outlook.com", // sender address
                            to: email, // list of receivers
                            subject: "Flight Itinerary", // Subject line
                            text: "Flights Itinerary ", // plain text body
                            html: output
                          };
                          transporter.sendMail(options,function(err,info){
                            if(err){
                              console.log(err);
                              return;
                            }
                            console.log("email sent");
                          });
                          
                        };


                        router.post('/EmailItin/:id',function(req,res) {
                          console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP"+req.params.id);    
                          var f1=req.body.f1;
                          var f2 =req.body.f2; 
                          var x= f1.Num+f1.From+f1.To+f1.Arrival+f1.ArrivalDate+f1.Departure+f1.DepartureDate+f1.Duration;
                          var y=f2.Num+f2.From+f2.To+f2.Arrival+f2.ArrivalDate+f2.Departure+f2.DepartureDate+f2.Duration;                     
                          // console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP"+req.body.flights);
                          console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP"+y);
                          console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP"+x);

                          User.findById(req.params.id)
                          .then(curruser => {
                            // console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP"+curruser.email);
                            
                            sendEmail(curruser.email,x,y).catch(console.error);
                          
                           
                          })
                          .catch(err => res.status(400).json('Error: ' + err));
                          })


                          const sendEmail2 = (email,f1) => {  
                            const output = `
                            <h1>Your Flights Itinerary </h1>
                            <p> ${f1}</p>
                            <h3>Message</h3>
                            <b>Thanks for Travelling the world with us</b>`;
                        
                              
  
                             
                            let transporter = nodemailer.createTransport({
                              host:"smtp-mail.outlook.com" ,
                              port: 587,
                             secure: false,
                              auth: {
                                user: 'fsr_mamy@outlook.com', // generated ethereal user
                                pass: 'Ams5854654', // generated ethereal password
                              },
                            });
  
                           let options =  {
                              from: "fsr_mamy@outlook.com", // sender address
                              to: email, // list of receivers
                              subject: "Flight Itinerary", // Subject line
                              text: "Flights Itinerary ", // plain text body
                              html: output
                            };
                            transporter.sendMail(options,function(err,info){
                              if(err){
                                console.log(err);
                                return;
                              }
                              console.log("email sent");
                            });
                            
                          };
  
  
                          router.post('/EmailItin2/:id',function(req,res) {
                            console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP"+req.params.id);    
                            var f1=req.body.f1;
                            var x= f1.Num+f1.From+f1.To+f1.Arrival+f1.ArrivalDate+f1.Departure+f1.DepartureDate+f1.Duration;                   
                            // console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP"+req.body.flights);
                            // console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP"+y);
                            // console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP"+x);
  
                            User.findById(req.params.id)
                            .then(curruser => {
                              // console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP"+curruser.email);
                              
                              sendEmail2(curruser.email,x).catch(console.error);
                            
                             
                            })
                            .catch(err => res.status(400).json('Error: ' + err));
                            })



                            router.post('/chooseSeat3/:id',function(req,res) {
                              //  console.log(req.params.id+"QQQQQQQQQQQQQQQQQQQ" );
                               console.log(req.params.id +"hope");
                                User.findById(req.params.id)
                                .then(users => {
                                  console.log(req.body.CID+"LLLLLLLLLLLLLLLLLLLLLLLLLLLLLL");
                                  // console.log(req.body.oldClass+"WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW");
                                  console.log(users);
                                  var x=users.seats[req.body.IND].seats;
                                  var y=[]
                                  if(req.body.CID==0){
                                    // console.log(req.body.seatsArr+"QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ");
                                  var i=0;
                                  for(;x[i]!=-1;i++){
                                    y.push(req.body.seatsArr[i]);
                                  }
                                  // y.push(-1);
                                  for(;i<x.length;i++){
                                    y.push(x[i])
                                  }
                                }else{
                                  
                                  if(req.body.CID==1){
                                    // console.log("Helloooooooooooooos");
                                    // console.log(req.body.seatsArr+"QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ");
                                  var i=0;
                                  for(;i<x.length;i++){
                                      if(x[i]==-1)
                                        break;
                                    y.push(x[i]);
                                  }
                                  y.push(-1);
                                  i=0;
                                  var length = req.body.seatsArr.length
                                  for(;i<length;i++){
                                    y.push(req.body.seatsArr.pop())
                                  }
                                  // console.log(req.body.seatsArr+"QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ"+y);
        
                                  }
                                }
                                var temp=null;
                                // console.log("QWEQWEQWEQWEQWEQWEQWEQWEQWE");
                                // console.log(users.seats[req.body.IND].Depflight_ID);
                                // console.log(users.seats[req.body.IND].Retflight_ID);
                                // console.log(req.body.CabinClass+"????????????????????????");
                                // console.log(users.seats[req.body.IND].Class2);
                                // console.log("QWEQWEQWEQWEQWEQWEQWEQWEQWE");

                                 if(req.body.CID=="0"){
                                   temp={
                                    Depflight_ID: users.seats[req.body.IND].Depflight_ID,
                                    Retflight_ID:users.seats[req.body.IND].Retflight_ID,
                                    seats:y,
                                    Class:Number.parseInt(req.body.NewClass),
                                    Class2: Number.parseInt(users.seats[req.body.IND].Class2)
                                  }
                                }
                                else{
                                  if(req.body.CID=="1"){
                                   temp={
                                    Depflight_ID: users.seats[req.body.IND].Depflight_ID,
                                    Retflight_ID:users.seats[req.body.IND].Retflight_ID,
                                    seats:y,
                                    Class:Number.parseInt(users.seats[req.body.IND].Class),
                                    Class2: Number.parseInt(req.body.NewClass)
                                  }
                                }

                                }
                                // console.log(temp.Depflight_ID+"EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
                                // console.log(temp.seats[0]+"EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
                                  users.seats[req.body.IND]=temp;
                                  // console.log(users);
                                  // console.log(users.seats);
                                  
                                  // console.log(y+"QQQQQQQQQQQQQQQQQQQQQQQQQQ");
                                  // console.log(users.seats[req.body.IND].seats+"#############################################");
                                 
        
                                  users.save(users)
                                        .then(() => console.log('Flight updated!'))
                                        .catch(err => console.log('Error: ' + err));
                                  
                                })
                                .catch(err => res.status(400).json('Error: ' + err));
                                       
                              });
                       
module.exports = router;










