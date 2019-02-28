import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

export default class LoginDetailsForm extends Component{
    handleLAN = (event) =>{
        this.setState({firstName: event.target.value});
        this.props.onSelLan(event.target.name,event.target.value);
    }
    render(){
        return(
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Username/Password
                </Typography>
                    <TextField
                        required
                        id="username"
                        name="username"
                        label="Username"
                        value={this.props.val.username}
                        onChange={this.handleLAN}
                        style={{width: "35%",paddingBottom:"14px"}}
                        margin="dense"
                    />
                    <br/>
                    <TextField
                        required
                        id="password"
                        name="password"
                        value={this.props.val.password}
                        onChange={this.handleLAN}
                        label="Password"
                        style={{width: "35%",paddingBottom:"30px"}}
                        type="password"
                        margin="dense"
                    />
            </React.Fragment>
        );
    }
}