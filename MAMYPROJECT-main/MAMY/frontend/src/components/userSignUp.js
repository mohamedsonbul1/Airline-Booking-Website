import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import plane from '../world2.png'; 

export default class userSignUp extends Component {
  constructor(props) {
    super(props);

    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangefirstName = this.onChangefirstName.bind(this);
    this.onChangelastName = this.onChangelastName.bind(this);
    this.onChangePassportNumber = this.onChangePassportNumber.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      UserName: '',
      Password: '',
      Email: " ",
      PassportNumber: 0,
      firstName:"",
      lastName:""
    }
  }


  onChangeUserName(e) {
    this.setState({
        UserName: e.target.value
    })
  }
  onChangefirstName(e) {
    this.setState({
        firstName: e.target.value
    })
  }
  onChangelastName(e) {
    this.setState({
        lastName: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
        Password: e.target.value
    })
  }
  onChangeEmail(e) {
    this.setState({
        Email: e.target.value
    })
  }
  onChangePassportNumber(e) {
    this.setState({
        PassportNumber: e.target.value
    })
  }

  getImage(){

    return <img src={plane} width={500} height={500} alt="world" />;
  }
  
  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      UserName: this.state.UserName,
      Password: this.state.Password,
      Email: this.state.Email,
      PassportNumber: this.state.PassportNumber,
      firstName: this.state.firstName,
      lastName:this.state.lastName
     
    }


    axios.post('http://localhost:5000/Home/SignUp/', newUser)
      .then(res => console.log(res.data));
    window.location = '/userLogin';
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
    

    <div className="SignUpBorder">
      <h3 className='creatNewUserTitle'>Create New User</h3>
      <form onSubmit={this.onSubmit}>
       
        <div className="form-group"> 
          <label>UserName: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.UserName}
              onChange={this.onChangeUserName}
              />
        </div>
        <div className="form-group"> 
          <label>Password :  </label>
          <input  type="password"
              required
              className="form-control"
              value={this.state.Password}
              onChange={this.onChangePassword}
              />
        </div>
        <div className="form-group"> 
          <label>FirstName :  </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.firstName}
              onChange={this.onChangefirstName}
              />
        </div>
        <div className="form-group"> 
          <label>LastName :  </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.lastName}
              onChange={this.onChangelastName}
              />
        </div>
        <div className="form-group"> 
          <label>Email :  </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.Email}
              onChange={this.onChangeEmail}
              />
        </div>
        <div className="form-group"> 
          <label>PassportNumber :  </label>
          <input  type="int"
              required
              className="form-control"
              value={this.state.PassportNumber}
              onChange={this.onChangePassportNumber}
              />
        </div>
       
        <div className="form-group">
          <input type="submit" value="Create User" className="btn btn-primary createUserButton GButton" />
        </div>
      </form>
      
    </div>
    {/* <div className='signupImage'>{this.getImage()}</div> */}
    
    </div>
    )
  }
}