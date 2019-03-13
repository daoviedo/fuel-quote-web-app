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
        this.verifyData();
    }
    state = {
        username: "",
        Requests: [],
    }

    verifyData() {
        fetch(`http://138.197.221.30:4000/verify`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + document.cookie.split('=')[1]
            }
        })
            .then(res => res.json())
            .then(result => { this.setState({ username: result.userdata.username }); this.getDataFromHistory() })
            .catch(err => console.log(err))
    }


    getDataFromHistory = () => {
        fetch(`http://138.197.221.30:4000/users/history?username=${this.state.username}`)
            .then(Response => Response.json())
            .then(Response => this.setState({ Requests: Response.data }))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="history-parent">
                <div className="graph">
                    <ResponsiveContainer width="99%" height={350}>
                        <LineChart data={this.state.Requests}>
                            <XAxis dataKey="DeliveryDate" />
                            <YAxis />
                            <CartesianGrid vertical={false} strokeDasharray="3 3" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="PricePerGallon" stroke="#00897b" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }
}