import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    padding: {
      padding: '10px',
    },
}));

export default () => {
    const classes = useStyles();
    return (
        <div className={classes.padding}>
            <h1>About</h1>
            <hr/>
            <h2>Frontend: Reactjs</h2>
            <h2>Backend:  Nodejs/Express</h2>
            <h2>DB:       Mongodb/Cloudinary</h2>
        </div>
    )
}

