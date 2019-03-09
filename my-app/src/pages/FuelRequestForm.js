import React from 'react';
import './css/FuelRequestForm.css'
import { Button, Form, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Navbar from './components/nav_bar';

export default class FuelRequestForm extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            username:localStorage.getItem("username"),
            GallonsRequested: 0,
            DeliveryAddress1: "",
            DeliveryAddress2: "",
            DeliveryCity: "",
            DeliveryState: "",
            DeliveryZip: "",
            DeliveryDate: new Date(),
            SuggestedPrice: 10,
            TotalAmount: 0,
        };
        this.dateChanged = this.dateChanged.bind(this);

      }
    componentDidMount(){
        this.getDataFromUser();
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

    getDataFromUser = () =>{
        fetch(`http://localhost:4000/users/fuelrequestinfo?username=${this.state.username}`)
        .then(Response => Response.json())
        .then(Response => this.setState({DeliveryAddress1: Response.data[0].ad1, DeliveryAddress2:Response.data[0].ad2,
            DeliveryCity: Response.data[0].city, DeliveryState: Response.data[0].st, DeliveryZip: Response.data[0].zip}))
        .catch(err => console.log(err))
    }

    
    addRequestToHistory = () => {
        this.state.DeliveryDate = this.state.DeliveryDate.getUTCFullYear() + '-' +
        ('00' + (this.state.DeliveryDate.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + this.state.DeliveryDate.getUTCDate()).slice(-2);
        fetch(`http://localhost:4000/users/addRequest?username=${this.state.username}&GallonsRequested=${this.state.GallonsRequested}
        &PricePerGallon=${this.state.SuggestedPrice}&DeliveryDate=${this.state.DeliveryDate}&ad1=${this.state.DeliveryAddress1}
        &city=${this.state.DeliveryCity}&st=${this.state.DeliveryState}&zip=${this.state.DeliveryZip}`)
        this.setState({DeliveryDate: new Date()});
    }

    render() {
        const {classes}=this.props;
        return (
            <React.Fragment>
                <main className={classes.layout}>
                </main>
            </React.Fragment>
            // <div className="FuelRequestForm">
            // <div><Navbar /></div>
            //     <header className="FuelRequestForm-header">
            //         <Form>
            //             <Form.Group as={Row} controlId="formGallonsRequested">
            //                 <Form.Label sm={3} >
            //                     Gallons Requested
            //                 </Form.Label>
            //                 <Form.Control 
            //                 name="GallonsRequested"
            //                 value={this.state.GallonsRequested}
            //                 onChange={e => this.change(e)}
            //                 size="xs" 
            //                 type="number"
            //                 />
            //             </Form.Group>

            //             <Form.Group as={Row} controlId="formStreetAddress">
            //                 <Form.Label>Delivery Address</Form.Label>
            //                 <Form.Control  
            //                 value={this.state.DeliveryAddress1}
            //                 disabled />
            //                 <Form.Label>Delivery Address2</Form.Label>
            //                 <Form.Control  
            //                 value={this.state.DeliveryAddress2}
            //                 disabled />
            //                 <Form.Group as={Col} controlId="formAddressCity">
            //                     <Form.Label>City</Form.Label>
            //                     <Form.Control disabled 
            //                     placeholder={this.state.DeliveryCity}/>
            //                 </Form.Group>


            //                 <Form.Group as={Col} controlId="formGridState">
            //                     <Form.Label>State</Form.Label>
            //                     <Form.Control disabled 
            //                     placeholder={this.state.DeliveryState}/>
            //                 </Form.Group>

            //                 <Form.Group as={Col} controlId="formGridZip">
            //                     <Form.Label>Zip</Form.Label>
            //                     <Form.Control disabled 
            //                     placeholder={this.state.DeliveryZip}/>
            //                 </Form.Group>
            //             </Form.Group>

            //             <Form.Group as={Row} controlId="formDeliveryDate">
            //                 <Form.Label> 
            //                     Delivery Date    
            //                 </Form.Label> 
            //             </Form.Group>
            //             <Form.Group as={Row} controlId="formDeliveryDate">
            //                 <DatePicker  
            //                     minDate={new Date()} 
            //                     selected={this.state.DeliveryDate} 
            //                     onChange={this.dateChanged} 
            //                     onSelect={this.handleSelect} 
            //                     value={this.state.DeliveryDate}
            //                 />
            //             </Form.Group>
            //             <Form.Group as={Row}>
            //                 <Form.Group as={Col}>
            //                     <Form.Label>Suggested Price</Form.Label>
            //                     <Form.Control disabled type="number" value={this.state.SuggestedPrice}
            //                     />
            //                 </Form.Group>
            //                 <Form.Group as={Col}>
            //                     <Form.Label>Total Amount</Form.Label>
            //                     <Form.Control disabled type="number" value={this.state.GallonsRequested*this.state.SuggestedPrice}
            //                     />
            //                 </Form.Group>
            //             </Form.Group>
            //             <Button variant="primary" onClick={()=>this.addRequestToHistory()}>
            //                 Submit
            //             </Button>
            //         </Form>
            //     </header>
            // </div>
        )
        
    }
}
