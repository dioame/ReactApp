import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';


import { Link } from 'react-router-dom';
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

export default function() {
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
      <AppBar position="static" style={{backgroundColor: 'black'}}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={drawerOpen(toggleDrawer)}>
     
          </IconButton>
          <Typography variant="h6" className={classes.title}>
                L D S
          </Typography>

          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/about">About</Button>
          <Button color="inherit" component={Link} to="/contact">Contact</Button>
      
         

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