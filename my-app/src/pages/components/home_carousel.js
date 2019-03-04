import React, { Component } from "react";
import { Carousel } from 'react-bootstrap';
import image1 from './images/image1.jpg';
import image2 from './images/image2.jpg';
import image3 from './images/image3.jpg';


export default class Home extends Component {
    render() {
        return (
            <div>
                <Carousel style={{marginTop: 60}}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            width="400"
                            height="600"
                            src={image1}
                            fluid="true"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>Devry Energy is the lead fuel distributor in Texas</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={image2}
                            fluid="true"
                            width="800"
                            height="600"
                            alt="second slide"
                        />

                        <Carousel.Caption>
                            <h3>Our algorithms provide better rates than our competitors</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item >
                        <img
                            className="d-block w-100"
                            src={image3}
                            fluid="true"
                            width="1500"
                            height="600"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3>Create an account and get a fuel quote today!</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        );
    }
}