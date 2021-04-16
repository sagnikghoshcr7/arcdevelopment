import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQeury from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import logo from '../../assets/logo.svg';

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
    [theme.breakpoints.down("md")]: {
      marginBottom: '2em'
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: '1.2em'
    }
  },
  logo: {
    height: '8em',
    [theme.breakpoints.down("md")]: {
      height: '7em'
    },
    [theme.breakpoints.down("xs")]: {
      height: '5.5em'
    }
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  tabContainer: {
    marginLeft: 'auto'
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px"
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: '50px',
    marginLeft: '50px',
    marginRight: '25px',
    height: '45px',
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: 'white',
    borderRadius: '0px'
  },
  MenuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1
    }
  },
  drawerIcon: {
    height: '50px',
    width: '50px'
  },
  drawerIconContainer: {
    marginLeft: 'auto',
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  drawer: {
    backgroundColor: theme.palette.common.blue
  },
  drawerItem: {
    ...theme.typography.tab,
    color: 'white',
    opacity: 0.7
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.orange
  },
  drawerItemSelected: {
    opacity: 1
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQeury(theme.breakpoints.down("md"));

  const [openDrawer, setOpenDrawer] = useState(false);
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(i);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const menuOptions = [
    { name: "Services", link: "/services", activeIndex: 1, selectedIndex: 0 },
    { name: "Custom Software Development", link: "/customsoftware", activeIndex: 1, selectedIndex: 1, ariaOwns: anchorEl ? "simple-menu" : undefined, ariaPopup: anchorEl ? "true" : undefined, mouseOver: event => handleClick(event) },
    { name: "Mobile App Development", link: "/mobileapps", activeIndex: 1, selectedIndex: 2 },
    { name: "Website Development", link: "/websites", activeIndex: 1, selectedIndex: 3 }
  ];

  const routes = [
    { name: "Home", link: "/", activeIndex: 0 },
    { name: "Services", link: "/services", activeIndex: 1 },
    { name: "The Revolution", link: "/revolution", activeIndex: 2 },
    { name: "About us", link: "/about", activeIndex: 3 },
    { name: "Contact Us", link: "/contact", activeIndex: 4 }
  ];

  useEffect(() => {
    [...menuOptions, ...routes].forEach(route => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (value !== route.activeIndex) {
            setValue(route.activeIndex)
            if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
              setSelectedIndex(route.selectedIndex)
            }
          }
          break;
        default:
          break;
      }
    })
  }, [value, menuOptions, selectedIndex, routes]);

  const tabs = (
    <React.Fragment>
      <Tabs
        value={value}
        onChange={handleChange}
        className={classes.tabContainer}
        indicatorColor='primary'
      >
        {routes.map((route, index) => (
          <Tab
            key={`${route}${index}`}
            className={classes.tab}
            component={Link}
            to={route.link}
            label={route.name}
            aria-owns={route.ariaOwns}
            aria-haspopup={route.ariaPopup}
            onMouseOver={route.mouseOver}
          />
        ))}
      </Tabs>
      <Button variant='contained' color='secondary' className={classes.button}>
        Free Estimate
    </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        classes={{ paper: classes.menu }}
        MenuListProps={{ onMouseLeave: handleClose }}
        elevation={0}
        keepMounted
      >
        {menuOptions.map((option, i) => (
          <MenuItem
            key={option}
            component={Link}
            to={option.link}
            classes={{ root: classes.MenuItem }}
            onClick={(event) => {
              handleMenuClick(event, i);
              setValue(1);
              handleClose();
            }}
            selected={i === selectedIndex && value === 1}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <List disablePadding>
        {routes.map(route => (
          <ListItem
            divider
            key={`${route}${route.activeIndex}`}
            button
            component={Link}
            to={route.link}
            selected={value === route.activeIndex}
            onClick={() => {
              setOpenDrawer(false);
              setValue(route.activeIndex)
            }}
          >
            <ListItemText
              className={value === route.activeIndex ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem}
              disableTypography
            >
              {route.name}
            </ListItemText>
          </ListItem>
        ))}
          <ListItem
            onClick={() => { setOpenDrawer(false); setValue(5) }}
            divider
            button
            component={Link}
            className={classes.drawerItemEstimate}
            to="/estimate"
            selected={value === 5}
          >
            <ListItemText
              className={value === 5 ? [classes.drawerItem, classes.drawerItemSelected] : classes.drawerItem}
              disableTypography
            >
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position='fixed'>
          <Toolbar disableGutters>
            <Button
              component={Link}
              to="/"
              disableRipple
              onClick={() => setValue(0)}
              className={classes.logoContainer}
            >
              <img alt="company logo" className={classes.logo} src={logo} />
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}
