import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ProductList from './ProductList';

const useStyles = makeStyles(() => ({
    textStyle: {
      fontFamily: 'verdana',
    },
}));

export default () => {
    const classes = useStyles();
    return (
        <div>
            <h1 className={classes.textStyle}>List of Products</h1>
            <ProductList />
        </div>
    )
}