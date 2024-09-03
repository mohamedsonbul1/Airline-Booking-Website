import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { withRouter } from "react-router-dom";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';






export default class SelectedFlight extends Component {
  constructor(props) {
    super(props);
    this.state = {
        flights:[]
      }
    
  }


  


  async componentDidMount() {
    await axios.get('http://localhost:5000/UserHomePage/SelectedFlight/' + window.location.pathname.substring(54,78))
      .then(response => {
        this.setState({ flights: response.data })
        
      })
      .catch((error) => {
        console.log(error);
      })
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
 
  
  return window.location.pathname.substring(53+21,53+25);
} 


flightCabinClass() {
  if(window.location.pathname.substring(79,80)=="1")
    return "Business";
    if(window.location.pathname.substring(79,80)=="2")
    return "First Class";
    if(window.location.pathname.substring(79,80)=="3")
    return "Economy";
    return "";

}

flightBaggageAllowance() {

  if(window.location.pathname.substring(78,79)=="Bussiness"){
      return "2x40 1x20";
  }else{
    if(window.location.pathname.substring(78,79)=="First"){
      return "2x35 1x15";
    }else{
      return "2x30 1x15";
    }
  }
  return "";

}

getUserSign(){
  if(window.location.pathname.substring(29,53)=="666666666666666666666666"){
    return <li className='signoutPos'><Link to="/userLogin" className="nav-link">Sign in</Link></li>;

  }else{
    return <li className='signoutPos'><Link to="/" className="nav-link">Sign out</Link></li>;
  }
} 


  

  render() {
    return (

        <div>
        <div className=" ">
        <nav className="navbar navColor navbar-dark navbar-expand-lg ">
        <Link to={"/UserHomePage/"+window.location.pathname.substring(29,53)} className="navbar-brand">FSR</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
        <li><Link to={"/UserHomePage/userSearch/"+window.location.pathname.substring(29,53)} className="nav-link">Search</Link></li>
        <li><Link to={"/UserHomePage/reservationList/"+(window.location.pathname.substring(29,53))} className="nav-link">Reservations</Link></li>
        <li><Link to={"/UserHomePage/editUser/"+(window.location.pathname.substring(29,53))} className="nav-link">Edit Personal Information</Link></li>
        {/* <li className='signoutPos'><Link to="/" className="nav-link">Sign out</Link></li> */}
        {this.getUserSign()}
        </ul>
        </div>
      </nav>
      <div className='container'>
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
          </tbody>
        </table>
        <Link to ={"/UserHomePage/returnFlights/"+window.location.pathname.substring(29)}> <button className='GButton'>Select Return a Flight</button></Link>
        </div>
      </div>
      </div>




    )
  }
}

