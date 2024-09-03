const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const router = express.Router();
const bodyParser = require('body-parser');
const { decodeBase64 } = require('bcryptjs');
let Flight = require('../models/flight');

    router.get('/',function(req,res) {
        res.send("hi admin");
    })

    
   router.post('/EditFlight/:id',function(req,res) {

            Flight.findById(req.body._ID)
    .then(currflight => {
        currflight.From = req.body.From;
        currflight.To = req.body.To;
        currflight.Economy = req.body.Economy;
        currflight.Business = req.body.Business;
        currflight.First = req.body.First;
        currflight.Arrival=req.body.Arrival;
        currflight.Departure=req.body.Departure;
        currflight.Date=req.body.Date;



      currflight.save()
        .then(() => res.json('Flight updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
             
                })


                
    router.post('/add-flight',function(req,res) {
        //    console.log("hi");

        var x = []
        var y = []
        var z = []
        
        var counter = 0;
        while(counter<req.body.Economy)
        {x[counter] = true;
          counter ++;
        
        }
        counter = 0;
        while(counter<req.body.Business)
        {y[counter] = true;
          counter ++;
        
        }
        counter = 0;
        while(counter<req.body.First)
        {z[counter] = true;
          counter ++;
        
        }
        

            const newfligt = new Flight({BusinessSeats:y,EconomySeats:x,FirstSeats:z,From:req.body.From,To:req.body.To,Date: req.body.Date,Economy:req.body.Economy,Business:req.body.Business,First:req.body.First,Arrival:req.body.Arrival,Departure:req.body.Departure});
            console.log(newfligt);
            newfligt.save(function (err, book) {
                if (err) return console.error(err);
                console.log(newfligt.From);
              });
            })

    router.get('/allFlights',function(req,res) {
        Flight.find()
        .then(flights => res.send(flights))
        .catch(err => res.status(400).json('Error: ' + err));
        })

    router.delete("/:id",(req, res) => {
        Flight.findByIdAndDelete(req.params.id)
          .then(() => res.json('Flight deleted.'))
          .catch(err => res.status(400).json('Error: ' + err));
          });


    router.get('/:id',function(req,res) {
              console.log("hi");
            Flight.findById(req.params.id)
            .then(flights => res.send(flights))
            .catch(err => res.status(400).json('Error: ' + err));
            })

    router.post('/allFlights',function(req,res) {
                const newfligt = new Flight({From:req.body.From,To:req.body.To,Date: req.body.Date,Economy:req.body.Economy,Business:req.body.Business,First:req.body.First,Arrival:req.body.Arrival,Departure:req.body.Departure});
            newfligt.save(function (err, book) {
                if (err) return console.error(err);
                console.log(newfligt.From);
              });
                })

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
                      
                  
                    
                    const BDate = Boolean(req.body.Date !== null)
                    if(BDate)
                    {numberoftrue++;
                      console.log(numberoftrue+"BDate");}
                  const BFrom = Boolean(req.body.From !== '')
                  if(BFrom)
                  {numberoftrue++;
                    console.log(numberoftrue+"From");}
                  const BTo = Boolean(req.body.To !== '')
                  if(BTo)
                  {numberoftrue++;
                    console.log(numberoftrue+"To");}
                  const BBusiness = Boolean(req.body.Business !== 0)
                  if(BBusiness)
                  {numberoftrue++;
                    console.log(numberoftrue+"Buss");}
                  const BFirst = Boolean(req.body.First !== 0)
                  if(BFirst)
                  {numberoftrue++;
                    console.log(numberoftrue+"First");}
                  const BEconomy = Boolean(req.body.Economy !== 0)
                   var x = [];
                 
                  if(BEconomy)
                  {numberoftrue++;
                    console.log(numberoftrue+"Eco");}
                  console.log(numberoftrue);
                  console.log(req.body.From);
                     Flight.find({
                    },function(err, result) 
                     {//console.log(x);
                       
                        while(result.length>0)
                        {    var target =0;
                             var tmp = result.pop();
                             console.log(tmp.Departure)
                             console.log( new Date(req.body.Departure))
                             console.log('----------------')
                            
                             if(BFrom&&tmp.From===req.body.From)
                             {target++}
                             if(BTo&&tmp.To===req.body.To)
                             {target++}
                             if(BBusiness&&tmp.Business===req.body.Business)
                             {target++}
                             if(BFirst&&tmp.First===req.body.First)
                             {target++}
                             if(BEconomy&&tmp.Economy===req.body.Economy)
                             {target++}
                             if(BDate&&tmp.Date.getTime()===new Date(req.body.Date).getTime())
                             {target++}
                             if(BDate&&tmp.Date.getTime()===new Date(req.body.Date).getTime())
                             {target++}
                             if(BArrival&&tmp.Arrival.getTime()===new Date(req.body.Arrival).getTime())
                             {target++}
                             if(BDeparture&&tmp.Departure.getTime()===new Date(req.body.Departure).getTime())
                             {target++}
                            if(target === numberoftrue)
                            {x.push(tmp)}
                                     

                        }
                        while(x.length>0)
                        {result.push(x.pop())}
                        console.log(result)
                      res.send(result);
                    }
                    
                    )
                   

                   
                    })





    router.get('/EditFlight/:id',function(req,res) {
                      Flight.findById(req.params.id)
                      .then(flights => res.send(flights))
                      .catch(err => res.status(400).json('Error: ' + err));
                      
                     })











module.exports = router;

//if(BFrom)
                    //     {

                    //         From: req.body.From
                    //     },
                    //     if(BTo)
                    //     {

                    //         To: req.body.To
                    //     },
                    //     if(BBusiness)
                    //     {

                    //         Business: req.body.Business
                    //     },
                    //     if(BFirst)
                    //     {

                    //         First: req.body.First
                    //     },
                    //     if(BEconomy)
                    //     {

                    //         Economy: req.body.Economy
                    //     }