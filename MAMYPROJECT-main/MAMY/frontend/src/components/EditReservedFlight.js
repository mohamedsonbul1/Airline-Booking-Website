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
      <td>{props.flightID}</td>  
      <td>{props.flights.From}</td>
      <td>{props.flights.To}</td>
    <td>{props.flights.Arrival.substring(0,10)}</td>
    <td>{props.flights.Arrival.substring(11,16)}</td>
    <td>{props.flights.Departure.substring(0,10)}</td>
    <td>{props.flights.Departure.substring(11,16)}</td>
    <td>{props.price}</td>
    <td> <Link onClick={()=> { props.confirm() }} to={"/UserHomePage/SelectedFlight1M3/"+props.UID+"&"+props.flights._id+"&"+props.index+"&"+props.CabinClass+"&"+props.numOfSeats+"&"+props.oldClass+"&$"+props.price}>Select</Link>
      </td>
    </tr>
  )


export default class EditReservedFlight extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        flights:[], user:[],CabinClass:0,flightSearched:[],Date:"",index:0,UID:0, numOfSeats:0,oldClass:""
      }
    this.flightsResult = this.flightsResult.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeCabinClass = this.onChangeCabinClass.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
  }

  async componentDidMount() {
    // alert("HHHH");
    await axios.get('http://localhost:5000/UserHomePage/personalInformation/'+window.location.pathname.substring(33,57))
      .then(response => {
        this.setState({ user: response.data })
        
      })
      .catch((error) => {
        console.log(error);
      })
      this.setState({UID:window.location.pathname.substring(33,57)});
      this.setState({index:window.location.pathname.substring(83,84)});
      var seats=0;
      var v= this.state.user.seats[Number.parseInt(this.state.index)].seats;
      // alert(v);
      for(var i=0;i<v.length;i++){
        if(v[i]==-1)
            break;  
        seats++;  
          
      }
      this.setState({numOfSeats:seats});
      // alert(this.state.user.seats[0].Class);
      // alert(seats);
    var x="";
    var index=Number.parseInt(window.location.pathname.substring(83,84));
    var id=window.location.pathname.substring(85,86);
    this.setState({oldClass:id});
    if(id=="0"){
        
        this.setState({class:this.state.user.seats[index].Class});
    }else{
        if(id=="1"){
            this.setState({class:this.state.user.seats[index].Class2});
        }
    }
    

    await axios.get('http://localhost:5000/UserHomePage/SelectedFlight/' + window.location.pathname.substring(58,82))
      .then(response => {
        this.setState({ flights: response.data })
        
      })
      .catch((error) => {
        console.log(error);
      })
    //   alert(window.location.pathname.substring(83,84));
      this.setState({index:window.location.pathname.substring(83,84)});
    //   alert(this.state.index);

      
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
  return window.location.pathname.substring(78,82);
} 


flightCabinClass() {
    var x=""+this.state.class;
  if(x=="1")
    return "Business";
    if(x=="2")
    return "First Class";
    if(x=="3")
    return "Economy";
    return "";

}

flightBaggageAllowance() {

    // alert(window.location.pathname.substring(85));
    
    
    // alert(this.state.class);
    var x=""+this.state.class;
    if(x=="1"){
          return "2x40 1x20";
    }else{
        if(x =="2"){
        return "2x35 1x15";
    }else{
      return "2x30 1x15";
    }
  }
  return "";

}


flightsResult() {    
    return this.state.flightSearched.map(currentflight => {
    
        var price="N";
        var y=this.state.CabinClass;
        var z=0;
        if(this.state.oldClass=="0")
          {z=this.state.user.seats[Number.parseInt(this.state.index)].Class;}
         else{
          z=this.state.user.seats[Number.parseInt(this.state.index)].Class2;
         } 
        // alert(y);
        if(z=="1"){
            switch(y){
                case "1": break;
                case "2": break;
                case "3": break;
            }

        }else{
            if(z=="2"){
                switch(y){
                    case "1": price="100" ; break;
                    case "2":  break;
                    case "3":  break;
                }

            }else{
                if(z=="3"){
                    switch(y){
                        case "1": price="100" ; break;
                        case "2": price="50" ;break;
                        case "3": break;
                    }

                }
            }
        }
        

        

      return <Flights oldClass={this.state.oldClass} flights={currentflight} index={this.state.index} class={this.state.class} confirm={this.confirm} numOfSeats={this.state.numOfSeats} UID={this.state.UID} price={price} selectFlights={this.selectFlights} key={currentflight._id} CabinClass={this.state.CabinClass} flightID={window.location.pathname.substring(78,82)} />;
    }
    )
  }





  confirm(){
    if (!window.confirm("Please Confirm Reserving the Chose Flight")) {
        window.location=window.location.pathname;
      }
  }


  onSubmit(e) {
    e.preventDefault();

    


    const flight = {
          From: this.flightFrom(),
          To: this.flightTo(),
          Departure: this.state.Date,
          CabinClass:this.state.CabinClass,
    }

   

   axios.post('http://localhost:5000/UserHomePage/searchEditFlights/', flight)
      .then(res => this.setState({flightSearched : res.data} ));
      console.log(this.state.flightSearched)
    // var z=this.state.flightSearched;
    //   alert("z");
  
  }


  onChangeCabinClass(e) {
    this.setState({
        CabinClass: e.target.value
    })
    
  }

  onChangeDate(date) {
    this.setState({
        Date: date
    })
    console.log(date);
  }

  render() {
    return (

        <div>
        <div className=" ">
        <nav className="navbar navColor navbar-dark navbar-expand-lg ">
        <Link to={"/UserHomePage/"+window.location.pathname.substring(33,57)} className="navbar-brand">FSR</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
        <li><Link to={"/UserHomePage/userSearch/"+window.location.pathname.substring(33,57)} className="nav-link">Search</Link></li>
        <li><Link to={"/UserHomePage/reservationList/"+(window.location.pathname.substring(33,57))} className="nav-link">Reservations</Link></li>
        <li><Link to={"/UserHomePage/editUser/"+(window.location.pathname.substring(33,57))} className="nav-link">Edit Personal Information</Link></li>
        <li className='signoutPos'><Link to="/" className="nav-link">Sign out</Link></li>
        </ul>
        </div>
      </nav>
      <div className='container'> 
      <h3>Selected Flight</h3>
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
        <br></br>
        <br></br>
        <br></br>
        
      
        
        {/* <Link to ={"/UserHomePage/DepSeats/"+window.location.pathname.substring(22)}> <button>Confirm and view seats</button></Link> */}
      </div><br></br>


      <div className="container">
      <h3>Search Flight</h3>
      <form onSubmit={this.onSubmit}>
        
        <br></br>
        <div className="form-group">
          <label>Date :  </label>
          <div>
            <DatePicker
              selected={this.state.Date}
              onChange={this.onChangeDate}
            />
          </div>
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
          {/* <Link to={{pathname : '/AdminHomePage/searchResult' , state:{flights : this.state.flightSearched}}} > */}
          <div className="form-group">
            <input type="submit" value="Search Flight" className="btn GButton" />
          </div>
          {/* </Link> */}
        </div>
      </form>

      <div className= "" >
      <h3>Flights Result</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Flight Number</th>  
            <th>To</th>
            <th>From</th>
            <th>Arrival Date</th>
            <th>Arrival Time</th>
            <th>Departure Date</th>
            <th>Departure Time</th>
            <th>Price Difference</th>
          </tr>
        </thead>
        <tbody>
          { this.flightsResult() }
        </tbody>
      </table>
      </div>
    </div>

      </div>
      </div>

      




    )
  }
}