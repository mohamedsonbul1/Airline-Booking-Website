import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { withRouter } from "react-router-dom";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';


const Flights = props => (
  <tr>
    <td>{props.flights.From}</td>
    <td>{props.flights.To}</td>
    <td>{props.flights.Arrival.substring(0,10)}</td>
    <td>{props.flights.Departure.substring(0,10)}</td>
    <td>
    <Link to={"/UserHomePage/SelectedReturnFlight/"+window.location.pathname.substring(28)+"&"+props.flights._id+"&"+props.CabinClass}>Select</Link>
    </td>
  </tr>
)
{/* <Link to={"/UserHomePage/SelectedFlight/"+props.flights._id+"&"+props.CabinClass}>Select</Link> */}


export default class returnFlights extends Component {
  constructor(props) {
    super(props);
    
    this.onChangeNumberofPassengers = this.onChangeNumberofPassengers.bind(this);
    this.onChangeArrival = this.onChangeArrival.bind(this);
    this.onChangeDeparture = this.onChangeDeparture.bind(this);
    this.onChangeCabinClass = this.onChangeCabinClass .bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.componentDidMount = this.componentDidMount.bind(this);

    this.state = {
      NumberofPassengers: -1 ,
      From: null ,
      To: null,
      Arrival: null ,
      Departure: null ,
      CabinClass:"",
      flightSearched:[],
      flights:[]
    }

  }

  async componentDidMount() {
    await axios.get('http://localhost:5000/UserHomePage/flightdata/'+window.location.pathname.substring(53,77))
      .then(response => {
        this.setState({ flights: response.data })
        
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeNumberofPassengers(e) {
    this.setState({
        NumberofPassengers: e.target.value
    })
  }
  onChangeCabinClass(e) {
    this.setState({
        CabinClass: e.target.value
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
    console.log(date);
  }


  onSubmit(e) {
    e.preventDefault();

    const flight = {
          From: this.state.flights.To,
          To:this.state.flights.From,
          Arrival: this.state.Arrival,
          Departure: this.state.Departure,
          CabinClass:this.state.CabinClass,
          NumberofPassengers:Number(this.state.NumberofPassengers)
          
    }

    console.log(flight);

   axios.post('http://localhost:5000/UserHomePage/searchFlights', flight)
      .then(res => this.setState({flightSearched : res.data} ));
      console.log(this.state.flightSearched)
 
  
  }

  flightsResult() {
    return this.state.flightSearched.map(currentflight => {
      return <Flights flights={currentflight} selectFlights={this.selectFlights} key={currentflight._id} CabinClass={this.state.CabinClass}/>;
    }
    )
  }

  getUserSign(){
    if(window.location.pathname.substring(28,52)=="666666666666666666666666"){
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
        <Link to={"/UserHomePage/"+window.location.pathname.substring(28,52)} className="navbar-brand">FSR</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          
          <li><Link to={"/UserHomePage/userSearch/"+window.location.pathname.substring(28,52)} className="nav-link">Search</Link></li>
          <li><Link to={"/UserHomePage/reservationList/"+(window.location.pathname.substring(28,52))} className="nav-link">Reservations</Link></li>
        <li><Link to={"/UserHomePage/editUser/"+(window.location.pathname.substring(28,52))} className="nav-link">Edit Personal Information</Link></li>
        {/* <li className='signoutPos'><Link to="/" className="nav-link">Sign out</Link></li> */}
        {this.getUserSign()}
        </ul>
        </div>
      </nav>
      </div>

      <div className="container">
      <h3>Available Return Flights</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group">
          <label>Arrival :  </label>
          <DatePicker
            selected={this.state.Arrival}
            onChange={this.onChangeArrival}
            />
        </div>
        <div className="form-group">
          <label>Departure :  </label>
          <DatePicker
            selected={this.state.Departure}
            onChange={this.onChangeDeparture}
            />
        </div>
        <br></br>
        <div className="form-group">
        <label>Cabin Class :  </label>
        <br></br>
            <select name="choice" onChange={this.onChangeCabinClass}>
            <option value=""  >Choose Class</option>
            <option value="1"  >Bussiness Class</option>
            <option value="2"   >First Class</option>
            <option value="3"   >Economy Class</option>
            </select>
        </div>
        
        <br></br>
        <div>
          <div className="form-group">
            <input type="submit" value="Search Flight" className="btn GButton" />
          </div>
         
        </div>
      </form>

      <div className= "" >
      <h3>Flights Result</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Arrival Date</th>
            <th>Departure Date</th>     
          </tr>
        </thead>
        <tbody>
          { this.flightsResult() }
        </tbody>
      </table>
      </div>
    </div>
</div>
    )
  }
}