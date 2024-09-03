import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
// import { response } from 'express';

export default class UserHomePage extends Component {
 

  getUserSign(){
    if(window.location.pathname.substring(14)=="666666666666666666666666"){
      return <li className='signoutPos'><Link to="/userLogin" className="nav-link">Sign in</Link></li>;
  
    }else{
      return <li className='signoutPos'><Link to="/" className="nav-link">Sign out</Link></li>;
    }
  }  

  render() {
    return (
        <div className="">
        <nav className="navbar navColor navbar-dark navbar-expand-lg " >
        <Link to={"/UserHomePage"+(window.location.pathname.substring(13))} className="navbar-brand">FSR</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li><Link to={"/UserHomePage/userSearch"+(window.location.pathname.substring(13))} className="nav-link">Search</Link></li>
          <li><Link to={"/UserHomePage/reservationList"+(window.location.pathname.substring(13))} className="nav-link">Reservations</Link></li>
          <li><Link to={"/UserHomePage/editUser"+(window.location.pathname.substring(13))} className="nav-link">Edit Personal Information</Link></li>
          {/* <li className='signoutPos'><Link to="/" className="nav-link">Sign out</Link></li> */}
          {this.getUserSign()}
        </ul>
        </div>
      </nav>
      </div>
    )
  }




}