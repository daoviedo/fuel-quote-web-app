import React, { Component } from 'react';
import './css/App.css';
import { BrowserRouter } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Redirect from 'react-router-dom/Redirect';
import Login from './Login';
import Home from './Home';
import Register from './Register';
import Accmng from './Acc_mng';
import UserList from './UserList';
import FuelHistory from './Fuel_history';
import FuelQuote from './FuelRequestForm';
import Test from './Test';




class App extends Component {
  state={
    loggedIn: false,
    rendered: false,
    privlevel: ""
  }

  componentDidMount(){
    this.verifyLogged();
  }

  verifyLogged(){
    fetch(`http://138.197.221.30:4000/verify`,{
            method: "GET",
            headers: {
                "Authorization": "Bearer "+ document.cookie.split('=')[1]
            }
        })
        .then(res => res.json())
        .then(result => this.setState({loggedIn: result.authentication, privlevel: result.userdata.privelege, rendered: true}))
        .catch(err => this.setState({rendered: true}))
  }

  render() {
    const {rendered, loggedIn, privlevel} = this.state;
    return (
      <BrowserRouter>
        <div className="App">

          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          
          
          <Route exact path="/manage_account" render={() => (
             rendered ? (
              (
                loggedIn ? (
                  <Accmng/>
                ) : (
                  <Redirect to="/login"/>
                )
              )
            ) : (
              <div/>
            )
          )}/>
          <Route exact path="/fuel_history" render={() => (
             rendered ? (
              (
                loggedIn ? (
                  <FuelHistory/>
                ) : (
                  <Redirect to="/login"/>
                )
              )
            ) : (
              <div/>
            )
          )}/>
          <Route exact path="/req_fuel_quote" render={() => (
             rendered ? (
              (
                loggedIn ? (
                  <FuelQuote/>
                ) : (
                  <Redirect to="/login"/>
                )
              )
            ) : (
              <div/>
            )
          )}/>



          <Route exact path="/userlist" render={() => (
             rendered ? (
              (
                privlevel === 'Admin' ? (
                  <UserList/>
                ) : (
                  <Redirect to="/"/>
                )
              )
            ) : (
              <div/>
            )
          )}/>
          <Route exact path="/test" render={() => (
             rendered ? (
              (
                privlevel === 'Admin' ? (
                  <Test/>
                ) : (
                  <Redirect to="/"/>
                )
              )
            ) : (
              <div/>
            )
          )}/>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
