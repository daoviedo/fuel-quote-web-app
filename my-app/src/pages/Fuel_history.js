import React, { Component } from 'react';
import HistoryTable from './components/history_table';


export default class Fuel_history extends Component {
    render() {
        return (
            <div className="App">
                <p className="Table-header">Fuel Quote History</p>
                <HistoryTable />
            </div>
        );
    }
}
