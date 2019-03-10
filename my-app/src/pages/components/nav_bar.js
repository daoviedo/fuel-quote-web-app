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
import HomeLogo from '@material-ui/icons/Home';
import ReqLogo from '@material-ui/icons/NoteAdd';

import { Link } from 'react-router-dom';


import { Drawer, List, ListItem, ListItemText, Divider, } from "@material-ui/core";

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

const styles = _ => ({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    bar: {
        backgroundColor: "#00897b",
        minHeight: '40px',
        maxHeight: '56px',
        height: '100%',
    },
    tool: {
        minHeight: '100%'
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
            loggedInn: false,
            user: {
                username: "",
                priv: ""
            },
            openUserMenu: false
        };
    }

    componentDidMount(){
        this.verifyData();
    }

    logOff = _ => {
        document.cookie = "token=" + null;
        this.setState({ loggedInn: false, user: { username: "", priv: "" } });
        window.location.reload();
    }

    verifyData(){
        fetch(`http://138.197.221.30:4000/test1`,{
            method: "GET",
            headers: {
                "Authorization": "Bearer "+ document.cookie.split('=')[1]
            }
        })
        .then(res => res.json())
        .then(result => {this.setState({loggedInn: result.authentication, user: {username: result.userdata.username, priv: result.userdata.privelege}})})
        .catch(err => console.log(err))
    }

    render() {
        const { classes } = this.props;
        const finalLogged = this.state.loggedInn;
        const privel = (this.state.user.priv === "Admin");
        
        return (
            <div >
                <AppBar1 position="fixed" classes={{ root: classes.bar }}>
                    <Toolbar classes={{ root: classes.tool }}>
                        <Logo style={{ fontSize: "200%", marginRight: 4, }} />
                        <Typography variant="h5" align="left" color="inherit" className={classes.grow}>Devry Energy</Typography>
                        {finalLogged ?
                            (<div>
                                <Drawer anchor="right" open={this.state.openUserMenu} onClose={() => this.setState({ openUserMenu: false })}>
                                    <div onClick={() => this.setState({ openUserMenu: false })}>
                                        <List>
                                            <Link to="/" style={{ textDecoration: 'none' }}>
                                                <ListItem button>
                                                    <HomeLogo style={{ color: "#00897b" }} />
                                                    <ListItemText primary='Home' />
                                                </ListItem>
                                            </Link>
                                            <Link to="/req_fuel_quote" style={{ textDecoration: 'none' }}>
                                                <ListItem button>
                                                    <ReqLogo style={{ color: "#00897b" }} />
                                                    <ListItemText primary='Request Fuel' />
                                                </ListItem>
                                            </Link>
                                        </List>
                                        <Divider />
                                        <List>
                                            <Link to="/manage_account" style={{ textDecoration: 'none' }}>
                                                <ListItem button>
                                                    <Settings style={{ color: "#00897b" }} />
                                                    <ListItemText primary='Account Settings' />
                                                </ListItem>
                                            </Link>
                                            <Link to="/fuel_history" style={{ textDecoration: 'none' }}>
                                                <ListItem button>
                                                    <History style={{ color: "#00897b" }} />
                                                    <ListItemText primary='Fuel Quote History' />
                                                </ListItem>
                                            </Link>
                                            {privel ? (<Link to="/userlist" style={{ textDecoration: 'none' }}>
                                                <ListItem button>
                                                    <AdminLogo style={{ color: "#00897b" }} />
                                                    <ListItemText primary='Admin' />
                                                </ListItem>
                                            </Link>) : <div />}
                                        </List>
                                        <Divider />
                                        <List>
                                            <Link to="/" style={{ textDecoration: 'none' }}>
                                                <ListItem button onClick={this.logOff.bind(this)}>
                                                    <Exit style={{ color: "#00897b" }} />
                                                    <ListItemText primary='Log out' />
                                                </ListItem>
                                            </Link>
                                        </List>
                                    </div>
                                </Drawer>
                                <Button color="inherit" style={{ textTransform: 'none', outline: 0, fontSize: "90%" }} onClick={() => this.setState({ openUserMenu: true })}><UserLogo style={{ marginRight: 3, fontSize: "180%" }} />{this.state.user.username}</Button></div>) :
                            (<Button color="inherit" style={{ outline: 0 }} href="/login">Login</Button>)}

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
