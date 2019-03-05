import React, { Component } from "react";
import PropTypes from 'prop-types';
import Navbar from './components/nav_bar';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
             
                <Grid container justify='center' spacing={16}>
                            <Grid container sm={4} justify='center'>
                                <Card className={classes.card}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image='{urlToImage}'
                                            title='title'
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Title
                                            </Typography>
                                            <Typography component="p">
                                                Description
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            Share
                                        </Button>
                                        <Button size="small" color="primary">
                                            Learn More
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid container sm={4} justify='center'>
                                <Paper className={classes.paper}/>
                            </Grid>
                            <Grid container sm={4} justify='center'>
                                <Paper className={classes.paper}/>
                            </Grid>
                </Grid>
            </div>
        );
    }
}

Test.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Test);