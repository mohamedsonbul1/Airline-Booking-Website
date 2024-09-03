import React, { Component ,useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';




// get from seats boolean array

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


export default class ChangeSeats extends Component {
  constructor(props) {
    super(props);

    this.seatsList = this.seatsList.bind(this);
    this.choseSeat = this.choseSeat.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {flights:[],user: {},counter:0,count:0, seats: 0, seatsArr: [] ,Bool:[],test:[],chosenSeats:[],class:-1,index:-1, str:"",IND:null,NewClass:-1,CID:0};
    // alert(window.location.pathname.substring(76,77));
    
  }
  

  async componentDidMount() {
    this.setState({IND:window.location.pathname.substring(76,77)});
    //   alert(window.location.pathname.substring(26,50));
    if(window.location.pathname.substring(23,47)=="666666666666666666666666"){
      window.location= "/userLogin";

    }

    await axios.get('http://localhost:5000/UserHomePage/personalInformation/'+window.location.pathname.substring(26,50))
      .then(response => {
        this.setState({ user: response.data })
        
      })
      .catch((error) => {
        console.log(error);
      })

      this.setState({NewClass:this.state.user.seats[this.state.IND].Class});
      
    //   alert(this.state.user.seats[this.state.IND].Class);

      await axios.get('http://localhost:5000/UserHomePage/flightdata/'+window.location.pathname.substring(51,75))
      .then(response => {
        this.setState({ flights: response.data })
        
      })
      .catch((error) => {
        console.log(error);
      })

      this.setState({CID:window.location.pathname.substring(78)});
      
   
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
        
        var seats=this.state.user.seats[this.state.IND].seats;
        var c=0;
        var y=this.state.Bool;
        if(this.state.CID==0){
          var i=0;
          for(;i<seats.length;i++){
        if(seats[i]==-1)
            break;
        y[seats[i]]=true;
        }
      }else{
        if(this.state.CID==1){
          var i=0;
          for(;seats[i]!=-1;i++){}
          for(;i<seats.length;i++){
             y[seats[i]]=true;
            }  
            
          
        }
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
      this.setState({str:s});
    }else{
      alert("You have reached the needed number of seats: "+this.state.counter);
    }
    // alert(window.location.pathname.substring(51,75));
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
  
     
     axios.post('http://localhost:5000/UserHomePage/chooseSeat2/' +window.location.pathname.substring(26,50), this.state)
       .then(res => console.log(res.data)); 
 
       //Flight 1
     axios.post('http://localhost:5000/UserHomePage/classBoolean/' + window.location.pathname.substring(51,75), this.state)
     .then(res => console.log(res.data)); 
     window.location="/UserHomePage/SelectedReservedFlight/"+window.location.pathname.substring(26,50)+"&"+window.location.pathname.substring(76,77);
     this.forceUpdate()

      //  axios.post('http://localhost:5000/UserHomePage/chooseSeat/' + window.location.pathname.substring(23,47), this.state)
      //    .then(res => console.log(res.data)); 
   
      //  axios.post('http://localhost:5000/UserHomePage/classBoolean/' + window.location.pathname.substring(48,72), this.state)
      //  .then(res => console.log(res.data)); 
      //  Flag=true;
      //  this.forceUpdate()
       
    window.location="/UserHomePage/SelectedReservedFlight/"+window.location.pathname.substring(26,50)+"&"+this.state.CID;
}

 

  render() {
  
    return (

      <div>
        <div className="">
        <nav className="navbar navColor navbar-dark navbar-expand-lg ">
        <Link to={"/UserHomePage/"+ window.location.pathname.substring(26,50)} className="navbar-brand">FSR</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
        <li><Link to={"/UserHomePage/userSearch/"+window.location.pathname.substring(26,50)} className="nav-link">Search</Link></li>
        <li><Link to={"/UserHomePage/reservationList/"+(window.location.pathname.substring(26,50))} className="nav-link">Reservations</Link></li>
        <li><Link to={"/UserHomePage/editUser/"+(window.location.pathname.substring(26,50))} className="nav-link">Edit Personal Information</Link></li>
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
           <div className=''> { this.seatsList()}</div>
            <button className='GButton' onClick={() => {this.onSubmit()}} >Save and Continue </button>
          </tbody>
        </table>
        

      
        
       
      </div>
    )

  }
}