import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { AppContext } from './context/AppContext';

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


const Review = (props) => {

    const { classes } = props;
    const [shoppingbag] = useContext(AppContext);
    return (
        <List className={classes.list}>
        {Object.keys(shoppingbag).map(key => (
            <ListItem className={classes.listItem} key={shoppingbag[key].id}>
                <Typography variant="h4" className={classes.typography}>
                    <img className={classes.image} src={shoppingbag[key].image} alt={shoppingbag[key].name} />
                    <span className={classes.span}>{shoppingbag[key].name}: ${shoppingbag[key].price} * {shoppingbag[key].counter} = <b>${shoppingbag[key].price * shoppingbag[key].counter}</b></span>
                </Typography>
            </ListItem>
        ))}
        <Divider className={classes.divider} />
        <Typography className={classes.total} variant="h4">
            <b>Total: ${Object.keys(shoppingbag).reduce((total, key) => (total += shoppingbag[key].price * shoppingbag[key].counter), 0).toFixed(2)}</b>
        </Typography>
    </List>
    );
}

export default withStyles(styles)(Review);