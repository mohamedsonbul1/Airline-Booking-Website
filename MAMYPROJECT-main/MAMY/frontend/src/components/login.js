import React, { Component } from 'react';
import axios from "axios";
// import { response } from 'express';
import { Link } from 'react-router-dom';
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      password: ''
    }
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }
  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username
      ,password: this.state.password

    }

//    console.log(user);

    axios.post('http://localhost:5000/Home/login', user)
      .then( window.location="/AdminHomePage"
        );

    
  }



  render() {
    return (

      <div>

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

      <div className='ContainerAdmin'>
        <div ><h3 className='centerAdmin'>login</h3></div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
                <label>Password: </label>
            <input  type="password"
                required
                className="form-control"
                value={this.state.password}
                onChange={this.onChangePassword}
                />
          </div>
          
          <div className="form-group centerAdmin2">
            <input type="submit" value="Login" className="btn GButton" />
          </div>
        </form>
      </div>
      </div>
    )
  }




}
























