import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import Button2 from 'react-bootstrap/Button';

const theme1 = createMuiTheme({
    palette: {
      primary: {main: teal[600]},
    },
  });

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: teal[600]
  },
  form: {
    width: '70%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class Login extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        username: "",
        password: "",
        auth: false,
        submitted: false
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    validateForm() {
      return this.state.username.length > 0 && this.state.password.length > 0;
    }
  
    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    }
  
    loginAuth(){
      fetch(`http://138.197.221.30:4000/login`,{
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              username: this.state.username,
              password: this.state.password
          }),
      })
      .then(res => res.json())
      .then(result => {document.cookie = "token="+result.token;this.setState({auth: result.authentication, submitted: true});})
      .catch(err => {this.setState({submitted: true});console.log(err)})
    }
  
    handleSubmit = event => {
      event.preventDefault();
      this.loginAuth();
    }
    render(){
        const { classes } = this.props;
        const returnAuth = this.state.auth;
        const isSub = this.state.submitted;
        if(returnAuth){
        window.location.replace('/');
        }
        else{
          if(isSub){alert("Invalid Credentials"); this.setState({submitted: false})}
            return (
                <main className={classes.main}>
                <MuiThemeProvider theme={theme1}>
                  <CssBaseline />
                  <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Sign in
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleSubmit}>
                      <FormControl margin="normal" required fullWidth style={{marginTop: '40px'}}>
                        <InputLabel>Username</InputLabel>
                        <Input id="username" autoComplete="username" autoFocus value={this.state.username} onChange={this.handleChange}/>
                      </FormControl>
                      <FormControl margin="normal" required fullWidth>
                        <InputLabel>Password</InputLabel>
                        <Input value={this.state.password} onChange={this.handleChange} type="password" id="password" autoComplete="current-password" style={{marginBottom: '40px'}}/>
                      </FormControl>
                      <Button
                        type="submit"
                        fullWidth
                        disabled={!this.validateForm()}
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                      >
                        Sign in
                      </Button>
                    </form>
                  </Paper>
                  <Typography style={{marginTop: '10px'}}>Don't Have an Account?&ensp;
                <Button
                href="/register"
                variant="outlined"
                color="primary"
                size="small"
                style={{ textTransform: 'none', textDecorationColor: 'none'}}
                >Register</Button></Typography>
                  </MuiThemeProvider>
                </main>
        );
        }
        
    }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);