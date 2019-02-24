import React, { Component } from "react";
import {Button,Form} from "react-bootstrap";
import "./Register.css";

export default class Register extends Component{
    render(){
        return(
            <div className="Register">
                <Form>
                    <Form.Group controlId="formUser">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="Desired username" />
                        <Form.Text className="text-muted">
                        We'll check to see if this username is available.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    </Form>
            </div>
        );
    }
}