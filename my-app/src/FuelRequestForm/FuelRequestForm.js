import React from 'react';
import './FuelRequestForm.css'
import { Button, Form, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class FuelRequestForm extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            GallonsRequested: '',
            DeliveryAddressStreet: "1234 Main Street",
            DeliveryAddressCity: "Houston",
            DeliveryAddressState: "Tx",
            DeliveryAddressZip:"77577",
            DeliveryDate: new Date(),
            SuggestedPrice: '10',
            TotalAmount: '100',
        };
        this.dateChanged = this.dateChanged.bind(this);

      }

    dateChanged = d => {
        this.setState({
            DeliveryDate: d
        })
    };

    change = e => {
        this.setState({
            [e.target.name] : e.target.value
        });
        
        // this.setState({
        // //      SuggestedPrice : CalculatePrice(this.state.gallons, this.state.location)
        //     TotalAmount: 4*3
            
        //  });
    };

    render() {
        return (
            <div className="FuelRequestForm">
                <header className="FuelRequestForm-header">
                    <Form>
                        <Form.Group as={Row} controlId="formGallonsRequested">
                            <Form.Label sm={5} >
                                Gallons Requested
                            </Form.Label>
                            <Form.Control 
                            name="GallonsRequested"
                            value={this.state.GallonsRequested}
                            onChange={e => this.change(e)}
                            size="xs" 
                            type="number"
                            />
                        </Form.Group>

                        <Form.Group as={Row} controlId="formStreetAddress">
                            <Form.Label>Delivery Address</Form.Label>
                            <Form.Control  
                            value={this.state.DeliveryAddressStreet}
                            disabled="true" />
                            <Form.Group as={Col} controlId="formAddressCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control disabled="true" 
                                placeholder={this.state.DeliveryAddressCity}/>
                            </Form.Group>


                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>State</Form.Label>
                                <Form.Control disabled="true" 
                                placeholder={this.state.DeliveryAddressState}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control disabled="true" 
                                placeholder={this.state.DeliveryAddressZip}/>
                            </Form.Group>
                        </Form.Group>

                        <Form.Group as={Row} controlId="formDeliveryDate">
                            <Form.Label> 
                                Delivery Date    
                            </Form.Label> 
                        </Form.Group>
                        <Form.Group as={Row} controlId="formDeliveryDate">
                            <DatePicker  
                                minDate={new Date()} 
                                selected={this.state.DeliveryDate} 
                                onChange={this.dateChanged} 
                                onSelect={this.handleSelect} 
                            />
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Group as={Col}>
                                <Form.Label>Suggested Price</Form.Label>
                                <Form.Control disabled="true" type="number" value={this.state.SuggestedPrice}
                                />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Total Amount</Form.Label>
                                <Form.Control disabled="true" type="number" value={this.state.TotalAmount}
                                />
                            </Form.Group>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </header>
            </div>
        )
    }
}
