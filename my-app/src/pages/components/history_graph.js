import { Component } from "react";
import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';

export default class HistoryGraph extends Component {
    componentDidMount() {
        this.fetchFuelHistory();
    }
    state = {
        Requests: [],
    }

    fetchFuelHistory() {
        fetch(`https://api.fuelrequest.ga/fuelhistory`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + document.cookie.split('=')[1]
            }
        })
            .then(res => res.json())
            .then(result => this.setState({ Requests: result.data }))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="history-parent">
                <div className="graph">
                    <ResponsiveContainer width="99%" height={350}>
                        <LineChart data={this.state.Requests}>
                            <XAxis dataKey="RequestID"/>
                            <YAxis type="number" domain={[1.70, 1.80]}/>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="PricePerGallon" stroke="#00897b" activeDot={{ r: 8 }}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
}