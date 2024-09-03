import React, { Component ,useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert'
import { Button } from 'bootstrap';
import { positions, Provider } from "react-alert";
// import AlertTemplate from "react-alert-template-basic";
import Promt from './Promt';


const Seat = props => (
  <tr>
    <td> <button className='GButton' type="button" onClick={() => { props.choseSeat(props.Element)}} >Seat number {props.Element}</button></td>
   
  </tr>
)

const Seat2 = props => (
    <tr>
      <td><button className='GButton' type="button"onClick={() => {alert("This seat is already taken") }} >Taken Seat {props.Element}</button></td>
     
    </tr>
  )


export default class DepSeats2 extends Component {
  constructor(props) {
    super(props);

    this.seatsList = this.seatsList.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.choseSeat = this.choseSeat.bind(this);
    this.state = {flights: [],counter:0,count:0, seats: 0, seatsArr: [] ,Bool:[],test:[],chosenSeats:[],str:"&-1",class:-1,index:-1,id1:null,id2:null};
    
    const words = window.location.pathname.split("&")
    
    var x=this.state.seatsArr;
    for(var i =6;i<words.length;i++)
    {    
      x.push(Number.parseInt(words[i]));}
      x.push(-1);
    this.setState({seatsArr:x});
    // this.setState({str:"-1"});

  }
  

  async componentDidMount() {
    await axios.get('http://localhost:5000/UserHomePage/flightdata/'+window.location.pathname.substring(78,102))
      .then(response => {
        this.setState({ flights: response.data })
        
      })
      .catch((error) => {
        console.log(error);
      })
      
      var x=0;
      var y=[];
      this.setState({id1:window.location.pathname.substring(49,73)});
      this.setState({id2:window.location.pathname.substring(78,102)});
      if(window.location.pathname.substring(74,75)=="1"){
          this.setState({class:1});
          x=this.state.flights.Business
          y=this.state.flights.BusinessSeats
          this.setState({count:x});
          this.setState({seats:x});
          this.setState({Bool:y});
        }else{
          if(window.location.pathname.substring(74,75)=="2"){
            
              x=this.state.flights.First
              y=this.state.flights.FirstSeats
              this.setState({count:x});
              this.setState({seats:x});
              this.setState({Bool:y});
              this.setState({class:2});
              
            }else{
              if(window.location.pathname.substring(74,75)=="3"){
                this.setState({class:3});
                  x=this.state.flights.Economy
                  y=this.state.flights.EconomySeats
                  this.setState({count:x});
                  this.setState({seats:x});
                  this.setState({Bool:y});
                  
              }
          }
      }
  }

  



  seatsList() {

    return this.state.Bool.map((Element, index) => {
        if(Element !=true)
            return <Seat2 Element={index}  choseSeat={this.choseSeat}/>;
        else    
            return <Seat Element={index}  choseSeat={this.choseSeat} />;
      })
    
  }

  choseSeat(id){
    var x=this.state.seatsArr;
    var y=this.state.Bool;
    var z=this.state.counter;
    var q=Number.parseInt(window.location.pathname.substring(76,77));
    if(this.state.counter<q){
      x.push(id);
      y.splice(id,1,false);
      z++;
      this.setState({seatsArr:x});
      this.setState({Bool:y});
      this.setState({counter:z});
      var s=this.state.str;
      s+="&"+id;
      this.setState({str:s});
      // alert(this.state.count);
    }else{
      alert("You have reached the needed number of seats: "+this.state.counter);
    }
    
  }

  
  onSubmit(){

    window.location="/UserHomePage/Confirm/"+window.location.pathname.substring(24)+this.state.str;
    
  }
 

  render() {
  
    return (

      <div>
        <div className=" ">
        <nav className="navbar navColor navbar-dark navbar-expand-lg ">
        <Link to={"/UserHomePage/"+ window.location.pathname.substring(24,48)} className="navbar-brand">FSR</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to={"/UserHomePage/userSearch/"+ window.location.pathname.substring(24,48)}className="nav-link">Search</Link>
          </li>
          <li><Link to={"/UserHomePage/reservationList/"+(window.location.pathname.substring(24,48))} className="nav-link">Reservations</Link></li>
        <li><Link to={"/UserHomePage/editUser/"+(window.location.pathname.substring(24,48))} className="nav-link">Edit Personal Information</Link></li>
        <li className='signoutPos'><Link to="/" className="nav-link">Sign out</Link></li>
        </ul>
        </div>
      </nav>
      </div>
      
        
        <table className="table container Seats">
       
          <thead className="thead-light">
            <tr>
            <th><h2>Seats</h2></th>
            </tr>
          </thead>
          <tbody>
            { this.seatsList()}
            <button className='GButton' type="button" onClick={() => {this.onSubmit()}} >Continue</button>
          </tbody>
        </table>
        

      
        
       
      </div>
    )

  }
}