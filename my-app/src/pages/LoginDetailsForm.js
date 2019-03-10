import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import DoneIcon from '@material-ui/icons/Done';
import ErrorIcon from '@material-ui/icons/Error';

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
        fetch(`http://138.197.221.30:4000/users/check?username=${this.props.val.username}`)
        .then(response => response.json())
        .then(response => {if(response.data.length===0){this.props.onSelLan("isAvail", true); this.openWindow()}else{this.props.onSelLan("isAvail", false); this.openWindow()}})
        .catch(err => console.log(err))
    }

    returnOut(){
        if(this.state.timer){
            if(this.props.val.isAvail){
                return <Typography style={{color: "green"}}><DoneIcon/>Username is Available!</Typography>
            }
            else{
                return <Typography color="error"><ErrorIcon/>Username is Taken</Typography>
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
                        onClick={() => this.checkUser()}
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