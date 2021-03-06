import React, { Component } from "react";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import NavBar from './components/nav_bar';
import Button from "@material-ui/core/Button";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';

const theme1 = createMuiTheme({
    palette: {
      primary: {main: teal[600]},
    },
});

const options = [
    'AL',
    'AK',
    'AZ',
    'AR',
    'CA',
    'CO',
    'CT',
    'DE',
    'DC',
    'FL',
    'GA',
    'HI',
    'ID',
    'IL',
    'IN',
    'IA',
    'KS',
    'KY',
    'LA',
    'ME',
    'MD',
    'MA',
    'MI',
    'MN',
    'MS',
    'MO',
    'MT',
    'NE',
    'NV',
    'NH',
    'NJ',
    'NM',
    'NY',
    'NC',
    'ND',
    'OH',
    'OK',
    'OR',
    'PA',
    'RI',
    'SC',
    'SD',
    'TN',
    'TX',
    'UT',
    'VT',
    'VA',
    'WA',
    'WV',
    'WI',
    'WY'
  ];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      },
    },
};

const styles = theme => ({
    
    layout: {
      width: 'auto',
      marginLeft: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit * 2,
      marginTop: 100,
      [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 3,
      padding: theme.spacing.unit * 2,
      [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
        marginTop: theme.spacing.unit * 6,
        marginBottom: theme.spacing.unit * 6,
        padding: theme.spacing.unit * 3,
      },
    },
    grow: {
      flexGrow: 1,
    },
    bar: {
      backgroundColor: "#00897b"
    },
  
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing.unit * 3,
      marginLeft: theme.spacing.unit,
      textTransform: 'none',
      outline: 0,
    },
  });



class Acc_mng extends Component{
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      address1: "",
      address2: "",
      city: "",
      dropSelection: "",
      zip:"",
      needsUpdate: false,
  }
  }
    

    componentDidMount(){
        this.verifyData();
    }

    handleChange = event => {
      if(event.target.name === "firstName" || event.target.name === "lastName"){
        var pattern = new RegExp(/[-~`!@#$% _^&*()+=[\];,/{}|\\":0-9<>?]/);
        if (pattern.test(event.target.value)) {
          alert("Please only use letters or '");
        }
        else{
          this.setState({[event.target.name]: event.target.value, needsUpdate: true});
        }
      }
      else{
        this.setState({[event.target.name]: event.target.value, needsUpdate: true});
      }
    }

    verifyData(){
      fetch(`https://api.fuelrequest.ga/users/data`,{
          method: "GET",
          headers: {
            "Authorization": "Bearer "+ document.cookie.split('=')[1]
          }
      })
      .then(res => res.json())
      .then(res => this.setState({firstName: res.data[0].firstname, lastName: res.data[0].lastname, address1: res.data[0].ad1, address2: res.data[0].ad2, city: res.data[0].city, dropSelection: res.data[0].st, zip: res.data[0].zip, needsUpdate: false}))
      .catch(err => console.log(err))
    }

    patchProfile(){
      fetch(`https://api.fuelrequest.ga/users/update`,{
          method: "PATCH",
          headers: {
            "Authorization": "Bearer "+ document.cookie.split('=')[1],
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            firstname: this.state.firstName,
            lastname: this.state.lastName,
            address1: this.state.address1,
            address2: this.state.address2,
            city: this.state.city,
            st: this.state.dropSelection,
            zip: this.state.zip
          }),
      })
      .then(()=>this.verifyData())
      .catch(err => console.log(err))
    }
    
    render(){
        const { classes } = this.props;
        return(
            
            <React.Fragment>
                <NavBar/>
                <MuiThemeProvider theme={theme1}>
                <CssBaseline/>
                <main className={classes.layout}>
                <Paper className={classes.paper}>
              <Typography variant="h6" gutterBottom>
                Account Details
              </Typography>
              <Grid container spacing={24} style={{marginTop: 20, marginBottom: 20}}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    value={this.state.firstName}
                    onChange={this.handleChange}
                    id="firstName"
                    name="firstName"
                    label="First name"
                    fullWidth
                    autoComplete="fname"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    value={this.state.lastName}
                    onChange={this.handleChange}
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    fullWidth
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    value={this.state.address1}
                    onChange={this.handleChange}
                    id="address1"
                    name="address1"
                    label="Address line 1"
                    fullWidth
                    autoComplete="billing address-line1"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    value={this.state.address2}
                    onChange={this.handleChange}
                    id="address2"
                    name="address2"
                    label="Address line 2"
                    fullWidth
                    autoComplete="billing address-line2"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    value={this.state.city}
                    onChange={this.handleChange}
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="billing address-level2"
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                <FormControl>
                    <InputLabel required>State</InputLabel>
                    <Select
                        style={{minWidth: 120}}
                        value={this.state.dropSelection}
                        onChange={this.handleChange}
                        MenuProps={MenuProps}
                        inputProps={{
                        name: 'dropSelection',
                        }}
                    >
                        <MenuItem value={this.state.dropSelection}>
                        <em>None</em>
                        </MenuItem >
                        {options.map(opp => (
                            <MenuItem value={opp} key={opp}>{opp}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    value={this.state.zip}
                    onChange={this.handleChange}
                    id="zip"
                    name="zip"
                    label="Zip / Postal code"
                    fullWidth
                    autoComplete="billing postal-code"
                  />
                </Grid>
              </Grid>
              <div className={classes.buttons}>
                <Button variant="contained"
                      color="primary"
                      disabled={!this.state.needsUpdate}
                      onClick={()=> this.patchProfile()}
                      className={classes.button}>Update Profile</Button>
              </div>
              </Paper>
              </main>
              </MuiThemeProvider>
            </React.Fragment>
        );
    }
}

Acc_mng.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Acc_mng);