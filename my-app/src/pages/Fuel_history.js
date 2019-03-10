import React, { Component } from 'react';
import HistoryTable from './components/history_table';
import Navbar from './components/nav_bar.js';
import './css/Fuel_history.css';



export default class Fuel_history extends Component {
    render() {
        return (
            <div className="history-parent">
                <div className="navbar"><Navbar /></div>
                <div className="table-header"><p><h2>Fuel Quote History</h2></p></div>
                <HistoryTable />
            </div>
        );
    }
}
