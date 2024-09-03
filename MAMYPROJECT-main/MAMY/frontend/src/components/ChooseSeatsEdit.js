import React, { Component ,useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';




// get from seats boolean array

const Seat = props => (
  <tr>
    <td> <button className='GButton' onClick={() => { props.choseSeat(props.Element)}} >Seat number {props.Element}</button></td>
   
  </tr>
)

const Seat2 = props => (
    <tr>
      <td><button className='GButton' onClick={() => {alert("This seat is already taken") }} >Taken Seat {props.Element}</button></td>
     
    </tr>
  )


export default class ChangeSeatsEdit extends Component {
  constructor(props) {
    super(props);

    this.seatsList = this.seatsList.bind(this);
    this.choseSeat = this.choseSeat.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { flights:[],user: {},counter:0,count:0, seats: 0, seatsArr: [] ,Bool:[],test:[],chosenSeats:[],class:-1,index:-1, str:"",IND:null,NewClass:-1,CID:0};
    // alert(window.location.pathname.substring(30,54));
    
  }
  

  async componentDidMount() {
    this.setState({IND:Number.parseInt(window.location.pathname.substring(80,81))});
    this.setState({CID:window.location.pathname.substring(86,87)});
    // alert(this.state.CID);
      // alert(window.location.pathname.substring(80,81));
    if(window.location.pathname.substring(23,47)=="666666666666666666666666"){
      window.location= "/userLogin";

    }

    await axios.get('http://localhost:5000/UserHomePage/personalInformation/'+window.location.pathname.substring(30,54))
      .then(response => {
        this.setState({ user: response.data })
        
      })
      .catch((error) => {
        console.log(error);
      })

      this.setState({NewClass:window.location.pathname.substring(82,83)});
      
    //   alert(this.state.user.seats[this.state.IND].Class);

      await axios.get('http://localhost:5000/UserHomePage/flightdata/'+window.location.pathname.substring(55,79))
      .then(response => {
        this.setState({ flights: response.data })
        
      })
      .catch((error) => {
        console.log(error);
      })

      
   
      var x=0;
      var y=[];
      if(this.state.NewClass=="1"){
          this.setState({class:1});
          x=this.state.flights.Business
          y=this.state.flights.BusinessSeats
          this.setState({count:x});
          this.setState({seats:x});
          this.setState({Bool:y});
        }else{
          if(this.state.NewClass=="2"){
            
              x=this.state.flights.First
              y=this.state.flights.FirstSeats
              this.setState({count:x});
              this.setState({seats:x});
              this.setState({Bool:y});
              this.setState({class:2});
              
            }else{
              if(this.state.NewClass=="3"){
                this.setState({class:3});
                  x=this.state.flights.Economy
                  y=this.state.flights.EconomySeats
                  this.setState({count:x});
                  this.setState({seats:x});
                  this.setState({Bool:y});
                  
              }
          }
      }
        var i=0;
        var seats=this.state.user.seats[this.state.IND].seats;
        var c=0;
        var y=this.state.Bool;
        for(;i<seats.length;i++){
        if(seats[i]==-1)
            break;
        y[seats[i]]=true;
        }
        this.setState({Bool:y});
        


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
    // alert(id);
    if(Number.parseInt(id)<10){
      id="0"+id;
    }
    var p=[];
    var x=this.state.seatsArr;
    var y=this.state.Bool;
    var z=this.state.counter;
    var i=0
    var seats=this.state.user.seats[this.state.IND].seats;
    var c=0;
    for(;i<seats.length;i++){
        if(seats[i]==-1)
            break;
        c++;
    }
    // alert(c);
    var q=c;
    if(this.state.counter<q){
      x.push(id);
      y.splice(id,1,false);
      z++;
      this.setState({seatsArr:x});
      this.setState({Bool:y});
      this.setState({counter:z});
      // alert(this.state.count);
      var s=this.state.str;
      s+="&"+id;
      // alert(x[1]);
      this.setState({str:s});
    }else{
      alert("You have reached the needed number of seats: "+this.state.counter);
    }
    // alert(window.location.pathname.substring(51,75));
    // alert(this.state.NewClass);
  }

  onSubmit(){
    
    var z=this.state.counter;
    var q=Number.parseInt(window.location.pathname.substring(75,76));
    var Flag=false;
    
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
    // alert(this.state.seatsArr[0 ]);
     axios.post('http://localhost:5000/UserHomePage/chooseSeat3/' +window.location.pathname.substring(30,54), this.state)
       .then(res => console.log(res.data)); 
 
       //Flight 1
     axios.post('http://localhost:5000/UserHomePage/classBoolean/' + window.location.pathname.substring(55,79), this.state)
     .then(res => console.log(res.data)); 
     window.location="/UserHomePage/SelectedReservedFlight/"+window.location.pathname.substring(26,50)+"&"+window.location.pathname.substring(76,77);
     this.forceUpdate()

      //  axios.post('http://localhost:5000/UserHomePage/chooseSeat2/' + window.location.pathname.substring(30,54), this.state)
      //    .then(res => console.log(res.data)); 
   
      //  axios.post('http://localhost:5000/UserHomePage/classBoolean/' + window.location.pathname.substring(48,72), this.state)
      //  .then(res => console.log(res.data)); 
      //  Flag=true;
      //  this.forceUpdate()

      var x=window.location.pathname;
      var f=false;
     for(var i=0;i<x.length;i++){
       if(x.substring(i,i+1)=="N"){
        //  alert(x.substring(i,i+1));
         window.location="/UserHomePage/Itinerary1/"+window.location.pathname.substring(30,87)+this.state.str+window.location.pathname.substring(87);
        f=true;
      }
    }
    if(!f)
    window.location="/UserHomePage/PayEdit1"+window.location.pathname.substring(29);      
  
}

 

  render() {
  
    return (

      <div>
        <div className="">
        <nav className="navbar navColor navbar-dark navbar-expand-lg ">
        <Link to={"/UserHomePage/"+ window.location.pathname.substring(30,54)} className="navbar-brand">FSR</Link>
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
        
        <table className="table container Seats">
       
          <thead className="thead-light">
            <tr>
              <th><h2>Seats</h2></th>
            </tr>
          </thead>
          <tbody>
            { this.seatsList()}
            {<button  className='GButton' onClick={() => {this.onSubmit()}} >Save and Continue </button>}
          </tbody>
        </table>
        

      
        
       
      </div>
    )

  }
}