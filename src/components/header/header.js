import { AppBar, Avatar, ClickAwayListener, Divider, Drawer, Grow, Hidden, IconButton, List, ListItem, ListItemText, makeStyles, MenuItem, MenuList, Paper, Popper, Toolbar, Typography, useTheme } from '@material-ui/core';
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
    '& .MuiDrawer-paperAnchorDockedLeft': {
      borderRight: 'none',
      padding: 16
    },
    '& .MuiDrawer-paper': {
      top: 'auto'
    }
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
    '& .MuiDrawer-paperAnchorDockedLeft': {
      borderRight: 'none'
    },
    '& .MuiDrawer-paper': {
      top: 'none'
    },

  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      // width: `calc(100% - ${drawerWidth}px)`,
      // marginLeft: drawerWidth,
    },
    '& .MuiToolbar-root.MuiToolbar-regular': {
      [theme.breakpoints.up('sm')]: {
        padding: 0
      },
    }
  },
  list: {
    width: 238,
    '& .MuiSvgIcon-root': {
      color: '#0048B4'
    },
    '& .MuiListItem-root': {
      textTransform: 'uppercase'
    }
  },
  link: {
    '& .MuiListItem-button': {
      height: 70
    }
  },
  brandName: {
    '& .MuiTypography-root': {
      fontWeight: 700
    }
  },
  header: {
    '& .MuiPaper-elevation4': {
      boxShadow: 'none'
    }
  }, 
  menu: {
    '& .MuiListItem-root': {
      paddingTop: 0,
      paddingBottom: 0
    },
    '& .MuiListItem-gutters': {
      padding: 0
    }
  }
}))

const Header = (props) => {
  const { window } = props;
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  // const [anchorEl, setAnchorEl] = useState(null);
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
          <Hidden xsDown implementation="css">
            <NavLink to="/">
              <ListItem button>
                <ListItemText className={classes.brandName}>
                  <Typography variant="h4">App<i>Name</i></Typography>
                </ListItemText>
              </ListItem>
            </NavLink>
          </Hidden>
          <div>
            <IconButton onClick={() => history.push("/add")}>
              <AddCircle />
            </IconButton>
            <IconButton ref={anchorEl} onClick={handleToggle}>
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
            <NavLink to="/" className={classes.link}>
              <ListItem button>
                <ListItemText>
                  <Typography variant="h4">App<i>Name</i></Typography>
                  <Typography variant="body2">Mobile</Typography>
                </ListItemText>
              </ListItem>
            </NavLink>
            <Divider />
            <List className={classes.list}>
              <NavLink to="/installation">
                <ListItem button>
                  <ListItemText>
                    <Typography variant="body2">Profile</Typography>
                  </ListItemText>
                </ListItem>
              </NavLink>
            </List>
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
            <Avatar className={classes.purple}>OP</Avatar>
            <List className={classes.menu}>
              <NavLink to="/">
                <ListItem button>
                  <ListItemText className={classes.brandName}>
                    <Typography variant="subtitle1">Listings</Typography>
                  </ListItemText>
                </ListItem>
              </NavLink>
              <NavLink to="/">
                <ListItem button>
                  <ListItemText className={classes.brandName}>
                    <Typography variant="subtitle1">Podcast</Typography>
                  </ListItemText>
                </ListItem>
              </NavLink>
              <NavLink to="/">
                <ListItem button>
                  <ListItemText className={classes.brandName}>
                    <Typography variant="subtitle1">Videos</Typography>
                  </ListItemText>
                </ListItem>
              </NavLink>
            </List>
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default Header;