import React, { Component ,useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert'
import { Button } from 'bootstrap';
import { positions, Provider } from "react-alert";
// import AlertTemplate from "react-alert-template-basic";
import Promt from './Promt';
import emailjs from 'emailjs-com';

const Reserv = props => (
  
    <tr>
      <td>{props.flight.From}</td>
      <td>{props.flight.To}</td>
    
      <td>
      </td>
    </tr>
    
  )

  const Reserv2 = props => (
  
    <tr>
      <td>{props.flight.From}</td>
      <td>{props.flight.To}</td>
    
      <td>
      <a href="#" onClick={() => { props.selectFlights(props.index) }}>Select Flight</a> | <a href="#" onClick={() => { props.deleteFlights(props.index) }}>Cancel Flight</a>
      </td>
    </tr>
    
  )



export default class reservationList extends Component {
  constructor(props) {
    super(props);

    this.deleteFlights = this.deleteFlights.bind(this)
    this.selectFlights = this.selectFlights.bind(this)
    this.ReservList = this.ReservList.bind(this)

    this.state = { email:"",reservations: [],flight1:[],flight2:[],Depflight_ID:null,Retflight_ID:null, };
    
    if(window.location.pathname.substring(30)=="666666666666666666666666"){
      alert("Please Sign In");
      window.location="/UserHomePage/666666666666666666666666"
    }

  }
  

  async componentDidMount() {
    
    await axios.get('http://localhost:5000/UserHomePage/allReservations/' + window.location.pathname.substring(30))
      .then(response => {
          this.setState({email:response.data.email});
          var array = []
        //   alert("array[0].Depflight_ID");
        var len = response.data.seats.length;
          for(var i =0;i<len;i++)
          {array.push(response.data.seats.pop());
           }
        this.setState({ reservations: array })
        // alert(this.state.reservations[3].Depflight_ID);
      })
      .catch((error) => {
        console.log(error);
      })

      
     var y=[];
     var x=[];
     x=this.state.flight1;
     y=this.state.flight2;
    var len=this.state.reservations.length
    // alert(len);
      for(var i=0;i<len;i++){
        //  alert(i);
      await axios.get('http://localhost:5000/UserHomePage/flightdata/' + this.state.reservations[i].Depflight_ID)
      .then(response => {
        
       
        x.push(response.data);
        // alert(x[0]);
        // this.setState({flight1:x});
        
      })
      .catch((error) => {
        console.log(error);
      })
     
      
      await axios.get('http://localhost:5000/UserHomePage/flightdata/' +  this.state.reservations[i].Retflight_ID)
      .then(response => {
        
        y.push(response.data);
      
        // this.setState({flight2:response.data});
      })
      .catch((error) => {
        console.log(error);
      })
    }
   this.setState({flight1:x});
   this.setState({flight2:y});
//    alert(this.state.flight1[3].From);
//    alert(this.state.flight2[3].From);
}
  deleteFlights(id) {
    // alert(this.state.email);
    if (window.confirm("Are you sure you want to cancel")) {
        
      let temp = {
        index:id
    };
    axios.post('http://localhost:5000/UserHomePage/Cancel/'+window.location.pathname.substring(30) , temp)
      .then(res => { console.log(res.data)});

    
    emailjs.send("service_hvsa6bj","template_hmdjhj4",{
        email: this.state.email,
        });
    window.location="/UserHomePage/reservationList/"+window.location.pathname.substring(30);
}
    
  }


  selectFlights(id){
  //   let temp = {
  //     index:id
  // };
    // axios.post('http://localhost:5000/UserHomePage/SelectFlight/'+window.location.pathname.substring(30) , temp)
    //   .then(res => { this.setState({Depflight_ID:res.data.seats[id].Depflight_ID,Retflight_ID:res.data.seats[id].Retflight_ID})});

    // alert(this.state.Depflight_ID+"&&&"+this.state.Retflight_ID)
    window.location="/UserHomePage/SelectedReservedFlight/"+window.location.pathname.substring(30,54)+"&"+id;

  }


  ReservList() {

    return this.state.flight1.map(currentflight => {
      return <Reserv flight={currentflight}  deleteFlights={this.deleteFlights}   key={currentflight._id}/>;
    })
  }

  ReservList2() {
      var x=0;
  return this.state.flight2.map(currentflight => {
      x++;
    return <Reserv2 flight={currentflight} index={x-1} selectFlights={this.selectFlights} deleteFlights={this.deleteFlights}   key={currentflight._id}/>;
  })
}

 

 sendEmail () {
    
    
    // emailjs.send("service_hvsa6bj","template_hmdjhj4",{
    //     email: this.state.email,
    //     });

    // emailjs.sendForm('gmail', 'template_hmdjhj4', temp, 'user_xZFV3QD3xOrLbBXl4vLkC')
    //   .then((result) => {
    //       console.log(result.text);
    //   }, (error) => {
    //       alert("shit happens!");
    //   });
     

  };



  render() {
  
    return (

      <div>
          <div className=" ">
        <div >
        <nav className="navbar navColor navbar-dark navbar-expand-lg ">
        <Link to={"/UserHomePage/"+window.location.pathname.substring(30,54)} className="navbar-brand">FSR</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">  
          <li><Link to={"/UserHomePage/userSearch/"+window.location.pathname.substring(30,54)} className="nav-link">Search</Link></li>
          <li><Link to={"/UserHomePage/reservationList/"+(window.location.pathname.substring(30,54))} className="nav-link">Reservations</Link></li>
        <li><Link to={"/UserHomePage/editUser/"+(window.location.pathname.substring(30,54))} className="nav-link">Edit Personal Information</Link></li>
        <li className='signoutPos'><Link to="/" className="nav-link">Sign out</Link></li>
        </ul>
        </div>
      </nav>
      </div>
      
        
        <div className='container'>
        <h3>Reservations</h3>
        <div >
        <table className="table container table1" >
        
          <thead className="thead-light">
            <tr>
              <th>Departure Flight From</th>
              <th>Departure Flight To</th>
              
            </tr>
          </thead>
          <tbody>
            {this.ReservList()}
          </tbody>
        </table>
        </div>
        <div style={{ height: 10 }}>

        <table className="table container table2">
        
        <thead className="thead-light">
          <tr>
            
            <th>Return Flight From</th>
            <th>Return Flight To</th>
            <th>Cancel</th>
            
          </tr>
        </thead>
        <tbody>
          {this.ReservList2()} 
        </tbody>
      </table>


      </div>

      </div>
      </div>
       
      </div>
    )

  }
}