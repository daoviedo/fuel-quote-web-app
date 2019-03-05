import React, { Component } from "react";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;


const styles = theme => ({
    paper: {
        width: '100%',
        height: '70px',
        bottom: '0%',
        marginTop: 10,
    },
  });

class BottomBar extends Component {
    

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <Paper className={classes.paper}>
                    <Typography style={{opacity: 0.5,marginTop: 5}}>
                        Created by: Daniel Oviedo, Joel Jijo, and Shahzib Ali
                    </Typography>
                    <Divider style={{width: "50%", margin: 'auto'}}/>
                    <Typography style={{opacity: 0.5}}>
                        DISCLAIMER: This is merely just a project and does not intend to provide any actual oil/transactions.
                    </Typography>
                </Paper>
            </React.Fragment>
        );
    }
}

BottomBar.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(BottomBar);