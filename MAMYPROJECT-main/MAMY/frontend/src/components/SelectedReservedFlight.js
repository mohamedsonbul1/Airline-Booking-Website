import React, { Component ,useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert'
import { Button } from 'bootstrap';
import { positions, Provider } from "react-alert";
// import AlertTemplate from "react-alert-template-basic";
import Promt from './Promt';


const Flights = props => (
  
  <tr>
    <td>{props.flights.From}</td>
    <td>{props.flights.To}</td>
    <td>{props.flights.Date ? props.flights.Date.substring(0, 10) : ''}</td>
    <td>{ props.flights.Date ? props.flights.Arrival.substring(0, 10) : '' }</td>
    <td>{ props.flights.Date ? props.flights.Arrival.substring(11, 16) : '' }</td>
    <td>{ props.flights.Date ? props.flights.Departure.substring(0, 10) : '' }</td>
    <td>{ props.flights.Date ? props.flights.Departure.substring(11, 16) : '' }</td>
    <td>{ props.seats }</td>
    <td>
      <Link to={props.toLink+props.UID+"&"+props.flights._id+"&"+props.index+"&"+props.id}>Change Flight Seats</Link> |<Link to={"/UserHomePage/EditReservedFlight/"+props.UID+"&"+props.flights._id+"&"+props.index+"&"+props.id}>Edit Flight</Link> 
    </td>
  </tr>
)



export default class SelectedReservedFlight extends Component {
  constructor(props) {
    super(props);
    this.state = {DepFlight: [],RetFlight:[], promt: false , Depflight_ID:"", Retflight_ID:"",DepSeats:"",RetSeats:""};
   
  }
    
  
  

  async componentDidMount() {
      
    
    let temp = {
        index:window.location.pathname.substring(62,63)
    };
    await axios.get('http://localhost:5000/UserHomePage/SelectFlight/'+window.location.pathname.substring(37,61) , temp)
    .then(res => { this.setState({Depflight_ID:res.data.seats[temp.index].Depflight_ID,Retflight_ID:res.data.seats[temp.index].Retflight_ID})
    var x=res.data.seats[temp.index];
    
    var i=0;
    var z="";
    for(;i<x.seats.length ;i++){
        if(x.seats[i]==-1){
            break;
        }else{
            // z+=""+x.seats[i]+"-";
            // alert(z);
            if(x.seats.length==1){
                z+=x.seats[i];
            }else{
                if(((i+1)*2)==x.seats.length-1){ 
                    z+=x.seats[i];
                }else{
                    z+=x.seats[i]+"-";
                }
            }
            
        }
    }
    this.setState({DepSeats:z});
    z="";
    i++;
    for(;i<x.seats.length;i++){
        if(x.seats.length==1){
            z+=x.seats[i];
        }else{
            if(i+1==x.seats.length){ 
                z+=x.seats[i];
                
            }else{
                z+=x.seats[i]+"-";
            }
        }
    }
    this.setState({RetSeats:z});

});
    
    
    
    // alert(temp.index);
    // alert("this.state.Depflight_ID");
    await axios.get('http://localhost:5000/UserHomePage/SelectedFlight/'+this.state.Depflight_ID)
      .then(response => {
        this.setState({ DepFlight: response.data })
        
      })
      .catch((error) => {
        console.log(error);
      })
    //   alert("this.state.Depflight_ID");
      await axios.get('http://localhost:5000/UserHomePage/SelectedFlight2/'+this.state.Retflight_ID)
      .then(response => {
        this.setState({ RetFlight: response.data })
        
      })
      .catch((error) => {
        console.log(error);
      })
  }

  


  flightsList() {
      return <Flights toLink={"/UserHomePage/ChangeSeats/"} flights={this.state.DepFlight} UID={window.location.pathname.substring(37,61)} seats={this.state.DepSeats} id={0} index={window.location.pathname.substring(62,63)} />;
   
  }
  flightsList2() {
      return <Flights toLink={"/UserHomePage/ChangeSeats/"} flights={this.state.RetFlight} UID={window.location.pathname.substring(37,61)} seats={this.state.RetSeats}  id={1} index={window.location.pathname.substring(62,63)}/>;
  }
  

 

  render() {
  
    return (

      <div className=" ">
        <div className="">
        <nav className="navbar navColor navbar-dark navbar-expand-lg ">
        <Link  to={"/UserHomePage/"+window.location.pathname.substring(37,61)} className="navbar-brand">FSR</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
        <li><Link to={"/UserHomePage/userSearch/"+window.location.pathname.substring(37,61)} className="nav-link">Search</Link></li>
        <li><Link to={"/UserHomePage/reservationList/"+(window.location.pathname.substring(37,61))} className="nav-link">Reservations</Link></li>
        <li><Link to={"/UserHomePage/editUser/"+(window.location.pathname.substring(37,61))} className="nav-link">Edit Personal Information</Link></li>
        <li className='signoutPos'><Link to="/" className="nav-link">Sign out</Link></li>
        </ul>
        </div>
      </nav>
      </div>
      
        
      <div className='container'>
      <h3>Departure Flight</h3>
        <table className="table container">
          <thead className="thead-light">
            <tr>
            <th>From</th>
              <th>To</th>
              <th>Date</th>
              
              <th>Arrival Date</th>
              <th>Arrival Time</th>
              <th>Departure Date</th>
              <th>Departure Time</th>
              <th>Seats</th>
            </tr>
          </thead>
          <tbody>
            { this.flightsList()}
            
          </tbody>
        </table>


        <h3>Return Flight</h3>
        <table className="table container">
          <thead className="thead-light">
            <tr>
            <th>From</th>
              <th>To</th>
              <th>Date</th>
              <th>Arrival Date</th>
              <th>Arrival Time</th>
              <th>Departure Date</th>
              <th>Departure Time</th>
            </tr>
          </thead>
          <tbody>
            { this.flightsList2()}
            
          </tbody>
        </table>
        

      
        </div>
       
      </div>
    )

  }
}