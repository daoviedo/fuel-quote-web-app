import React, { Component } from "react";
import Navbar from './components/nav_bar';
import HomeCarousel from './components/home_carousel';
import NewsCards from './components/news_cards';
import BottomBar from "./components/BottomBar";

import './css/Home.css';



export default class Home extends Component {
    render() {
        console.log(document.cookie);
        return (
            <div>
                <div>
                    <Navbar />
                </div>
                <div className='carousel'>
                    <HomeCarousel />
                </div>
                <div className="myTest"><h1>Oil News</h1></div>
                <div style={{ backgroundColor: "#F5F5F5" }}><NewsCards /></div>
                <BottomBar />
            </div>
        );
    }
}