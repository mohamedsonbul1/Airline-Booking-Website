import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
// import { response } from 'express';
import plane from '../world.png'; 
export default class userLogin extends Component {
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

    

    axios.post('http://localhost:5000/Home/UserLogin', user)
    .then( 
      response => {
        
       if(response.data._id!="null" )
        {
          window.location="/UserHomePage/"+response.data._id
        }else{
          
            if (window.confirm("Please Enter a Valid Username/Password")) {
              window.location="/userLogin"
            }
          
        } 

      })
      .catch((error) => {
        console.log(error);
      });
    
  }

 
  getImage(){

    return <img src={plane} width={400} height={400} alt="world" />;
  }


  render() {
    return (
      <div className=''>
        {/* <div className='loginBackgroung2'></div> */}
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
        
        <div className='LoginBorder'></div>
        <h3 className='titleLogin'>Login</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group LoginUser"> 
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
          
          <div className="form-group">
            <input type="submit" value="Login" className="btn btn-primary LoginUserButton" />
          </div>
        </form>
        
        
         <Link to={{pathname:"/UserHomePage/"+"666666666666666666666666"}}><button type="button" class="btn btn-dark LoginUserButton2"   >Continue as a Geust User</button></Link>
        
        <Link to={{pathname : '/userSignUp' }} >
            <button type="button" class="btn btn-dark LoginUserButton3" >Signup</button>
            </Link>
         <div className='mapImage'>  
         <h3>Explore The World with US</h3>
        {this.getImage()}
        </div> 
       
      </div>
    )
  }




}
























