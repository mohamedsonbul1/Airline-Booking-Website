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
    <td>{props.flights.Date.substring(0,10)}</td>
    <td>{props.flights.Economy}</td>
    <td>{props.flights.Business}</td>
    <td>{props.flights.First}</td>
    <td>{props.flights.Arrival.substring(0,10)}</td>
    <td>{props.flights.Arrival.substring(11,16)}</td>
    <td>{props.flights.Departure.substring(0,10)}</td>
    <td>{props.flights.Departure.substring(11,16)}</td>
    <td>
      <Link to={"/AdminHomePage/edit/"+props.flights._id}>edit</Link> | <a href="#" onClick={() => { props.deleteFlights(props.flights._id) }}>delete</a>
    </td>
  </tr>
)
// <a href="#" onClick={() => { props.delete() }}>delete</a>
// props.deleteFlights(props.flights._id) 


{/* <Provider template={AlertTemplate}><Promt deleteFlights={this.deleteFlights} /></Provider> */}


export default class flightsList extends Component {
  constructor(props) {
    super(props);

    this.deleteFlights = this.deleteFlights.bind(this)
    

    this.state = {flights: [], promt: false };
    
    
  }
  

  async componentDidMount() {
    await axios.get('http://localhost:5000/AdminHome/allFlights')
      .then(response => {
        this.setState({ flights: response.data })
        
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteFlights(id) {

    axios.delete('http://localhost:5000/AdminHome/'+id)
      .then(res => { console.log(res.data)});

    this.setState({
      flights: this.state.flights.filter(el => el._id !== id)
    })
  }


  flightsList() {
    return this.state.flights.map(currentflight => {
      return <Flights flights={currentflight} deleteFlights={this.deleteFlights} key={currentflight._id}/>;
    })
  }

  render() {
  
    return (

      <div>
        <div className=" ">
        <nav className="navbar navColor navbar-dark navbar-expand-lg ">
        <Link to="/AdminHomePage" className="navbar-brand">FSR</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/AdminHomePage/flightsList" className="nav-link">Show all available flights</Link>
          </li>
          <li><Link to="/AdminHomePage/Addflight" className="nav-link">Add Flight</Link></li>
          <li><Link to="/AdminHomePage/search" className="nav-link">Search</Link></li>
          <li className='signoutPos'><Link to="/" className="nav-link">Sign out</Link></li>
        </ul>
        </div>
      </nav>
      </div>
      
        
      <div className='container'>
      <h3>Flights Available</h3>
        <table className="table container">
        
          <thead className="thead-light">
            <tr>
            <th>From</th>
              <th>To</th>
              <th>Date</th>
              <th>Economy</th>
              <th>Business</th>
              <th>First</th>
              <th>Arrival Date</th>
              <th>Arrival Time</th>
              <th>Departure Date</th>
              <th>Departure Time</th>
            </tr>
          </thead>
          <tbody>
            { this.flightsList()}
            
          </tbody>
        </table>
        

      
        </div>
       
      </div>
    )

  }
}