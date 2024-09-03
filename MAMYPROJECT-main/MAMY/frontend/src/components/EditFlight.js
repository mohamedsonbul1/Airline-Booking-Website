import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
//import { withRouter } from "react-router-dom";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';


export default class EditFlight extends Component {
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
    this.componentDidMount = this.componentDidMount.bind(this);

    this.state = {
      From: '',
      To: '',
      Date: null ,
      Arrival: null ,
      Departure: null ,
      Economy:0 ,
      Business: 0,
      First:0,
      flights:[]
    }
    
  }

  componentDidMount() {
    
   
    // axios.get('http://localhost:5000/AdminHome/'+ useParams.id)
    //   .then(response => {
    //     this.setState({
    //       From: response.data.From,
    //       To: response.data.To,
    //       Date: response.data.Date,
    //       Arrival: response.data.Arrival,
    //       Departure: response.data.Departure,
    //       Economy:response.data.Economy,
    //       Business: response.data.Business,
    //       First: response.data.First
    //     })   
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
      

    // axios.get('http://localhost:5000/users/')
    //   .then(response => {
    //     if (response.data.length > 0) {
    //       this.setState({
    //         users: response.data.map(user => user.username),
    //       })
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })

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
    // console.log(date);
  }
  onChangeArrival(date) {
    this.setState({
        Arrival: date
    })
    // console.log(date);
  }
  onChangeDeparture(date) {
    this.setState({
        Departure: date
    })
    console.log(date);
  }

  onSubmit(e) {
    e.preventDefault();

    const flight = {
      From: this.state.From || this.state.flights.From ,
          To: this.state.To || this.state.flights.To,
          Date: this.state.Date ||this.state.flights.Date ,
          Arrival: this.state.Arrival || this.state.flights.Arrival,
          Departure: this.state.Departure || this.state.flights.Departure,
          Economy:this.state.Economy || this.state.flights.Economy,
          Business: this.state.Business || this.state.flights.Business,
          First: this.state.First || this.state.flights.First,
          _ID: window.location.pathname.substring(20)
    }

    console.log(flight);
   

   axios.post('http://localhost:5000/AdminHome/EditFlight/' + window.location.pathname.substring(20), flight)
      .then(res => console.log(res.data));
      console.log("Hisss")
   window.location = '/AdminHomePage/flightsList';
  }


  async componentDidMount() {
    await axios.get('http://localhost:5000/AdminHome/EditFlight/' + window.location.pathname.substring(20))
      .then(response => {
        this.setState({ flights: response.data })
        console.log(this.state.flights);
      })
      .catch((error) => {
        console.log(error);
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
      <div className="container">
      <h3>Edit Flight</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>From: </label>
          <input  type="text"
              className="form-control"
              value={this.state.From}
              onChange={this.onChangeFrom}
              />
        </div>
        <div className="form-group"> 
          <label>To :  </label>
          <input  type="text"
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
          <input type="submit" value="Update Flight" className="btn GButton" />
        </div>
      </form>
    </div>
    </div>
    )
  }
}