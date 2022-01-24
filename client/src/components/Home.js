import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ProductList from './ProductList';

const useStyles = makeStyles(() => ({
    textStyle: {
      fontFamily: 'verdana',
      textAlign: 'center',
      borderBottom: '2px solid gray;'
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