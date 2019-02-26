import React, { Component } from "react";
import {Button,Form,Col} from "react-bootstrap";
import "./Acc_mng.css";
//checking a change
export default class Acc_mng extends Component{
    render(){
        return(
            <div className="Acc_mng">
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridFirst">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control placeholder="Ex. John" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLast">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control placeholder="Ex. Smith" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group controlId="formGridAddress1">
                        <Form.Label>Address</Form.Label>
                        <Form.Control placeholder="Ex. 1234 Main St" />
                    </Form.Group>

                    <Form.Group controlId="formGridAddress2">
                        <Form.Label>Address 2</Form.Label>
                        <Form.Control placeholder="Apartment, studio, or floor" />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>State</Form.Label>
                        <Form.Control as="select">
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridZip">
                        <Form.Label>Zip</Form.Label>
                        <Form.Control />
                        </Form.Group>
                    </Form.Row>

                    <Button variant="primary" type="submit" href="/">
                        Submit
                    </Button>
                    </Form>
            </div>
        );
    }
}