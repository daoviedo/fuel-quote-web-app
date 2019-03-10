import React, { Component } from "react";
import PropTypes from 'prop-types';
import Navbar from './components/nav_bar';
import withStyles from '@material-ui/core/styles/withStyles';


const styles = theme => ({
    
  });

class Test extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
        this.getData();
    }

    getData(){
        fetch(`http://138.197.221.30:4000/test`,{
            method: "POST",
            mode: "cors", // no-cors, cors, *same-origin
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
            },
            body: {
                "name": "Fish",
                "price": "12.00"
            }
        })
        .then(res => res.json())
        .then(result => console.log(result.data))
        .catch(err => console.log(err))
    }

    render() {
        const { classes } = this.props;
        return (
            <div>  
                <Navbar />
                <br/><br/><br/><br/>    
            </div>
        );
    }
}

Test.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Test);