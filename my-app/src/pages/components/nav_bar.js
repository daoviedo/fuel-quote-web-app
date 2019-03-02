import React, { Component } from "react";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import './nav_bar.css';

import AppBar1 from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Settings from '@material-ui/icons/Settings';
import History from '@material-ui/icons/History';
import Exit from '@material-ui/icons/ExitToApp'
import Logo from '@material-ui/icons/Camera';
import AdminLogo from '@material-ui/icons/VerifiedUser';
import UserLogo from '@material-ui/icons/AccountCircle';

import {Link} from 'react-router-dom';


import { Drawer, List, ListItem, ListItemText, Divider,} from "@material-ui/core";

const styles = _ =>({
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    bar: {
        backgroundColor: "#00897b"
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
});

class AppBar extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            loggedInn: (localStorage.getItem("authen")==="true"),
            user: {
                username: localStorage.getItem("username"),
                password: "ENCRYPTED"
            },
            openUserMenu: false
        };
    }

    logOff = _ => {
        localStorage.clear();
        this.setState({loggedInn: false, user: {username: "", password: ""}});
    }
    
    render() {
        const { classes } = this.props;
        const finalLogged = this.state.loggedInn;
        return (
            <div className={classes.root}>
                <AppBar1 position="static" className={classes.bar}>
                    <Toolbar>
                        <Logo style={{fontSize:"250%", marginRight:4}}/>
                        <Typography variant="h4" style={{marginBottom:2}} align="left" color="inherit" className={classes.grow}>Devry Energy</Typography>
                        {finalLogged ? 
                        (<div>
                            <Drawer anchor="right" open={this.state.openUserMenu} onClose={()=>this.setState({openUserMenu: false})}>
                                <div onClick={()=> this.setState({openUserMenu: false})}>
                                    <List>
                                        <Link to="/manage_account" style={{ textDecoration: 'none'}}>
                                        <ListItem button>
                                            <Settings style={{color: "#00897b"}}/>
                                            <ListItemText primary='Account Settings' />
                                        </ListItem>
                                        </Link>
                                        <Link to="/fuel_history" style={{ textDecoration: 'none'}}>
                                        <ListItem button>
                                            <History style={{color: "#00897b"}}/>
                                            <ListItemText primary='Fuel Quote History' />
                                        </ListItem>
                                        </Link>
                                        <Link to="/userlist" style={{ textDecoration: 'none'}}>
                                        <ListItem button>
                                            <AdminLogo style={{color: "#00897b"}}/>
                                            <ListItemText primary='Admin'/>
                                        </ListItem>
                                        </Link>
                                    </List>
                                    <Divider/>
                                    
                                    <List>
                                        <Link to="/" style={{ textDecoration: 'none'}}>
                                        <ListItem button onClick={this.logOff.bind(this)}>
                                            <Exit style={{color: "#00897b"}}/>
                                            <ListItemText primary='Log out' />
                                        </ListItem>
                                        </Link>
                                    </List>
                                </div>
                            </Drawer>
                            <Button color="inherit" style={{textTransform: 'none', outline: 0, fontSize: "90%"}} onClick={()=> this.setState({openUserMenu: true})}><UserLogo style={{marginRight: 3,fontSize: "180%"}}/>{this.state.user.username}</Button></div>) : 
                        (<Button color="inherit" style={{outline: 0}} href="/login">Login</Button>)}
                        
                    </Toolbar>
                </AppBar1>
            </div>
        );
    }
}

AppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(AppBar);
