import React, { Component } from 'react';

class Userpage extends Component {
    constructor(props){
        super(props)
        this.state = {
            username = this.props.id
        }
    }
    render() {
        return (
            <div>
                <h3>{this.state.username}</h3>
            </div>
        );
    }
}

export default Userpage;