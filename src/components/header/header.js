import { AppBar, ClickAwayListener, Divider, Drawer, Grow, Hidden, IconButton, List, ListItem, makeStyles, MenuItem, MenuList, Paper, Popper, Toolbar, Typography, useTheme } from '@material-ui/core';
import { AccountCircle, AddCircle, Menu } from '@material-ui/icons';
import React, { useRef, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 70,
    borderBottom: '1px solid rgb(0, 0, 0, 0.1)'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: {
    [theme.breakpoints.up('sm')]: {
      height: 70
    },
    [theme.breakpoints.down('sm')]: {
      height: 70
    },
  },
  drawerPaper: {
    width: drawerWidth,
    '& .MuiDrawer-paper': {
      top: 'none'
    },
    '& .MuiList-padding': {
      padding: 0
    }
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  brandContainer: {
    height: 70,
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '& a.brand.active': {
      height: '100%'
    },
    '& .MuiListItem-button': {
      height: '100%'
    },
    '& a.brand.active:active': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)'
    }
  },
}))

const menu = [
  {
    label: 'Reading Lists',
    to: '/reading-list'
  },
  {
    label: 'Listings',
    to: '/listings',
  },
  {
    label: 'Podcasts',
    to: '/podcasts'
  },
  {
    label: 'Videos',
    to: '/videos'
  },
  {
    label: 'Tags',
    to: '/tags'
  }
]

const Header = (props) => {
  const { window } = props;
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const anchorEl = useRef(null);
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorEl.current && anchorEl.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorEl.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.header}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Hidden smUp implementation="css">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          </Hidden>

          {/* Toolbar for large screens */}
          <Hidden xsDown implementation="css">
          </Hidden>
          <div>
            <IconButton onClick={() => history.push("/add")} color="secondary">
              <AddCircle />
            </IconButton>
            <IconButton ref={anchorEl} onClick={handleToggle} color="primary">
              <AccountCircle />
            </IconButton>
            <Popper open={open} anchorEl={anchorEl.current} role={undefined} transition disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer} aria-label="mailbox folders">
        <div className={classes.toolbar} />
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            elevation={16}
          >
            {/* Sidenav small screens */}
            <div className={classes.brandContainer}>
              <NavLink to="/">
                <ListItem button>
                  <Typography color="primary" variant="h5">Articles</Typography>
                  <Typography color="primary" variant="body2">v {process.env.REACT_APP_VERSION}</Typography>
                </ListItem>
              </NavLink>
            </div>
            {menu.map((menu) => (
              <NavLink to={menu.to} key={menu.to}>
                <ListItem button>
                  <Typography variant="overline" color="primary">{menu.label}</Typography>
                </ListItem>
              </NavLink>
            ))}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
            elevation={16}
          >
            {/* Sidenav large screens */}
            <div className={classes.brandContainer}>
              <NavLink to="/" className="brand">
                <ListItem button>
                  <Typography color="primary" variant="h5">Articles</Typography>
                  <Typography color="primary" variant="body2">v {process.env.REACT_APP_VERSION}</Typography>
                </ListItem>
              </NavLink>
            </div>
            <List>
              {menu.map((menu) => (
                <NavLink to={menu.to} key={menu.to}>
                  <ListItem button>
                    <Typography variant="overline" color="primary">{menu.label}</Typography>
                  </ListItem>
                </NavLink>
              ))}
            </List>
            <Divider />

          </Drawer>
        </Hidden>
      </nav>
    </div >
  );
}

export default Header;