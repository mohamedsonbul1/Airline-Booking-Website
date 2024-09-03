import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
//import { withRouter } from "react-router-dom";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';
export default class Edituser extends Component {
  constructor(props) {
    super(props);
    this.onChangefirstname = this.onChangefirstname.bind(this);
    this.onChangelastname = this.onChangelastname.bind(this);
    this.onChangepassportNumber = this.onChangepassportNumber.bind(this);
    this.onChangeemail = this.onChangeemail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
this.state = {
      passportNumber: 0 ,
      email: '' ,
      firstName:'',
      lastName:'',
      user:[]
      }

      if(window.location.pathname.substring(23)=="666666666666666666666666"){
        alert("Please Sign In");
        window.location="/UserHomePage/666666666666666666666666"
      }
    }
    
    
    onChangelastname(e) {
        this.setState({
            lastName: e.target.value
        })
      }
    onChangefirstname(e) {
        this.setState({
            firstName: e.target.value
        })
      }
    
    onChangepassportNumber(e) {
        this.setState({
            passportNumber: e.target.value
        })
      }
      onChangeemail(e) {
        this.setState({
            email: e.target.value
        })
      }

      onSubmit(e) {
        e.preventDefault();
    
        const user = {
          passportNumber: this.state.passportNumber ,
          email: this.state.email ,
          firstName:this.state.firstName ,
          lastName:this.state.lastName 
    }
    
    axios.post('http://localhost:5000/UserHomePage/editUser/' + window.location.pathname.substring(23), user) // check id
          .then(res => console.log(res.data));
          window.location = '/UserHomePage/'+window.location.pathname.substring(23);      
} 



    
 
    
  async componentDidMount() {
    await axios.get('http://localhost:5000/AdminHome/EditFlight/' + window.location.pathname.substring(20))
      .then(response => {
      this.setState({ user: response.data })
      // console.log(this.state.flights);
    })
    .catch((error) => {
      console.log(error);
    })
  }














    render() {
        return (
            
            <div className=" ">

      <nav className="navbar navColor navbar-dark navbar-expand-lg ">
        <Link to={"/UserHomePage/"+window.location.pathname.substring(23,47)} className="navbar-brand">FSR</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">  
          <li><Link to={"/UserHomePage/userSearch/"+window.location.pathname.substring(23,47)} className="nav-link">Search</Link></li>
          <li><Link to={"/UserHomePage/reservationList/"+(window.location.pathname.substring(23,47))} className="nav-link">Reservations</Link></li>
        <li><Link to={"/UserHomePage/editUser/"+(window.location.pathname.substring(23,47))} className="nav-link">Edit Personal Information</Link></li>
        <li className='signoutPos'><Link to="/" className="nav-link">Sign out</Link></li>
        </ul>
        </div>
       </nav>



          <div className='container'>

      <h3>Edit User Information</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>FirsName: </label>
          <input  type="text"
              className="form-control"
              value={this.state.firstName}
              onChange={this.onChangefirstname}
              
              />
        </div>
        <div className="form-group"> 
          <label>LastName :  </label>
          <input  type="text"
              className="form-control"
              value={this.state.lastName}
              onChange={this.onChangelastname}
              />
        </div>
        <div className="form-group">
          <label>Passport Number :  </label>
          <input  type="text"
              className="form-control"
              value={this.state.passportNumber}
              onChange={this.onChangepassportNumber}
              />
        </div>
        <div className="form-group">
          <label>Email :  </label>
          <input  type="text"
              className="form-control"
              value={this.state.email}
              onChange={this.onChangeemail}
              />
        </div>
        
        <br></br>
          <Link to={{pathname : '/UserHomePage/ChangePassword/'+ window.location.pathname.substring(23,47) }}><button className='GButton'>Change Password</button></Link>
          <br></br>
        <div className="form-group">
          <input type="submit" value="Update user information" className="btn GButton" />
        </div>
      </form>
    </div>
    </div>
    
        )
      }




}