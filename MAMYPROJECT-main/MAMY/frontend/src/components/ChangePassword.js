import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
//import { withRouter } from "react-router-dom";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';
export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.onChangeOldPass = this.onChangeOldPass.bind(this);
    this.onChangeNewPass = this.onChangeNewPass.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
this.state = {
      OldPass: '' ,
      NewPass: '' ,
      user:[]
      }
    }
    
    
    
    onChangeOldPass(e) {
        this.setState({
            OldPass: e.target.value
        })
      }
    onChangeNewPass(e) {
        this.setState({
            NewPass: e.target.value
        })
      }
    

      onSubmit(e) {

        e.preventDefault();
    
        const user = {
          oldPass: this.state.OldPass ,
          newPass: this.state.NewPass 
    }
    
    axios.post('http://localhost:5000/UserHomePage/editPass/' + window.location.pathname.substring(29), user) // check id
          .then(response =>{
            if(response.data._id=="null" )
            {
                if (window.confirm("Please Enter a Valid Old Password")) {
                    window.location="/UserHomePage/ChangePassword/"+window.location.pathname.substring(29);
                  }
            }else{
                window.location = '/UserHomePage/'+window.location.pathname.substring(29);
            }
        }
            );
               
} 



    
 
    
//   async componentDidMount() {
//     await axios.get('http://localhost:5000/AdminHome/EditFlight/' + window.location.pathname.substring(20))
//       .then(response => {
//       this.setState({ user: response.data })
//       // console.log(this.state.flights);
//     })
//     .catch((error) => {
//       console.log(error);
//     })
//   }




    render() {
        return (
            
            <div className="">

      <nav className="navbar navColor navbar-dark navbar-expand-lg ">
        <Link to={"/UserHomePage/"+window.location.pathname.substring(29)} className="navbar-brand">FSR</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">  
          <li><Link to={"/UserHomePage/userSearch/"+window.location.pathname.substring(29)} className="nav-link">Search</Link></li>
          <li><Link to={"/UserHomePage/reservationList/"+(window.location.pathname.substring(29))} className="nav-link">Reservations</Link></li>
        <li><Link to={"/UserHomePage/editUser/"+(window.location.pathname.substring(29))} className="nav-link">Edit Personal Information</Link></li>
        <li className='signoutPos'><Link to="/" className="nav-link">Sign out</Link></li>
        </ul>
        </div>
       </nav>



          <div className='container'>

      <h3>Edit User Information</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Old Password: </label>
          <input  type="text"
              className="form-control"
              value={this.state.firstName}
              onChange={this.onChangeOldPass}
              />
        </div>
        <div className="form-group"> 
          <label>New Password:  </label>
          <input  type="text"
              className="form-control"
              value={this.state.lastName}
              onChange={this.onChangeNewPass}
              />
        </div>
        
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