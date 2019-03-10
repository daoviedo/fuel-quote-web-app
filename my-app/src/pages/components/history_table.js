import React, { Component } from 'react';
import './history_table.css';
import Table from 'react-bootstrap/Table'

export default class HistoryTable extends Component {
    componentDidMount() {
        this.verifyData();
    }
    state = {
        username: "",
        Requests: [],
    }

    verifyData(){
        fetch(`http://138.197.221.30:4000/verify`,{
            method: "GET",
            headers: {
                "Authorization": "Bearer "+ document.cookie.split('=')[1]
            }
        })
        .then(res => res.json())
        .then(result => {this.setState({username: result.userdata.username});this.fetchData().bind(this)})
        .catch(err => console.log(err))
    }


    getDataFromHistory = () => {
        fetch(`http://138.197.221.30:4000/users/history?username=${this.state.username}`)
            .then(Response => Response.json())
            .then(Response => this.setState({ Requests: Response.data }))
            .catch(err => console.log(err))
    }

    renderUser = ({ GallonsRequested, PricePerGallon, TotalPrice, DeliveryAddress, DeliveryCity, DeliveryState, DeliveryZip, DeliveryDate, DateOfRequest }) =>
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
                        <tr className="table-header-row">
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