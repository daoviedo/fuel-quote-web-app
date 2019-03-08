import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel} from "react-bootstrap";
import "./css/Login.css";
import {Redirect} from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      auth: false,
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  fetchAuth = async () => {
    const response = await fetch(`http://138.197.221.30:4000/users/lookup?username=${this.state.username}&pass=${this.state.password}`);
    const json = await response.json();
    if(json.data.length===0){
    }
    else{
      if((this.state.username === json.data[0].username) && (this.state.password === json.data[0].password)){
        localStorage.setItem('username', json.data[0].username);
        localStorage.setItem('password', json.data[0].password);
        localStorage.setItem('authen', "true");
        this.setState({auth: true});
      }
      else{
      }
    }
    
  }

  handleSubmit = event => {
    this.setState({submitted: true});
    event.preventDefault();
    this.fetchAuth();
  }

  isAuthenticated(){
    const tokenU = localStorage.getItem('username');
    const tokenP = localStorage.getItem('password');
    if(tokenU===this.state.username && tokenP===this.state.password){
      return true;
      
    }
    else{
      return false;
      
    }
  }

  render() {
    const returnAuth = this.isAuthenticated();
    const isSub = this.state.submitted;
    return (
      
      <div className="Login">
      
      {returnAuth ? <Redirect to={{pathname: '/'}}/> : (
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" >
            <FormLabel>Username</FormLabel>
            <FormControl
              autoFocus
              type="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" >
            <FormLabel>Password</FormLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          {isSub ? (<p style={{color:"red"}}>Invalid Credentials</p>): <div/>}
          <Button
            block
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
          <br></br>
          <p>Don't Have an Account?&ensp;
              <Button 
              href="/register"
              variant="outline-primary" 
              size="sm"
              >Register</Button></p>
        </form>
      )}
      </div>
    );
  }
}