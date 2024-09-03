import React, { Component ,useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';




// get from seats boolean array

const Seat = props => (
  <tr>
    <td> <button type="button" onClick={() => { props.choseSeat(props.Element)}} >Seat number {props.Element}</button></td>
   
  </tr>
)

const Seat2 = props => (
    <tr>
      <td><button type="button"onClick={() => {alert("This seat is already taken") }} >Taken Seat {props.Element}</button></td>
     
    </tr>
  )


export default class ChangeSeats2 extends Component {
  constructor(props) {
    super(props);

    this.seatsList = this.seatsList.bind(this);
    this.choseSeat = this.choseSeat.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {flights:[],user: {},counter:0,count:0, seats: 0, seatsArr: [] ,Bool:[],test:[],chosenSeats:[],class:-1,index:-1, str:"",IND:null,NewClass:-1};
    // alert(window.location.pathname.substring(76,77));
    
  }
  

  async componentDidMount() {
    this.setState({IND:window.location.pathname.substring(76,77)});
    //   alert(window.location.pathname.substring(26,50));
    if(window.location.pathname.substring(24,48)=="666666666666666666666666"){
      window.location= "/userLogin";

    }

    await axios.get('http://localhost:5000/UserHomePage/personalInformation/'+window.location.pathname.substring(27,51))
      .then(response => {
        this.setState({ user: response.data })
        
      })
      .catch((error) => {
        console.log(error);
      })

      this.setState({NewClass:this.state.user.seats[this.state.IND].Class2});
      
    //   alert(this.state.user.seats[this.state.IND].Class);

      await axios.get('http://localhost:5000/UserHomePage/flightdata/'+window.location.pathname.substring(52,76))
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
    var q=Number.parseInt(window.location.pathname.substring(76,77));
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
     
     axios.post('http://localhost:5000/UserHomePage/chooseSeat2/' +window.location.pathname.substring(27,51), this.state)
       .then(res => console.log(res.data)); 
 
       //Flight 1
     axios.post('http://localhost:5000/UserHomePage/classBoolean/' + window.location.pathname.substring(52,76), this.state)
     .then(res => console.log(res.data)); 
     window.location="/UserHomePage/SelectedReservedFlight/"+window.location.pathname.substring(27,51)+"&"+window.location.pathname.substring(77,78);
     this.forceUpdate()

      //  axios.post('http://localhost:5000/UserHomePage/chooseSeat/' + window.location.pathname.substring(23,47), this.state)
      //    .then(res => console.log(res.data)); 
   
      //  axios.post('http://localhost:5000/UserHomePage/classBoolean/' + window.location.pathname.substring(48,72), this.state)
      //  .then(res => console.log(res.data)); 
      //  Flag=true;
      //  this.forceUpdate()
       
  
}

 

  render() {
  
    return (

      <div>
        <div className="">
        <nav className="navbar navColor navbar-dark navbar-expand-lg ">
        <Link to={"/UserHomePage/"+ window.location.pathname.substring(24,47)} className="navbar-brand">FSR</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to={"/UserHomePage/userSearch/"+ window.location.pathname.substring(24,47)} className="nav-link">Search</Link>
          </li>
          <li className='signoutPos'><Link to="/" className="nav-link">Sign out</Link></li>
        </ul>
        </div>
      </nav>
      </div>
        
        <table className="table container">
       
          <thead className="thead-light">
            <tr>
              <th>Seats</th>
            </tr>
          </thead>
          <tbody>
            { this.seatsList()}
            {<Link to={"/UserHomePage/SelectedReservedFlight/"+window.location.pathname.substring(24)+this.state.str}><button type="button"onClick={() => {this.onSubmit()}} >Save and Continue </button></Link>}
          </tbody>
        </table>
        

      
        
       
      </div>
    )

  }
}