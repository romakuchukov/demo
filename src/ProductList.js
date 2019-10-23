import React, { Component, Fragment, useContext } from 'react';
import { products }  from './bikerentals.json';
import { withStyles, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';

import { AppContext } from './context/AppContext';

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

function Stored({product, classes}) {
    const [store, setStore] = useContext(AppContext);

    const isBike = (product_type, check) => {
        return product_type === check;
    }

    const init = (id) => {
        if (Object.keys(store).length === 0) {
            setStore(prevStore => ({ ...prevStore, ['itemCounter']: 0 }));
            setStore(prevStore => ({ ...prevStore, [id]: { counter: 0 }}));
        }
    }

    const increment = (product) => {

        if(isBike(product.product_type, 'bike')) {
            setStore(prevStore => ({...prevStore, itemCounter: prevStore.itemCounter+1}));
        }

        setStore(prevStore => ({...prevStore, [product.id]: {counter: prevStore[product.id].counter+1 || 1}}));
    }

    const decrement = (product) => {

        if(isBike(product.product_type, 'bike')) {
            setStore(prevStore => ({...prevStore, itemCounter: prevStore.itemCounter ? prevStore.itemCounter-1 : prevStore.itemCounter }));
        }

        setStore(prevStore => ({ ...prevStore, [product.id]: { counter: prevStore.itemCounter ? prevStore[product.id].counter-1 : 0}}));
    }

    const disableIncremnt = () => !store.itemCounter && !isBike(product.product_type, 'bike');
    const disableDecrement = () => ((store[product.id] && store.itemCounter) ? store[product.id].counter : false);
    const counter = () => (store[product.id] ? store[product.id].counter : 0);

    init(product.id);

    return (
      <Fragment>
        {product && product.id ? (
            <ListItem className={classes.listItem}>
                <Grid container alignItems="center">
                    <Grid item xs={1}>
                        <img className={classes.img} alt={product.name} src={product.image} />
                    </Grid>
                    <Grid item xs={8} className={classes.text}>
                        <Typography variant="h6" className={classes.typography}>{product.name}</Typography>
                        <Typography variant="h5" className={classes.typography}>${product.price}</Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Button onClick={() => increment(product)} disabled={disableIncremnt()} className={classes.fabButton} size="small" color="secondary" variant="contained">+</Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button className={classes.button}>{counter()}</Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button onClick={() => decrement(product)} disabled={!disableDecrement()} className={classes.fabButton} size="small" color="primary" variant="contained">-</Button>
                    </Grid>
                </Grid>
            </ListItem>
        ):('')}
      </Fragment>
    );
}


class ProductList extends Component {

    render() {

        const { classes } = this.props;

        return (
            <List className={classes.list}>
                {products.map(product => (
                    <Stored key={product.id} product={product} classes={classes} />
                ))}
            </List>
        );
    }
}

export default withStyles(styles)(ProductList);