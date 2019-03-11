import React, { Component } from "react";
import { Carousel } from 'react-bootstrap';

import './car.css';
import image1 from './images/image3.jpeg';
import image2 from './images/image2.jpeg';
import image3 from './images/image1.jpg';


export default class Home extends Component {
    render() {
        return (
            <div>
                <Carousel style={{marginTop: 50}}>
                    <Carousel.Item>
                        <img
                            className="picture"
                            src={image1}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3>Devry Energy is the lead fuel distributor in Texas</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="picture"
                            src={image2}
                            alt="Second slide"
                        />

                        <Carousel.Caption>
                            <h3>Our algorithms provide better rates than our competitors</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item >
                        <img
                            className="picture"
                            src={image3}
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