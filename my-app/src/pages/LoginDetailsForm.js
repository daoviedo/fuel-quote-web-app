import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

export default class LoginDetailsForm extends Component{
    state = {
        timer: false
    }
    
    handleLAN = (event) =>{
        this.props.onSelLan(event.target.name,event.target.value);
    }

    handleUser = (event) =>{
        this.props.onSelLan("isAvail", false);
        this.props.onSelLan(event.target.name,event.target.value);
    }

    validateBut(){
        return this.props.val.username.length > 0;
    }
    checkUser(){
        fetch(`http://localhost:4000/users/check?username=${this.props.val.username}`)
        .then(response => response.json())
        .then(response => {if(response.data.length===0){this.props.onSelLan("isAvail", true)}else{this.props.onSelLan("isAvail", false)}})
        .catch(err => console.log(err))
    }

    returnOut(){
        if(this.state.timer){
            if(this.props.val.isAvail){
                return <Typography variant="body2" style={{color: "green"}}>Username is Available!<DoneIcon/></Typography>
            }
            else{
                return <Typography variant="body2" color="error">Username is Taken<ClearIcon/></Typography>
            }
        }
        
    }

    openWindow(){
        this.setState({timer: true});
        setTimeout(() => {
            this.setState({timer: false});
        }, 2000);
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
                        onChange={this.handleUser}
                        style={{width: "35%",paddingBottom:"8px"}}
                        margin="dense"
                    />
                    <div>
                    {this.returnOut()}
                    <Fab
                        variant="extended"
                        size="small"
                        disabled={!this.validateBut()}
                        color="primary"
                        style={{outline: 0}}
                        onClick={() => {this.checkUser();this.openWindow()}}
                        >
                        Check Available
                    </Fab>
                    </div>
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