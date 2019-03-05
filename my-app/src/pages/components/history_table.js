import React, { Component } from 'react';
import './history_table.css';
import Table from 'react-bootstrap/Table'

export default class HistoryTable extends Component {
    componentDidMount(){
        this.getDataFromHistory();
    }
    state = {
        username:localStorage.getItem("username"),
        Requests: [],
    }
    getDataFromHistory = () =>{
        fetch(`http://localhost:4000/users/history?username=${this.state.username}`)
        .then(Response => Response.json())
        .then(Response => this.setState({Requests: Response.data}))
        .catch(err => console.log(err))
    }
    
    renderUser = ({GallonsRequested, PricePerGallon, TotalPrice, DeliveryAddress, DeliveryCity, DeliveryState, DeliveryZip, DeliveryDate, DateOfRequest}) =>
    <tr> 
        <td>{DateOfRequest}</td>
        <td>{GallonsRequested}</td>
        <td>{DeliveryAddress}, {DeliveryCity}, {DeliveryState} {DeliveryZip}</td>
        <td>{DeliveryDate}</td>
        <td>{PricePerGallon}</td>
        <td>{TotalPrice}</td>
    </tr>

    render() {
        return (
            <div className="table-container">
                <Table striped condensed bordered hover variant="light" size="sm" className="scroll">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Gallons Requested</th>
                            <th>Delivery Address</th>
                            <th>Delivery Date</th>
                            <th>Suggested Price</th>
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