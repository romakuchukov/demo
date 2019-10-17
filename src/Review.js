import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


const styles = (theme) => ({
    divider: {
        margin: theme.spacing(2, 0),
        height: 5,
        backgroundColor: '#333'
    },
    total:{
        textAlign: 'right',
        [theme.breakpoints.down(650)]: {
            fontSize: '1.2rem'
        },
        [theme.breakpoints.down(550)]: {
            fontSize: '1rem'
        }

    },
    typography: {
        [theme.breakpoints.down(650)]: {
            fontSize: '1.2rem'
        },
        [theme.breakpoints.down(550)]: {
            fontSize: '1rem'
        }
    },
    image: {
        width:'100%',
        height:'auto',
        maxWidth: '70px',
        float: 'left',
        [theme.breakpoints.down(750)]: {
            display: 'none'
        }
    },
    span: {
        float: 'left',
        [theme.breakpoints.up(750)]: {
            paddingTop: '15px',
            paddingLeft: '10px',
        }
    },
    listItem: {
        padding: theme.spacing(2, 0),
    }
});

class Review extends Component {
    state = {
        shoppingbag: [],
        total: 0
    }

    componentDidMount(){
        this.setState({
            shoppingbag : Object.keys(JSON.parse(localStorage.getItem('shoppingbag'))).map(key => JSON.parse(localStorage.getItem('shoppingbag'))[key])
        });
    }

    render(){
        const { classes } = this.props;
        const { shoppingbag } = this.state;
        return (
            <List className={classes.list}>
                {shoppingbag.map(product => (
                    <ListItem className={classes.listItem} key={product.productName}>
                        <Typography variant="h4" className={classes.typography}>
                            <img className={classes.image} src={product.productImage} alt={product.productName} />
                            <span className={classes.span}>{product.productName}: ${product.productPrice} * {product.productCounter} = <b>${product.productPrice * product.productCounter}</b></span>
                        </Typography>
                    </ListItem>
                ))}
                <Divider className={classes.divider} />
                <Typography className={classes.total} variant="h4">
                    <b>Total: ${shoppingbag.reduce((total, product) => (total += product.productPrice * product.productCounter), 0).toFixed(2)}</b>
                </Typography>
            </List>
        );
    }
}

export default withStyles(styles)(Review);