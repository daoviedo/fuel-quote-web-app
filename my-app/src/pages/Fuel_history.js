import React, { Component } from 'react';
import HistoryTable from './components/history_table';
import Navbar from './components/nav_bar.js';
import './css/Fuel_history.css';
import HistoryGraph from './components/history_graph.js'

export default class Fuel_history extends Component {
    render() {
        return (
            <div className="history-parent">
                <div className="navbar"><Navbar /></div>
                <div className="table-header"><h2>Fuel Quote History</h2></div>
                <div className="graph"><HistoryGraph /></div>
                <HistoryTable />
            </div>
        );
    }
}
