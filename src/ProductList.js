import React, { Component, Fragment } from 'react';
import { products }  from './bikerentals.json';
import { withStyles, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import C from './Context'

import { useSelector } from 'react-redux';

function Counted() {
    return (<Typography variant="h6" gutterBottom>counted {useSelector(state => state.counted)}</Typography>);
}

const styles = (theme) => ({
    fabButton: {
      zIndex: 1,
      margin: '0 auto',
      width: '100%',
      minWidth: '100%',
    },
    button: {
        fontSize: '150%',
        cursor: 'default',
        width: '100%',
        minWidth: '100%',
        '&:hover': {
            background: 'none'
        }
    },
    counter: {
        textAlign: 'center',
        fontSize: 30
    },
    list: {
        marginBottom: theme.spacing(1),
        padding: theme.spacing(0)
    },
    listItem : {
        padding: theme.spacing(1, 0)
    },
    paper: {
        padding: theme.spacing(0, 0, 0),
        margin: 'auto',
    },
    img: {
        margin: 'auto',
        display: 'block',
        width: '100%',
        height: 'auto',
        maxWidth: '200px',
        maxHeight: '200px',
        marginRight: '10px',
    },
    text: {
        padding: theme.spacing(0, 2)
    },
    typography: {
        [theme.breakpoints.down(400)]: {
            fontSize: '1rem'
        }
    },
    grid: {
        textAlign: 'right'
    }
});

class ProductList extends Component {

    shopingBag = {};

    state = {
        counter: {},
        itemCounter: 0
    }

    componentDidMount() {
        localStorage.setItem('shoppingbag', '');
        localStorage.setItem('itemCounter', 0);
    }

    increment = (product) => {
        this.setState(previousState => {

            let localCounter = previousState.counter[product.id];

            this.shopingBag[product.id] = {
                productType: product.product_type,
                productName: product.name,
                productPrice: product.price,
                productImage: product.image,
                productCounter: ++localCounter || 1
            }

            if(this.bikeChecker(product, 'bike')) {
                ++previousState.itemCounter;
                localStorage.setItem('itemCounter', previousState.itemCounter);
            }

            localStorage.setItem('shoppingbag', JSON.stringify(this.shopingBag));

            return ({counter: { ...previousState.counter, [product.id]: ++previousState.counter[product.id] || 1}});
        });
    }

    decrement = (product) => {
        this.setState(previousState => {
            let localCounter = previousState.counter[product.id];

            this.shopingBag[product.id] = {
                productType: product.product_type,
                productName: product.name,
                productPrice: product.price,
                productImage: product.image,
                productCounter: --localCounter
            }

            if (!localCounter) delete this.shopingBag[product.id];

            if(this.bikeChecker(product, 'bike')) { --previousState.itemCounter; }

            if(this.state.itemCounter === 0) {
                previousState.counter = {};
                localStorage.setItem('itemCounter', 0);
                localStorage.setItem('shoppingbag', '');
                this.shopingBag = {};
            }

            localStorage.setItem('shoppingbag', JSON.stringify(this.shopingBag));

            return ({counter: { ...previousState.counter, [product.id]: --previousState.counter[product.id]}});
        });
    }

    bikeChecker = (product, check) =>  {
        return product.product_type === check;
    }

    static contextType = C

    render() {

        const { classes } = this.props;
        const { counter, itemCounter } = this.state;

        return (
            <List className={classes.list}>
                {products.map((product) => (
                    <Fragment key={product.id}>
                        <ListItem className={classes.listItem}>
                            <Counted />
                            <Grid container alignItems="center">
                                <Grid item xs={1}>
                                    <img className={classes.img} alt={product.name} src={product.image} />
                                </Grid>
                                <Grid item xs={8} className={classes.text}>
                                    <Typography variant="h6" className={classes.typography}>{product.name}</Typography>
                                    <Typography variant="h5" className={classes.typography}>${product.price}</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Button disabled={!itemCounter && !this.bikeChecker(product, 'bike')} onClick={() => this.increment(product)} size="small" color="secondary" variant="contained" className={classes.fabButton}>+</Button>
                                </Grid>
                                <Grid item xs={1}>
                                    <Button className={classes.button}>{counter[product.id] || 0}</Button>
                                </Grid>
                                <Grid item xs={1}>
                                    <Button onClick={() => this.decrement(product)} size="small" color="primary" variant="contained" disabled={!counter[product.id]} className={classes.fabButton}>-</Button>
                                </Grid>
                            </Grid>
                        </ListItem>
                        <Divider />
                    </Fragment>
                ))}
            </List>
        );
    }
}

export default withStyles(styles)(ProductList);