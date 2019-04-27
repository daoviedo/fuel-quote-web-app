import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;



const theme1 = createMuiTheme({
    palette: {
        primary: { main: 'rgb(255,255,255)' },
    },
});

const styles = {
    card: {
        width: '90%',
        marginTop: '20px',
        marginBottom: '20px',
    },
    media: {
        height: 140,
    },
    content: {
        height: 400,
    },
    paper: {
        height: 50,
        backgroundColor: "#00897b",

    }
};

class news_cards_test extends Component {
    state = {
        articles: [],
    }


    componentDidMount() {
        this.getData();
    }

    comp

    getData = _ => {
        var holder = [];
        const API_KEY = 'a822076091e14f77a0ef87bc40c8aaf6';
        let url = 'https://newsapi.org/v2/everything?q=petroleum&from=2019-04-25&sortBy=publishedAt&apiKey=' + API_KEY;
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                for (var i = 0; i < 9; i++) {
                    holder.push(responseJson.articles[i]);
                }
                this.setState({ articles: holder });
            })
    }

    render() {
        const { classes } = this.props;
        const { articles } = this.state;
        return (

            <Grid container justify='center' style={{ maxWidth: '1000px', margin: 'auto' }}>
                {articles.map(({ url, publishedAt, title, description, urlToImage }) =>
                    <Grid container justify='center' style={{ width: "33%" }} key={publishedAt}>
                        <Card className={classes.card}>
                            <CardActionArea className={classes.content} style={{ overflow: 'hidden' }}>
                                <CardMedia
                                    className={classes.media}
                                    image={urlToImage}
                                    title={title}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h6">
                                        {title}
                                    </Typography>
                                    <Typography>
                                        {description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <MuiThemeProvider theme={theme1}>
                                <Paper className={classes.paper}>

                                    <Button href={url} variant="outlined" size="small" color="primary" style={{ margin: 'auto', marginTop: 9, marginBottom: 9, textTransform: 'none', outline: 0, }}>
                                        Learn More
                                </Button>

                                </Paper>
                            </MuiThemeProvider>
                        </Card>
                    </Grid>
                )}
            </Grid>

        );
    }
}


news_cards_test.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(news_cards_test);