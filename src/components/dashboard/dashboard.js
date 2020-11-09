import { ClickAwayListener, Container, Grid, Grow, Hidden, IconButton, makeStyles, MenuItem, MenuList, Paper, Popper, Typography } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { deletePost, listPosts } from '../../apis/posts';
import Sidenav from '../header/sidenav';

const useStyles = makeStyles((theme) => ({
  post: {
    '& .MuiPaper-root.MuiPaper-outlined': {
      padding: theme.spacing(3),
      borderRadius: 7,
    }
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& .MuiIconButton-sizeSmall': {
      padding: 0
    },
    '& .MuiTypography-body1': {
      overflowWrap: 'break-word',
      paddingRight: 15
    },
    marginBottom: '1.5rem'
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '30%',
    left: '35%'
  },
}))

const Dashboard = () => {
  const classes = useStyles();
  const history = useHistory();
  const [initialData, setInitialData] = useState(null);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  useEffect(() => {
    loadInitialData();
  }, [])

  const loadInitialData = async () => {
    setInitialData(await listPosts())
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  }

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      {initialData ? (
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item md={8} xs={12}>
              <Grid container spacing={3}>
                {initialData.data ? (
                  initialData.data.map((post) => (
                    <Grid item md={12} key={post.id}>
                      <div
                        className={classes.post}
                      >
                        <Paper id={post.id} variant="outlined" >
                          <div className={classes.flex}>
                            <Typography color="primary" onClick={() => history.push(`/posts/${post.id}`)} variant="body1">{post.title}</Typography>
                            <IconButton size="small"
                              ref={anchorRef}
                              aria-controls={open ? 'menu-list-grow' : undefined}
                              aria-haspopup="true"
                              onClick={handleToggle}>
                              <MoreVert />
                            </IconButton>
                          </div>
                          <Typography variant="caption" gutterBottom>{post.body}</Typography>
                        </Paper>

                      </div>
                    </Grid>
                  ))
                ) : ''}
              </Grid>
            </Grid>
            <Grid item md={4}>
              <Hidden xsDown implementation="css">
                <Sidenav />
              </Hidden>
            </Grid>
          </Grid>
        </Container>
      ) : (
          <Container maxWidth="md">

            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Skeleton height="20" />
              </Grid>
            </Grid>
          </Container>
        )}
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

export default Dashboard;