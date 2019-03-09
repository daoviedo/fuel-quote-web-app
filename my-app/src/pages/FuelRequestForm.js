import React from 'react';
import './css/FuelRequestForm.css'
import { Button, Form, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Navbar from './components/nav_bar';
import withStyles from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        align: "center",
    },
    layout: {
        width: 'auto',
        marginTop: theme.spacing.unit * 25,
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
        [theme.breakpoints.up(600 + theme.spacing.unit *4)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
})

class FuelRequestForm extends React.Component{

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
        fetch(`http://138.197.221.30:4000/users/fuelrequestinfo?username=${this.state.username}`)
        .then(Response => Response.json())
        .then(Response => this.setState({DeliveryAddress1: Response.data[0].ad1, DeliveryAddress2:Response.data[0].ad2,
            DeliveryCity: Response.data[0].city, DeliveryState: Response.data[0].st, DeliveryZip: Response.data[0].zip}))
        .catch(err => console.log(err))
    }

    
    addRequestToHistory = () => {
        this.state.DeliveryDate = this.state.DeliveryDate.getUTCFullYear() + '-' +
        ('00' + (this.state.DeliveryDate.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + this.state.DeliveryDate.getUTCDate()).slice(-2);
        fetch(`http://138.197.221.30:4000/users/addRequest?username=${this.state.username}&GallonsRequested=${this.state.GallonsRequested}
        &PricePerGallon=${this.state.SuggestedPrice}&DeliveryDate=${this.state.DeliveryDate}&ad1=${this.state.DeliveryAddress1}
        &city=${this.state.DeliveryCity}&st=${this.state.DeliveryState}&zip=${this.state.DeliveryZip}`)
        this.setState({DeliveryDate: new Date()});
    }

    render() {
        const {classes}=this.props;
        return (
            <div className={classes.layout}> 
                <Paper className={classes.root} elevation={1}>
                    <FormControl fullWidth className={classes.margin}>
                        <InputLabel>Amount of Fuel desired</InputLabel>
                        <Input
                        value={this.state.GallonsRequested}
                        onChange={e => this.change(e)}
                        />
                    </FormControl>
                </Paper>
            </div>
        );
        
    }
}

FuelRequestForm.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(FuelRequestForm);


