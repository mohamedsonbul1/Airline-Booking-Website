import React, { Component ,useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert'
import { Button } from 'bootstrap';
import { positions, Provider } from "react-alert";
// import AlertTemplate from "react-alert-template-basic";
import Promt from './Promt';





export default class Confirm extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.state = {Flag:null ,flights: [],flights2: [],counter:0,count:0,counter2:0,count2:0, seats: 0, seats2: 0, seatsArr: [] ,Bool:[],Bool2:[],test:[],chosenSeats:[],class:-1,class2:-1,index:-1,id1:null,id2:null};
    
    const words = window.location.pathname.split("&")
    
    var x=this.state.seatsArr;
    var count =0;
    for(var i =6;i<words.length;i++)

    { if(count+""===words[3])
    
    { 
        // x.push(-1);
    }
      x.push(Number.parseInt(words[i]));
    count ++;}
     
    
    this.setState({seatsArr:x});

    var v=this.state.seatsArr;
    for(var i=0;i<v.length;i++){
        if(v[i]=== -1){
            this.setState({Flag:i});
        }
    }

  }
  

  async componentDidMount() {
      // Flight 1
    await axios.get('http://localhost:5000/UserHomePage/flightdata/'+window.location.pathname.substring(47,71))
      .then(response => {
        this.setState({ flights: response.data })
        
      })
      .catch((error) => {
        console.log(error);
      })
     
          
      


    //Flight 2
    await axios.get('http://localhost:5000/UserHomePage/flightdata/'+window.location.pathname.substring(76,100))
      .then(response => {
        this.setState({ flights2: response.data })
        
      })
      .catch((error) => {
        console.log(error);
      })
      var y=[];
      var x=0;
      if(window.location.pathname.substring(72,73)=="1"){
        y=this.state.flights.BusinessSeats; 
        x=this.state.flights.Business
        this.setState({Bool:y});
        this.setState({class:1});
        this.setState({count:x})
      }else{
          if(window.location.pathname.substring(72,73)=="2"){
            y=this.state.flights.FirstSeats
            x=this.state.flights.First
            this.setState({Bool:y});
            this.setState({class:2});
            this.setState({count:x})
          }else{
              if(window.location.pathname.substring(72,73)=="3"){
                y=this.state.flights.EconomySeats
                x=this.state.flights.Economy
                this.setState({Bool:y});
                this.setState({class:3});
                this.setState({count:x})
              }
          }
      }

      if(window.location.pathname.substring(101,102)=="1"){
        y=this.state.flights2.BusinessSeats
        this.setState({Bool2:y});
        this.setState({class2:1});
        this.setState({count2:x})
    }else{
        if(window.location.pathname.substring(101,102)=="2"){
            y=this.state.flights2.FirstSeats
            this.setState({Bool2:y});
            this.setState({class2:2});
            this.setState({count2:x})
        }else{
            if(window.location.pathname.substring(101,102)=="3"){
                y=this.state.flights2.EconomySeats
                this.setState({Bool2:y});
                this.setState({class2:3});
                this.setState({count2:x})
            }
        }
    }
          
    this.setState({id2:window.location.pathname.substring(76,100)});
    this.setState({id1:window.location.pathname.substring(47,71)});

  }

  

  onSubmit(){
    
    
    var check = false
    var seats = this.state.seatsArr
    var flight1Bool = this.state.Bool
    var flight2Bool = this.state.Bool2
    for(var i =0 ;i<seats.length;i++)
    {
          if(seats[i]===-1)
          {check = true;
        i = i+1;}

        if(check===false)
        {flight1Bool[seats[i]]=false}
        else
        {flight2Bool[seats[i]]=false}

    }
     
     axios.post('http://localhost:5000/UserHomePage/chooseSeat/' + window.location.pathname.substring(22,46), this.state)
       .then(res => console.log(res.data)); 
 
       //Flight 1
     axios.post('http://localhost:5000/UserHomePage/classBoolean/' + window.location.pathname.substring(76,100), this.state)
     .then(res => console.log(res.data)); 
     // window.location=window.location.pathname;
     this.forceUpdate()

     
        //Flight 2
     axios.post('http://localhost:5000/UserHomePage/classBoolean2/' + window.location.pathname.substring(47,71), this.state)
     .then(res => console.log(res.data)); 
     // window.location=window.location.pathname;
     this.forceUpdate()

  }



  flightFrom() {

    return this.state.flights.From;
 
  }
  flightTo() {

  return this.state.flights.To;

  }
flightArrival() {

  return (this.state.flights.Arrival+"").substring(0,10);

} 
flightArrivalTime() {

  return (this.state.flights.Arrival+"").substring(11,16);

} 
flightDeparture() {

  return (this.state.flights.Departure+"").substring(0,10);

}

flightDepartureTime() {

  return (this.state.flights.Departure+"").substring(11,16);

} 

flightTripDurTime() {
  const x= this.flightArrivalTime()+"";
  const y= this.flightDepartureTime()+"";
  const z= "Hours: "+Math.abs(Number.parseInt(x.substring(0,2))-Number.parseInt(y.substring(0,2)))+":"+ Math.abs(Number.parseInt(x.substring(3))-Number.parseInt(y.substring(3)));
  const x2=this.flightArrival()+"";
  const y2=this.flightDeparture()+"";
  const z2="Days: "+Math.abs(Number.parseInt(x2.substring(8))-Number.parseInt(y2.substring(8)));
  return z2 +" "+z ;

} 


flightNumber() {
 
  return window.location.pathname.substring(67,71);
} 


flightCabinClass() {
  if(window.location.pathname.substring(72,73)=="1")
    return "Business";
    if(window.location.pathname.substring(72,73)=="2")
    return "First Class";
    if(window.location.pathname.substring(72,73)=="3")
    return "Economy";
    return "";

}

flightBaggageAllowance() {

  if(window.location.pathname.substring(72,73)=="1"){
      return "2x40 1x20";
  }else{
    if(window.location.pathname.substring(72,73)=="2"){
      return "2x35 1x15";
    }else{
      return "2x30 1x15";
    }
  }
  return "";

}

flightPrice() {

    if(window.location.pathname.substring(72,73)=="1"){
        return 150;
    }else{
      if(window.location.pathname.substring(72,73)=="2"){
        return 100;
      }else{
        return 75;
      }
    }
    return "";
  
  }



flightFrom2() {

    return this.state.flights2.From;
 
  }
  flightTo2() {

  return this.state.flights2.To;

  }
flightArrival2() {

  return (this.state.flights2.Arrival+"").substring(0,10);

} 
flightArrivalTime2() {

  return (this.state.flights2.Arrival+"").substring(11,16);

} 
flightDeparture2() {

  return (this.state.flights2.Departure+"").substring(0,10);

}

flightDepartureTime2() {

  return (this.state.flights2.Departure+"").substring(11,16);

} 

flightTripDurTime2() {
  const x= this.flightArrivalTime()+"";
  const y= this.flightDepartureTime()+"";
  const z= "Hours: "+Math.abs(Number.parseInt(x.substring(0,2))-Number.parseInt(y.substring(0,2)))+":"+ Math.abs(Number.parseInt(x.substring(3))-Number.parseInt(y.substring(3)));
  const x2=this.flightArrival()+"";
  const y2=this.flightDeparture()+"";
  const z2="Days: "+Math.abs(Number.parseInt(x2.substring(8))-Number.parseInt(y2.substring(8)));
  return z2 +" "+z ;

} 


flightNumber2() {
  return window.location.pathname.substring(96,100);
} 


flightCabinClass2() {
  if(window.location.pathname.substring(101,102)=="1")
    return "Business";
    if(window.location.pathname.substring(101,102)=="2")
    return "First Class";
    if(window.location.pathname.substring(101,102)=="3")
    return "Economy";
    return "";

}

flightBaggageAllowance2() {

  if(window.location.pathname.substring(101,102)=="1"){
      return "2x40 1x20";
  }else{
    if(window.location.pathname.substring(101,102)=="2"){
      return "2x35 1x15";
    }else{
      return "2x30 1x15";
    }
  }
  return "";

}

flightPrice2() {

    if(window.location.pathname.substring(72,73)=="1"){
        return 150;
    }else{
      if(window.location.pathname.substring(72,73)=="2"){
        return 100;
      }else{
        return 75;
      }
    }
    return "";
  
  }
 

  flightTotalPrice() {

    return this.flightPrice()+this.flightPrice2();
  
  }




  render() {
  
    return (

      <div>
          <div className="">
        <div >
        <nav className="navbar navColor navbar-dark navbar-expand-lg ">
        <Link to={"/UserHomePage/"+ window.location.pathname.substring(22,46)} className="navbar-brand">FSR</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to={"/UserHomePage/userSearch/"+ window.location.pathname.substring(22,46)}className="nav-link">Search</Link>
          </li>
          <li><Link to={"/UserHomePage/reservationList/"+(window.location.pathname.substring(22,46))} className="nav-link">Reservations</Link></li>
        <li><Link to={"/UserHomePage/editUser/"+(window.location.pathname.substring(22,46))} className="nav-link">Edit Personal Information</Link></li>
        <li className='signoutPos'><Link to="/" className="nav-link">Sign out</Link></li>
        </ul>
        </div>
      </nav>
      </div>
      

      <div className='container'>
        
        <table className="table container">
       
          <thead className="thead-light">
            <tr>
              <th><h2>Seats</h2></th>
            </tr>
          </thead>
          <tbody>
            
          </tbody>
        </table>
        <h3>Selected Departure Flight</h3>
      <table className="table container">
      
          <thead className="thead-light">
            <tr>
            <th>Flight Number</th>
            <th>Cabin Class</th>
            <th>Flight Baggage Allowance</th>
            <th>From</th>
            <th>To</th>
            <th>Departure Date</th>
            <th>Departure Time</th>
            <th>Arrival Date</th>
            <th>Arrival Time</th>
            <th>Duration Time</th>
            <th>Price</th>       
            </tr>
          </thead>
          <tbody>
          <td>{this.flightNumber()}</td>
          <td> {this.flightCabinClass()}</td>
          <td>{this.flightBaggageAllowance()}</td>
          <td>{this.flightFrom()}</td>
          <td>{this.flightTo()}</td>
          <td>{this.flightArrival()}</td>
          <td>{this.flightArrivalTime()}</td>
          <td>{this.flightDeparture()}</td>
          <td>{this.flightDepartureTime()}</td>
          <td>{this.flightTripDurTime()}</td>
          <td>{this.flightPrice()}</td>
          </tbody>
        </table>
        <br></br>
        <br></br>
        <br></br>
        <h3>Selected Return Flight</h3>
      <table className="table container">
      
          <thead className="thead-light">
            <tr>
            <th>Flight Number</th>
            <th>Cabin Class</th>
            <th>Flight Baggage Allowance</th>
            <th>From</th>
            <th>To</th>
            <th>Departure Date</th>
            <th>Departure Time</th>
            <th>Arrival Date</th>
            <th>Arrival Time</th>
            <th>Duration Time</th>
            <th>Price</th>       
            </tr>
          </thead>
          <tbody>
          <td>{this.flightNumber2()}</td>
          <td> {this.flightCabinClass2()}</td>
          <td>{this.flightBaggageAllowance2()}</td>
          <td>{this.flightFrom2()}</td>
          <td>{this.flightTo2()}</td>
          <td>{this.flightArrival2()}</td>
          <td>{this.flightArrivalTime2()}</td>
          <td>{this.flightDeparture2()}</td>
          <td>{this.flightDepartureTime2()}</td>
          <td>{this.flightTripDurTime2()}</td>
          <td>{this.flightPrice2()}</td>
          </tbody>

          <br></br>
        <br></br>
        <br></br>

          <thead className="thead-light">
            <tr>
            <th>Total Price</th>
            <th>Booking Number</th>   
            </tr>
          </thead>
          <tbody>
          <td>{this.flightTotalPrice()}</td>
           <td>{this.flightNumber()+this.flightNumber2()}</td>
          </tbody>
        </table>
          

        {<Link to={"/UserHomePage/PayEdit2/"+window.location.pathname.substring(22)+"&$"+this.flightTotalPrice()}><button className='GButton' type="button"onClick={() => {this.onSubmit()}} >Confirm</button></Link>}
        {<Link to={"/UserHomePage/"+window.location.pathname.substring(22,46)}><button className='GButton' type="button"  >Cancel</button></Link>}

      
        </div>
        </div>
      </div>
    )

  }
}