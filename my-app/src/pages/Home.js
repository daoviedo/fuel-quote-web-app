import React, { Component } from "react";
import Navbar from './components/nav_bar';
import Home_Carousel from './components/home_carousel';
import './css/Home.css';

export default class Home extends Component {
    render() {
        return (
            <div>
                <div>
                    <Navbar />
                </div>
                <div className='carousel'>
                    <Home_Carousel />
                </div>
            </div>
        );
    }
}