import React, { Component } from 'react';
import './history_table.css';
import Table from 'react-bootstrap/Table'

export default class HistoryTable extends Component {
    componentDidMount(){
        this.getDataFromHistory();
        this.getDataFromUser();
    }
    state = {
        username:localStorage.getItem("username"),
        Requests: [],
        Ad1: "",
    }
    getDataFromHistory = () =>{
        fetch(`http://localhost:4000/users/history?username=${this.state.username}`)
        .then(Response => Response.json())
        .then(Response => this.setState({Requests: Response.data}))
        .catch(err => console.log(err))
    }
    getDataFromUser = () =>{
        fetch(`http://localhost:4000/users/fuelrequestinfo?username=${this.state.username}`)
        .then(Response => Response.json())
        .then(Response => this.setState({Ad1: Response.data[0].DeliveryAddress}))
        .catch(err => console.log(err))
    }
    
    renderUser = ({GallonsRequested, PricePerGallon, TotalPrice, DeliveryAddress, DeliveryCity, DeliveryState, DeliveryZip, DeliveryDate, DateOfRequest}) =>
    <tr> 
        <td>{GallonsRequested}</td>
        <td>{PricePerGallon}</td>
        <td>{TotalPrice}</td> 
        <td>{DeliveryAddress}, {DeliveryCity}, {DeliveryState} {DeliveryZip}</td> 
        <td>{DateOfRequest}</td> 
        <td>{DeliveryDate}</td> 
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
                    <tbody className="react-bootstrap-table-body">
                        {this.state.Ad1}
                    </tbody>
                    <tbody className="react-bootstrap-table-body">
                        <tr>

                            <td></td>
                            <td>1235</td>
                            <td>2152 Calhoun Rd</td>
                            <td>07/21/2018</td>
                            <td>$63/barrel</td>
                            <td>$21042.00</td>
                        </tr>
                        <tr>
                            <td>07/18/2018</td>
                            <td>1235</td>
                            <td>2152 Calhoun Rd</td>
                            <td>07/21/2018</td>
                            <td>$63/barrel</td>
                            <td>$21042.00</td>
                        </tr>
                        <tr>
                            <td>07/18/2018</td>
                            <td>1235</td>
                            <td>2152 Calhoun Rd</td>
                            <td>07/21/2018</td>
                            <td>$63/barrel</td>
                            <td>$21042.00</td>
                        </tr>
                        <tr>
                            <td>07/18/2018</td>
                            <td>1235</td>
                            <td>2152 Calhoun Rd</td>
                            <td>07/21/2018</td>
                            <td>$63/barrel</td>
                            <td>$21042.00</td>
                        </tr>
                        <tr>
                            <td>07/18/2018</td>
                            <td>1235</td>
                            <td>2152 Calhoun Rd</td>
                            <td>07/21/2018</td>
                            <td>$63/barrel</td>
                            <td>$21042.00</td>
                        </tr>
                        <tr>
                            <td>07/18/2018</td>
                            <td>1235</td>
                            <td>2152 Calhoun Rd</td>
                            <td>07/21/2018</td>
                            <td>$63/barrel</td>
                            <td>$21042.00</td>
                        </tr>
                        <tr>
                            <td>07/18/2018</td>
                            <td>1235</td>
                            <td>2152 Calhoun Rd</td>
                            <td>07/21/2018</td>
                            <td>$63/barrel</td>
                            <td>$21042.00</td>
                        </tr>
                        <tr>
                            <td>07/18/2018</td>
                            <td>1235</td>
                            <td>2152 Calhoun Rd</td>
                            <td>07/21/2018</td>
                            <td>$63/barrel</td>
                            <td>$21042.00</td>
                        </tr>
                        <tr>
                            <td>07/18/2018</td>
                            <td>1235</td>
                            <td>2152 Calhoun Rd</td>
                            <td>07/21/2018</td>
                            <td>$63/barrel</td>
                            <td>$21042.00</td>
                        </tr>
                        <tr>
                            <td>07/18/2018</td>
                            <td>1235</td>
                            <td>2152 Calhoun Rd</td>
                            <td>07/21/2018</td>
                            <td>$63/barrel</td>
                            <td>$21042.00</td>
                        </tr>
                        <tr>
                            <td>07/18/2018</td>
                            <td>1235</td>
                            <td>2152 Calhoun Rd</td>
                            <td>07/21/2018</td>
                            <td>$63/barrel</td>
                            <td>$21042.00</td>
                        </tr>
                        <tr>
                            <td>07/18/2018</td>
                            <td>1235</td>
                            <td>2152 Calhoun Rd</td>
                            <td>07/21/2018</td>
                            <td>$63/barrel</td>
                            <td>$21042.00</td>
                        </tr>
                        <tr>
                            <td>07/18/2018</td>
                            <td>1235</td>
                            <td>2152 Calhoun Rd</td>
                            <td>07/21/2018</td>
                            <td>$63/barrel</td>
                            <td>$21042.00</td>
                        </tr>
                        <tr>
                            <td>07/18/2018</td>
                            <td>1235</td>
                            <td>2152 Calhoun Rd</td>
                            <td>07/21/2018</td>
                            <td>$63/barrel</td>
                            <td>$21042.00</td>
                        </tr>
                        <tr>
                            <td>07/18/2018</td>
                            <td>1235</td>
                            <td>2152 Calhoun Rd</td>
                            <td>07/21/2018</td>
                            <td>$63/barrel</td>
                            <td>$21042.00</td>
                        </tr>
                        <tr>
                            <td>07/18/2018</td>
                            <td>1235</td>
                            <td>2152 Calhoun Rd</td>
                            <td>07/21/2018</td>
                            <td>$63/barrel</td>
                            <td>$21042.00</td>
                        </tr>
                        <tr>
                            <td>07/18/2018</td>
                            <td>1235</td>
                            <td>2152 Calhoun Rd</td>
                            <td>07/21/2018</td>
                            <td>$63/barrel</td>
                            <td>$21042.00</td>
                        </tr>
                        <tr>
                            <td>07/18/2018</td>
                            <td>1235</td>
                            <td>2152 Calhoun Rd</td>
                            <td>07/21/2018</td>
                            <td>$63/barrel</td>
                            <td>$21042.00</td>
                        </tr>
                        <tr>
                            <td>07/18/2018</td>
                            <td>1235</td>
                            <td>2152 Calhoun Rd</td>
                            <td>07/21/2018</td>
                            <td>$63/barrel</td>
                            <td>$21042.00</td>
                        </tr>
                        <tr>
                            <td>07/18/2018</td>
                            <td>1235</td>
                            <td>2152 Calhoun Rd</td>
                            <td>07/21/2018</td>
                            <td>$63/barrel</td>
                            <td>$21042.00</td>
                        </tr>
                        <tr>
                            <td>07/18/2018</td>
                            <td>1235</td>
                            <td>2152 Calhoun Rd</td>
                            <td>07/21/2018</td>
                            <td>$63/barrel</td>
                            <td>$21042.00</td>
                        </tr>
                        <tr>
                            <td>07/18/2018</td>
                            <td>1235</td>
                            <td>2152 Calhoun Rd</td>
                            <td>07/21/2018</td>
                            <td>$63/barrel</td>
                            <td>$21042.00</td>
                        </tr>
                        <tr>
                            <td>07/18/2018</td>
                            <td>1235</td>
                            <td>2152 Calhoun Rd</td>
                            <td>07/21/2018</td>
                            <td>$63/barrel</td>
                            <td>$21042.00</td>
                        </tr>
                        <tr>
                            <td>07/18/2018</td>
                            <td>1235</td>
                            <td>2152 Calhoun Rd</td>
                            <td>07/21/2018</td>
                            <td>$63/barrel</td>
                            <td>$21042.00</td>
                        </tr>
                        <tr>
                            <td>07/18/2018</td>
                            <td>1235</td>
                            <td>2152 Calhoun Rd</td>
                            <td>07/21/2018</td>
                            <td>$63/barrel</td>
                            <td>$21042.00</td>
                        </tr>
                        <tr>
                            <td>07/18/2018</td>
                            <td>1235</td>
                            <td>2152 Calhoun Rd</td>
                            <td>07/21/2018</td>
                            <td>$63/barrel</td>
                            <td>$21042.00</td>
                        </tr>
                        <tr>
                            <td>07/18/2018</td>
                            <td>1235</td>
                            <td>2152 Calhoun Rd</td>
                            <td>07/21/2018</td>
                            <td>$63/barrel</td>
                            <td>$21042.00</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}