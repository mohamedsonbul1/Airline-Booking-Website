import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
// import { response } from 'express';

export default class AdminHomePage extends Component {
 


  render() {
    return (
        
        <div className="LoginNav">
          
          <Link to={'/'}><button className='titleNav'>FSR</button></Link>
          
          <div >
            <Link to={{pathname : '/login' }} >
            <button type="button" className='loginButton2'>Admin Login</button>
            </Link>
          </div>
          <div >
            <Link to={{pathname : '/userLogin' }} >
            <button type="button" className='loginButton'>User Login</button>
            </Link>
          </div>
        </div>
    )
  }




}