import React, { Component } from "react";
import { Button, Nav,NavDropdown,Navbar,Form,FormControl,Carousel} from 'react-bootstrap';
import image1 from './image1.jpg';
import image2 from './image2.jpg';
import image3 from './image3.png';

export default class Home extends Component{
    render() {
        return(
            <div>
                <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="/login">Link</Nav.Link>
                    </Nav>
                    <NavDropdown title="My Account" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Edit Profile</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Quote History</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Log out</NavDropdown.Item>
                    </NavDropdown>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
                </Navbar>
                <Carousel>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        width="800"
                        height="500"
                        src={image1}
                        fluid
                        alt="First slide"
                        />
                        <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Insert Caption Here</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={image2}
                        fluid
                        width="800"
                        height="500"
                        alt="second slide"
                        />

                        <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Insert Caption Here</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={image3}
                        fluid
                        width="800"
                        height="500"
                        alt="Third slide"
                        />

                        <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Insert Caption Here</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}


        