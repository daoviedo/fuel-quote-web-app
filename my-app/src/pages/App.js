import React, { Component } from 'react';
import './css/App.css';
import { BrowserRouter } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Redirect from 'react-router-dom/Redirect';
import Login from './Login';
import Home from './Home';
import Register from './Register';
import Acc_mng from './Acc_mng';
import UserList from './UserList';
import Fuel_History from './Fuel_history';
import Fuel_Quote from './FuelRequestForm';
import Test from './Test';



class App extends Component {
  state={
    testVar: false
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">

          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/manage_account" exact component={Acc_mng} />
          <Route path="/userlist" exact component={UserList} />
          <Route path="/fuel_history" exact component={Fuel_History} />
          <Route path="/req_fuel_quote" exact component={Fuel_Quote} />
          <Route path="/test" exact component={Test} />

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
