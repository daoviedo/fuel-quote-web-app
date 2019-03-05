import React, { Component } from "react";
import Navbar from './components/nav_bar';
import Home_Carousel from './components/home_carousel';
import News_Cards from './components/news_cards';

import Grid from '@material-ui/core/Grid';
import './css/Home.css';
import { Paper } from "@material-ui/core";

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
                <div className="myTest"><h1>Oil News</h1></div>
                <div><News_Cards /></div>
            </div>
        );
    }
}