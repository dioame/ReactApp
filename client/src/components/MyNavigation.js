import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';


import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 300,
  },
}));

export default () => {
  const classes = useStyles();

  const [toggleDrawer, setToggleDrawer] = useState(false);

  const drawerOpen = (status) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setToggleDrawer(!status);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={drawerOpen(toggleDrawer)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
                L D S
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

        <Drawer anchor="left" open={toggleDrawer} onClose={drawerOpen(toggleDrawer)}>
            <div
                className={classes.list}
                role="presentation"
                onClick={drawerOpen(toggleDrawer)}
                onKeyDown={drawerOpen(toggleDrawer)}
            >
                <Divider />
                <List>
                    <ListItem button component={Link} to="/">
                        <ListItemIcon> <HomeIcon /> </ListItemIcon> 
                        <ListItemText primary="Home" />
                    </ListItem >
                    <ListItem button component={Link} to="/about">
                        <ListItemIcon> <InboxIcon /> </ListItemIcon> 
                        <ListItemText primary="About" />
                    </ListItem >
                    <ListItem button component={Link} to="/contact">
                        <ListItemIcon> <MailIcon  /> </ListItemIcon> 
                        <ListItemText primary="Contact" />
                    </ListItem>
                </List>
                <Divider />
            </div>
        </Drawer>
    </div>
  );
}