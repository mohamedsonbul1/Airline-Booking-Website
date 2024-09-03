import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import DateTimePicker from 'react-datetime-picker';
import { Link } from 'react-router-dom';


export default class Addflight extends Component {
  constructor(props) {
    super(props);

    this.onChangeFrom = this.onChangeFrom.bind(this);
    this.onChangeTo = this.onChangeTo.bind(this);
    this.onChangeArrival = this.onChangeArrival.bind(this);
    this.onChangeDeparture = this.onChangeDeparture.bind(this);
    this.onChangeFirst = this.onChangeFirst.bind(this);
    this.onChangeEconomy = this.onChangeEconomy.bind(this);
    this.onChangeBusiness = this.onChangeBusiness.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
   
    this.state = {
      From: '',
      To: '',
      Date: new Date(),
      Arrival: new Date(),
      Departure: new Date(),
      Economy:0 ,
      Business: 0,
      First:0
      
      
    }
  }


  onChangeFrom(e) {
    this.setState({
      From: e.target.value
    })
  }

  onChangeTo(e) {
    this.setState({
      To: e.target.value
    })
  }
  onChangeFirst(e) {
    this.setState({
        First: e.target.value
    })
  }
  onChangeBusiness(e) {
    this.setState({
        Business: e.target.value
    })
  }
  onChangeEconomy(e) {
    this.setState({
        Economy: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      Date: date
    })
  }
  onChangeArrival(date) {
    this.setState({
        Arrival: date
    })
  }
  onChangeDeparture(date) {
    this.setState({
        Departure: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const newFlight = {
      


      From: this.state.From,
      To: this.state.To,
      Date: this.state.Date,
      Arrival: this.state.Arrival,
      Departure: this.state.Departure,
      Economy:this.state.Economy ,
      Business: this.state.Business,
      First:this.state.First
    }

    console.log(newFlight);

    axios.post('http://localhost:5000/AdminHome/add-flight/', newFlight)
      .then(res => console.log(res.data));

    window.location = '/AdminHomePage';
  }

  render() {
    return (
      <div>
        
        <div className="">
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

    <div className="container">
      <h3>Create New Flight Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>From: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.From}
              onChange={this.onChangeFrom}
              />
        </div>
        <div className="form-group"> 
          <label>To :  </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.To}
              onChange={this.onChangeTo}
              />
        </div>
        <div className="form-group">
          <label>Date :  </label>
          <div>
            <DatePicker
              selected={this.state.Date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>
        <div className="form-group">
          <label>Arrival :  </label>
          <DateTimePicker
            onChange={this.onChangeArrival}
            value={this.state.Arrival}
            />
        </div>
        <div className="form-group">
          <label>Departure :  </label>
          <DateTimePicker
            onChange={this.onChangeDeparture}
            value={this.state.Departure}
            />
        </div>
        <div className="form-group">
          <label>Economy :  </label>
          <input 
              type="int" 
              className="form-control"
              value={this.state.Economy}
              onChange={this.onChangeEconomy}
              />
        </div>
        <div className="form-group">
          <label>Business :  </label>
          <input 
              type="int" 
              className="form-control"
              value={this.state.Business}
              onChange={this.onChangeBusiness}
              />
        </div>
        <div className="form-group">
          <label>First :  </label>
          <input 
              type="int" 
              className="form-control"
              value={this.state.First}
              onChange={this.onChangeFirst}
              />
        </div>

        <div className="form-group">
          <input type="submit" value="Add fligt" className="btn GButton" />
        </div>
      </form>
    </div>
    </div>
    )
  }
}