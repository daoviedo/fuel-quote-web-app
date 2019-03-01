import React, { Component } from 'react';
import HistoryTable from './components/history_table';
import Navbar from './components/nav_bar.js';


export default class Fuel_history extends Component {
    render() {
        return (
            <div className="App">
                <Navbar />
                <p className="Table-header"><h2>Fuel Quote History</h2></p>
                <HistoryTable />
            </div>
        );
    }
}
