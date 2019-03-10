import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from 'react-bootstrap';
import './css/UserList.css';
import Navbar from './components/nav_bar';

const styles = theme => ({
    root: {
        width: '90%',
        maxHeight: 500,
        marginTop: 100,
        margin: 'auto',
        overflowX: 'auto',
        overflowY: 'auto'
    },
    table: {
        minWidth: 700,
    },
    header: {
        position: 'sticky',
        top: 0,
        backgroundColor: '#00897b',
        color: 'white'
    }
});

class UserList extends Component {

    state = {
        users: []
    }

    componentDidMount() {
        this.getUser();
    }

    getUser = _ => {
        fetch('http://138.197.221.30:4000/users')
            .then(response => response.json())
            .then(response => this.setState({ users: response.data }))
            .catch(err => console.log(err))
    }


    delUser = (username, pass) => {
        fetch(`http://138.197.221.30:4000/users/remove?username=${username}&pass=${pass}`)
            .then(this.getUser)
            .catch(err => console.log(err))
    }

    renderUser = ({ username, password }) => <div className="output">{username}:{password}&ensp;<Button size='sm' variant="outline-danger" onClick={() => this.delUser(username, password)} >Remove Account</Button></div>
    renderUserList = ({ username, password, firstname, lastname, ad1, ad2, city, st, zip, priv, totalRequests }) =>
        <TableRow key={username}>
            <TableCell component="th" scope="row">
                {username}
            </TableCell>
            <TableCell align="right">{firstname}</TableCell>
            <TableCell align="right">{lastname}</TableCell>
            <TableCell align="right">{ad1}</TableCell>
            <TableCell align="right">{ad2}</TableCell>
            <TableCell align="right">{city}</TableCell>
            <TableCell align="right">{st}</TableCell>
            <TableCell align="right">{zip}</TableCell>
            <TableCell align="right">{priv}</TableCell>
            <TableCell align="right">{totalRequests}</TableCell>
            <TableCell align="right"><Button size='sm' variant="outline-danger" onClick={() => this.delUser(username, password)} >Remove Account</Button></TableCell>
        </TableRow>

    render() {
        const { classes } = this.props;
        const { users } = this.state;
        return (
            <React.Fragment>
                <Navbar />
                <Paper className={classes.root}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.header}>Username</TableCell>
                                <TableCell align="right" className={classes.header}>First Name</TableCell>
                                <TableCell align="right" className={classes.header}>Last Name</TableCell>
                                <TableCell align="right" className={classes.header}>Address 1</TableCell>
                                <TableCell align="right" className={classes.header}>Address 2</TableCell>
                                <TableCell align="right" className={classes.header}>City</TableCell>
                                <TableCell align="right" className={classes.header}>State</TableCell>
                                <TableCell align="right" className={classes.header}>Zip</TableCell>
                                <TableCell align="right" className={classes.header}>Priveledge</TableCell>
                                <TableCell align="right" className={classes.header}>Requests Made</TableCell>
                                <TableCell align="right" className={classes.header}>Remove Account</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {users.map(this.renderUserList)}
                        </TableBody>
                    </Table>
                </Paper>
            </React.Fragment>
        );
    }
}

UserList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserList);