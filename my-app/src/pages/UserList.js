import React, { Component } from "react";
import {Button} from 'react-bootstrap';
import './UserList.css';
import Navbar from './components/nav_bar';

export default class Register extends Component{

    state = {
        users: [],
        user: {
            username: '',
            password: ''
        }
    }

    componentDidMount() {
        this.getUser();
    }

    getUser = _ => {
        fetch('http://localhost:4000/users')
        .then(response => response.json())
        .then(response => this.setState({users: response.data}))
        .catch(err => console.log(err))
    }

    addUser = _ => {
        const {user} = this.state;
        fetch(`http://localhost:4000/users/add?username=${user.username}&pass=${user.password}`)
        .then(this.getUser)
        .catch(err => console.log(err))
    }

    delUser = (username,pass) => {
        fetch(`http://localhost:4000/users/remove?username=${username}&pass=${pass}`)
        .then(this.getUser)
        .catch(err => console.log(err))
    }

    renderUser = ({username, password}) => <div className="output">{username}:{password}&ensp;<Button size='sm' variant="outline-danger" onClick={() => this.delUser(username,password)} >Remove Account</Button></div>

    render(){
        const {users, user} = this.state;
        return(
            <div>
                <Navbar />
                <br/><br/>
                <div className="UserList">
                    {users.map(this.renderUser)}
                    <div>
                        <input 
                            value = {user.username} 
                            onChange={e => this.setState({user: {...user, username: e.target.value}})} />
                        <input 
                            value = {user.password} 
                            onChange={e => this.setState({user: {...user, password: e.target.value}})} />
                        <button onClick={this.addUser}>Add User</button>
                    </div>
                </div>
            </div>
        );
    }
}