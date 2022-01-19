import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ProductList from './ProductList';
import ProductAdd from './ProductAdd';
const useStyles = makeStyles((theme) => ({
    textStyle: {
      fontFamily: 'verdana',
    },
}));

export default () => {
    const classes = useStyles();
    return (
        <div>
            <h1 className={classes.textStyle}>List of Products  <ProductAdd /></h1>
            <ProductList />
        </div>
    )
}