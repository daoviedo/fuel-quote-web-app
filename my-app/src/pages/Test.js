import React, { Component } from "react";
import PropTypes from 'prop-types';
import Navbar from './components/nav_bar';
import withStyles from '@material-ui/core/styles/withStyles';


const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 200,
    },
    control: {
      padding: theme.spacing.unit * 2,
    },
    card: {
        maxWidth: 345,
        height: '400px',
        float: 'left',
        margin: '20px',
    },
    media: {
        height: 140,
    },
  });

class Test extends Component {
    state ={
        users: [],
    }

    componentDidMount(){
        this.getData();
    }

    getData(){
        fetch('http://localhost:4000/users')
        .then(response=> response.json())
        .then(res=> this.setState({users: res.data}))
        .catch(err => console.log(err))
    }

    render() {
        console.log(this.state.users)
        const { classes } = this.props;
        return (
            <div>  
                <Navbar />
                <br/><br/><br/><br/>
                
                {this.state.users.map(({username, password, firstname})=><p>{username}:{password}:{firstname}</p>)}
             
                
            </div>
        );
    }
}

Test.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Test);