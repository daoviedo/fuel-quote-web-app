import React, { Component } from 'react';
import './App.css';
import { Button, Nav,NavDropdown,Navbar,Form,FormControl } from 'react-bootstrap';
import {BrowserRouter} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Login from './Login';
import Home from './Home';
import Register from './Register';
import Acc_mng from './Acc_mng';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">

        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/manage_account" exact component={Acc_mng} />


        </div>
      </BrowserRouter>
    );
  }
}

export default App;
