import React, { Component } from 'react';
import './history_table.css';
import Table from 'react-bootstrap/Table'

export default class HistoryTable extends Component {
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

    renderUser = ({ RequestID, GallonsRequested, PricePerGallon, TotalPrice, DeliveryAddress, DeliveryCity, DeliveryState, DeliveryZip, DeliveryDate, DateOfRequest }) =>
        <tr key={DateOfRequest}>
            <td>{RequestID}</td>
            <td>{(DateOfRequest.split('.000Z')[0]).replace("T", " @ ")}</td>
            <td>{GallonsRequested}</td>
            <td>{DeliveryAddress}, {DeliveryCity}, {DeliveryState} {DeliveryZip}</td>
            <td>{DeliveryDate}</td>
            <td>${PricePerGallon.toFixed(2)}</td>
            <td>${TotalPrice.toFixed(2)}</td>
        </tr>

    render() {
        return (
            <div className="table-container">
                <Table striped condensed="true" bordered hover variant="light" size="sm" className="scroll">
                    <thead>
                        <tr className="table-header-row">
                            <th>Order ID</th>
                            <th>Order Date</th>
                            <th>Gallons Requested</th>
                            <th>Delivery Address</th>
                            <th>Delivery Date</th>
                            <th>Price Per Gallon</th>
                            <th>Total Amount Due</th>
                        </tr>
                    </thead>
                    <tbody className="react-bootstrap-table-body">
                        {this.state.Requests.map(this.renderUser)}
                    </tbody>
                </Table>
            </div>
        );
    }
}