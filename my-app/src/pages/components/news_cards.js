import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../css/news_card.css'


const styles = {
    card: {
        maxWidth: 345,
        height: '400px',
        float: 'left',
        margin: '20px',
    },
    media: {
        height: 140,
    },
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
        const API_KEY = 'a822076091e14f77a0ef87bc40c8aaf6';
        let url = 'https://newsapi.org/v2/everything?q=petroleum&from=2019-02-28&sortBy=publishedAt&apiKey=' + API_KEY;
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ articles: responseJson.articles });
            })
    }

    render() {
        const { classes } = this.props;
        const { articles } = this.state;
        console.log(articles);
        return (
            <div className="news-cards-container">
                <div className='news-cards-row'>
                    {articles.map(({ title, description, urlToImage }) =>
                        <div>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={urlToImage}
                                        title={title}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {title}
                                        </Typography>
                                        <Typography component="p">
                                            {description}
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
                        </div>
                    )}
                </div>
            </div >
        );
    }
}


news_cards_test.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(news_cards_test);