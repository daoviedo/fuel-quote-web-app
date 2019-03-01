import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LoginDetailsForm from './LoginDetailsForm';
import AccDetailsForm from './AccDetailsForm';
import {Redirect} from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
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
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
    marginLeft: theme.spacing.unit * 10,
    marginRight: theme.spacing.unit * 10,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

const steps = ['Login Info', 'Account Info',];



class Register extends React.Component {
  state = {
    activeStep: 0,
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    dropSelection: "",
    zip:"",
    isAvail: false,
    isComplete: false
  };

  getStepContent(step) {
    switch (step) {
      case 0:
        return <LoginDetailsForm onSelLan={this.handleLan} val={this.state}/>;
      case 1:
        return <AccDetailsForm onSelLan={this.handleLan} val={this.state}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  validateButton(){
    return this.state.username.length > 0 && this.state.password.length > 0 && this.state.isAvail;
  }

  validateComplete(){
    return this.state.username.length > 0 && this.state.password.length > 0 && this.state.firstName.length > 0 && this.state.lastName.length > 0 && this.state.address1.length > 0 && this.state.city.length > 0 && this.state.dropSelection.length > 0 && this.state.zip.length > 0 && this.state.isAvail;
  }

  handleLan = (name,lanV) => {
    this.setState({[name]: lanV});
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  submitUser = () => {
    fetch(`http://localhost:4000/users/adduser?username=${this.state.username}&pass=${this.state.password}&fname=${this.state.firstName}&lname=${this.state.lastName}&ad1=${this.state.address1}&ad2=${this.state.address2}&city=${this.state.city}&st=${this.state.dropSelection}&zip=${this.state.zip}&priv=user`)
        .then(this.handleNext)
        .catch(err => console.log(err))
  }

  redirectUser(){
    setTimeout(() =>{
      this.setState({isComplete: true});
    },5000);
    if(this.state.isComplete){
      return <Redirect to={{pathname: '/login'}}/>;
    }
  }

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;
    
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Devry Energy
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Registration
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for Signing Up.
                  </Typography>
                  <Typography variant="subtitle1">
                    You will be redirected to the login page where you can login with your new account.
                  </Typography>
                  <CircularProgress/>
                  {this.redirectUser()}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {this.getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={this.handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    {activeStep === steps.length - 1 ? (<Button
                      variant="contained"
                      color="primary"
                      disabled={!this.validateComplete()}
                      onClick={this.submitUser}
                      className={classes.button}
                    >Create Account</Button>) : (<Button
                      variant="contained"
                      color="primary"
                      disabled={!this.validateButton()}
                      onClick={this.handleNext}
                      className={classes.button}
                    >Next</Button>)}
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);