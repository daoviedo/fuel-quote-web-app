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

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  loginAuth(){
    fetch(`http://138.197.221.30:4000/login`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: this.state.username,
            password: this.state.password
        }),
    })
    .then(res => res.json())
    .then(result => {document.cookie = "token="+result.token;this.setState({auth: result.authentication});})
    .catch(err => console.log(err))
  }

  handleSubmit = event => {
    event.preventDefault();
    this.loginAuth();
  }

  render() {
    const returnAuth = this.state.auth;
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