import React, { Component } from "react";
import Navbar from './components/nav_bar';


export default class Home extends Component {
    state ={
        users: [],
    }

    componentDidMount(){
        this.getData();
    }

    getData(){
        fetch('http://localhost:4000/users')
        .then(response=> response.json())
        .then(res=> this.setState({users: res.data}))
        .catch(err => console.log(err))
    }

    render() {
        console.log(this.state.users)
        return (
            <div>  
                <Navbar />
                <br/><br/><br/><br/>
                
                {this.state.users.map(({username, password, firstname})=><p>{username}:{password}:{firstname}</p>)}
            </div>
        );
    }
}