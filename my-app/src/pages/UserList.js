import React, { Component } from "react";

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

    renderUser = ({username, email, password}) => <div>{username}:{email}:{password}</div>

    render(){
        const {users, user} = this.state;
        return(
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
        );
    }
}