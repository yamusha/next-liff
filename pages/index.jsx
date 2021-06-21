import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Button from '@material-ui/core/Button';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FolderIcon from '@material-ui/icons/Folder';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import ButtonGroup from '@material-ui/core/ButtonGroup';

import Link from 'next/link';
import { Router, useRouter } from "next/router";


import Container from '@material-ui/core/Container';

// import Profile from './profile'
import Login from './login';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  root1: {
    width: '100%',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  root2: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  container: {
    display: "flex",
    flex: 1,
  },
  main: {
    flex: 1,
    fontFamily: 'Sarabun',
  },
  appcolor: {
    background : '#FFFFFF'
  },
  root3: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(2),
    },
  },
}));

export default function MenuAppBar() {
  const router = useRouter();

  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const [state, setState] = React.useState({
    left: false,
  });
  const [value, setValue] = React.useState('recents');

  const handleChange1 = (event, newValue) => {
    setValue(newValue);
  };
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({})
  const [email, setEmail] = useState({})
  const [users, setUsers] = useState(false)

  const verify = async (uid) => {
    const res = await fetch('/api/phichit2liff-api/index.php/users/verify/'+uid, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })

    const result = await res.json()
    // console.log('result', result)
    return result
  }


  // useEffect(() => {
  //   console.log(state);
  // }, [state])

  useEffect(async () => {
    const liff = (await import('@line/liff')).default
    await liff.ready
    const profile = await liff.getProfile()
    const email = liff.getDecodedIDToken().email
    setProfile(profile)
    setEmail(email)
    
    const verifyData = await verify(profile.userId)
    // console.log(verifyData);
    console.log('result', verifyData)
    if(verifyData.status === 'success'){
      setUsers(verifyData.data)
    }
    console.log(users);

    setLoading(true)

  }, [profile.userId])

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root2}>
      <AppBar position="static">
        <Toolbar variant="dense">
          {users &&
          (<>
          <IconButton onClick={toggleDrawer('left', true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
            {list('left')}
          </SwipeableDrawer>
          </>)}
          
          <Typography variant="h6" className={classes.title}>
            E-Service
          </Typography>
          {users && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.container}>
      <main className={classes.main}>
        {/* B
      <br />A
      <br />A
      <br />A
      <br />A
      <br />A
      <br />A
      <br />A
      <br />A
      <br />A
      <br />A
      <br />A
      <br />A
      <br />A
      <br />A
      <br />A
      <br />A
      <br />A
      <br /> */}

{!loading ? (
        // <Row className="justify-content-md-center p-3">
        //   <Col className="text-center">
        //     <Spinner animation="border" variant="primary" role="status">
              <span className="sr-only">Loading...</span>
        //     </Spinner>
        //   </Col>
        // </Row>
      ) : (
        !users ? (<Login profile={profile} email={email} />): users.email
      )}

      </main></div>
      

    {/* <AppBar position="static"  className={classes.appcolor}>
          <Container maxWidth="lg">
         
    <BottomNavigation
  value={value}
  onChange={(event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  }}
  showLabels
  className={classes.root}
>
<BottomNavigationAction onClick={()=> router.push("/index2")} label="Recents" value="recents" icon={<RestoreIcon />} />
  <BottomNavigationAction onClick={()=> router.push("/")} label="Favorites" value="favorites" icon={<FavoriteIcon />} />
    <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} />
</BottomNavigation>
    
          </Container>
        </AppBar> */}
      
    </div>
  );
}
