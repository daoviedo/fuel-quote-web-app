import React, { Component } from 'react';
import HistoryTable from './components/history_table';
import Navbar from './components/nav_bar.js';
import './css/Fuel_history.css';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';

const data = [
    { name: '01/01/16', Cost: 7200, Barrels_ordered: 30 },
    { name: '01/02/16', Cost: 8980, Barrels_ordered: 34 },
    { name: '01/03/16', Cost: 5000, Barrels_ordered: 234 },
    { name: '01/04/16', Cost: 4780, Barrels_ordered: 43 },
    { name: '01/05/16', Cost: 5890, Barrels_ordered: 64 },
    { name: '01/06/16', Cost: 4390, Barrels_ordered: 35 },
    { name: '01/07/16', Cost: 4490, Barrels_ordered: 54 },
];

export default class Fuel_history extends Component {
    render() {
        return (
            <div className="history-parent">
                <div className="navbar"><Navbar /></div>
                <div className="table-header"><p><h2>Fuel Quote History</h2></p></div>
                <div className="graph">
                    <ResponsiveContainer width="99%" height={350}>
                        <LineChart data={data}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid vertical={false} strokeDasharray="3 3" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Cost" stroke="#82ca9d" />
                            <Line type="monotone" dataKey="Barrels_ordered" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <HistoryTable />
            </div>
        );
    }
}
