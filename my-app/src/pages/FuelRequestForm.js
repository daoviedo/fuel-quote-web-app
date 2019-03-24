import React,{Component} from 'react';
import './css/FuelRequestForm.css'
import Button from '@material-ui/core/Button';
import "react-datepicker/dist/react-datepicker.css";
import Navbar from './components/nav_bar';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { InputAdornment, TextField} from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

const TealTheme = createMuiTheme({
    palette: {
      primary: {main: teal[600]},
    },
    overrides: {
        MuiPickersToolbar: {
          toolbar: {
            backgroundColor: teal[600],
          },
        },
        MuiPickersDay: {
          day: {
            color: teal[600],
          },
          isSelected: {
            backgroundColor: teal["600"],
          },
          current: {
            color: teal["600"],
          },
        },
        MuiPickersModal: {
          dialogAction: {
            color: teal["600"],
          },
        },
      },
  });

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        align: "center",
        margin: "auto",
        width: "60%",
        marginTop: "10%",
    }, 
    OrderHeader: {
        margin: "auto",
        marginTop: "5%",
        width:"100%",
    },
    margin: {
        margin: theme.spacing.unit,
    },
    AddMargin: {
        margin: theme.spacing.unit,
        width:"31.9%",
        align: "center"
    },
    PriceMargin: {
        margin: theme.spacing.unit,
        marginTop: theme.spacing.unit*4,
        width:"48%",
    },
    OrderIDPageButton: {
        margin: theme.spacing.unit,
        //marginTop: ,
        width:"45%",
    },
    grid: {
        width: '60%',
    },
    button: {
        margin: theme.spacing.unit*4,
    },
      
    
});

class FuelRequestForm extends Component{

    constructor(props){
        super(props)
        this.state = {
            GallonsRequested: "",
            DeliveryAddress1: "",
            DeliveryAddress2: "",
            DeliveryCity: "",
            DeliveryState: "",
            DeliveryZip: "",
            DeliveryDate: null,
            SuggestedPrice: 10,
            OrderID: Math.floor(Math.random() * 1000000),
            step: 0,
        };
        this.dateChanged = this.dateChanged.bind(this);

      }
    componentDidMount(){
        this.pullData();
    }

    dateChanged = d => {
        this.setState({
            DeliveryDate: d
        })
    };

    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        });
    };

    testInput (){
        return (this.state.GallonsRequested === "" && this.state.DeliveryDate === null);
    }
    pullData() {
        fetch(`http://138.197.221.30:4000/users/fuelrequestinfo`,{
            method: "GET",
            headers: {
                "Authorization": "Bearer "+ document.cookie.split('=')[1]
            }
        })
        .then(res => res.json())
        .then(Response => this.setState({DeliveryAddress1: Response.data[0].ad1, DeliveryAddress2:Response.data[0].ad2,
            DeliveryCity: Response.data[0].city, DeliveryState: Response.data[0].st, DeliveryZip: Response.data[0].zip}))
        .catch(err => console.log(err))
    }

    createNewRequest() {
        fetch(`http://138.197.221.30:4000/users/addRequest`,{
            method: "POST",
            headers: {
                "Authorization": "Bearer "+ document.cookie.split('=')[1],
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                GallonsRequested: this.state.GallonsRequested,
                PricePerGallon: this.state.SuggestedPrice,
                DeliveryDate: this.state.DeliveryDate,
                ad1: this.state.DeliveryAddress1,
                city: this.state.DeliveryCity,
                st: this.state.DeliveryState,
                zip: this.state.DeliveryZip,
                OrderID: this.state.OrderID
            }),
        })
        .then(this.setState(state => ({
            step: state.step + 1,
        })))
    }

    

    redirectToHome = (num) =>{
        if(num===0){
            window.location.replace('/fuel_history')
        }
        else{
            window.location.replace('/')
        }
        
      }

    render() {
        const {classes}=this.props;
        return (
            
            <div> 
                <Navbar />
                    {this.state.step === 0 ? (
                        <Paper className={classes.root} elevation={20}>
                            <FormControl className={classes.PriceMargin}>
                                <InputLabel>Amount of Fuel desired</InputLabel>
                                <Input
                                name="GallonsRequested"
                                value={this.state.GallonsRequested}
                                onChange={this.handleChange}
                                type="number"
                                endAdornment={<InputAdornment position="end">Gallons</InputAdornment>}
                                />
                            </FormControl>
                            <FormControl className={classes.PriceMargin}>
                                <MuiThemeProvider theme={TealTheme}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils} theme={TealTheme}>
                                        
                                        <DatePicker
                                            minDate={new Date()}
                                            label="Date picker"
                                            value={this.state.DeliveryDate}
                                            onChange={this.dateChanged}
                                        />

                                    </MuiPickersUtilsProvider>
                                </MuiThemeProvider>
                            </FormControl>
                            <TextField
                                fullWidth
                                label="Address 1"
                                name= "DeliveryAddress1"
                                disabled
                                value={this.state.DeliveryAddress1}
                                className={classes.margin}
                            />
                            <TextField
                                fullWidth
                                label="Address 2"
                                name= "DeliveryAddress2"
                                disabled
                                value={this.state.DeliveryAddress2}
                                className={classes.margin}
                            />
                            <TextField
                                label="City"
                                name= "DeliveryCity"
                                disabled
                                value={this.state.DeliveryCity}
                                className={classes.AddMargin}
                            />
                            <TextField
                                label="State"
                                name= "DeliveryState"
                                disabled
                                value={this.state.DeliveryState}
                                className={classes.AddMargin}
                            />
                            <TextField
                                label="Zip"
                                name= "DeliveryZip"
                                disabled
                                value={this.state.DeliveryZip}
                                className={classes.AddMargin}
                            />
                            <TextField
                                label="Price Per Gallon"
                                name= "SuggestedPrice"
                                disabled
                                value={this.state.SuggestedPrice}
                                className={classes.PriceMargin}
                                InputProps={{startAdornment:<InputAdornment position="start">$</InputAdornment>}}
                            />
                            <TextField
                                label="Total Price"
                                name= "TotalAmount"
                                disabled
                                value={this.state.GallonsRequested*this.state.SuggestedPrice}
                                className={classes.PriceMargin}
                                InputProps={{startAdornment:<InputAdornment position="start">$</InputAdornment>}}
                            />     
                            <FormControl width="auto" fullWidth className={classes.button}>
                                <MuiThemeProvider theme={TealTheme}>
                                    <Button color="primary"  variant="contained" disable={!this.testInput()} onClick={()=>this.createNewRequest()}>
                                        Submit Fuel Request
                                    </Button>      
                                </MuiThemeProvider>          
                            </FormControl>
                        </Paper>
                    ):(
                    <Paper className={classes.root} elevation={20}>
                        <React.Fragment >
                            <h1 className={classes.OrderHeader} >
                            Thank you for your request. Your OrderID is #{this.state.OrderID}
                            </h1>
                            <FormControl width="auto" align="center" className={classes.PriceMargin}>
                                <MuiThemeProvider theme={TealTheme}>
                                    <Button color="primary"  variant="contained" className={classes.OrderIDPageButton} onClick={()=>this.redirectToHome(1)}>
                                        Return to Home Page
                                    </Button>     
                                </MuiThemeProvider>          
                            </FormControl> 
                            <FormControl width="auto" align="center"  className={classes.PriceMargin}>
                                <MuiThemeProvider theme={TealTheme}>
                                    <Button color="primary"  variant="contained" className={classes.OrderIDPageButton} onClick={()=>this.redirectToHome(0)} >
                                        See all Fuel Orders
                                    </Button>     
                                </MuiThemeProvider>          
                            </FormControl> 
                            
                        </React.Fragment>
                    </Paper>
                    )}
                                        
                
            </div>
        )
        
    }
}

FuelRequestForm.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(FuelRequestForm);


