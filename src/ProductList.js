import React, { useState } from 'react';
import { products }  from './bikerentals.json';
import { List, Grid, Button, ListItem, InputBase, Typography, withStyles } from '@material-ui/core';
import { AppContext } from './context';

//https://stackoverflow.com/a/41736336

const styles = (theme) => ({
  inputBase: {
    fontSize: '150%',
    textAlign: 'center',
    padding: theme.spacing(0, 1),
    '& input': { textAlign: 'center' }
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
    [theme.breakpoints.down(400)]: { fontSize: '1rem' }
  },
  grid: {
    textAlign: 'right'
  }
});

const ProductList = (props) => {
  const { classes } = props;
  const [store, setStore] = React.useContext(AppContext);

  React.useEffect(() => {
    if(Object.keys(store).length === 1) {
      products.forEach(product => setStore(prevStore => ({
        ...prevStore,
        [product.id]: { counter: 0 }
      })));
    }
  });

  const isBike = (product_type, check) => product_type === check;

  const increment = (product) => {
    if(isBike(product.product_type, 'bike')) {
      setStore(prevStore => ({
        ...prevStore,
        itemCounter: prevStore.itemCounter+1
      }));
    }

    setStore(prevStore => ({
      ...prevStore,
      [product.id]: {
        product,
        counter: prevStore[product.id].counter+1 || 1
      }
    }));
  };

  const decrement = (product) => {

    if(isBike(product.product_type, 'bike')) {
      setStore(prevStore => ({
        ...prevStore,
        itemCounter: prevStore.itemCounter ? prevStore.itemCounter-1 : prevStore.itemCounter
      }));
    }

    setStore(prevStore => {
      if(prevStore.itemCounter === 0) { clearCounters(); }
      return {
        ...prevStore,
        [product.id]: {
          counter: prevStore.itemCounter ? prevStore[product.id].counter-1 : 0,
          product: prevStore[product.id].product
        }
      }
    });
  };

  const clearCounters = () => {
    products.forEach(product => setStore(prevStore => ({
      ...prevStore,
      [product.id]: { counter: 0 }
    })));
  };

  const disableIncrement = (product) => !store.itemCounter && !isBike(product.product_type, 'bike');
  const disableDecrement = (product) => !!(store[product.id] && store.itemCounter);

  const onCounter = (e, product) => {

    const counter = parseInt(e.target.value, 10);

    //check if one number, set to empty string on backspace
    setStore(prevStore => ({
        ...prevStore,
        [product.id]: {
          product: prevStore[product.id].product,
          counter: !Number.isNaN(counter) ? counter : '',
        }
    }));
  };

  return (
    <List className={classes.list}>
      {products.map(product => (
        <ListItem className={classes.listItem} key={product.id}>
          <Grid container alignItems="center">
            <Grid item xs={1}>
              <img className={classes.img} alt={product.name} src={product.image} />
            </Grid>
            <Grid item xs={8} className={classes.text}>
              <Typography variant="h6" className={classes.typography}>{product.name}</Typography>
              <Typography variant="h5" className={classes.typography}>${product.price}</Typography>
            </Grid>
            <Grid item xs={1}>
              <Button onClick={() => increment(product)} disabled={disableIncrement(product)} size="small" color="secondary" variant="contained">+</Button>
            </Grid>
            <Grid item xs={1}>
              <InputBase value={store[product.id].counter} onChange={(e) => onCounter(e, product)} className={classes.inputBase} />
            </Grid>
            <Grid item xs={1}>
              <Button onClick={() => decrement(product)} disabled={!disableDecrement(product)} size="small" color="primary" variant="contained">-</Button>
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </List>
  );
};

export default withStyles(styles)(ProductList);
