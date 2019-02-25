import React, { Component } from "react";
import {Button,Form} from "react-bootstrap";
import "./Register.css";

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

    render(){
        const {users, user} = this.state;

        
        return(
            <div className="Register">
                <Form>
                    <Form.Group controlId="formUser">
                        <Form.Label>Username</Form.Label>
                        <Form.Control value={user.username} onChange={e => this.setState({user: {...user, username: e.target.value}})} placeholder="Desired username" />
                        <Form.Text className="text-muted">
                        We'll check to see if this username is available.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={user.password} onChange={e => this.setState({user: {...user, password: e.target.value}})} placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.addUser} href="/manage_account">
                        Submit
                    </Button>
                    </Form>
            </div>
        );
    }
}