import { Fade, Grid, IconButton, makeStyles, MenuItem, MenuList, Paper, Popper, Typography } from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { deletePost, listPosts } from '../../apis/posts';

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
  menuContainer: {
    '& .MuiPaper-rounded': {
      borderRadius: 7,
      width: 250,
      padding: theme.spacing(1, 0)
    }
  }
}))

const Dashboard = () => {
  const classes = useStyles();
  const history = useHistory();
  const [initialData, setInitialData] = useState(null);
  const [anchorRef, setAnchorRef] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    loadInitialData();
  }, [])

  const loadInitialData = async () => {
    setInitialData(await listPosts())
  }

  const handleToggle = (event, id) => {
    setId(id)
    setAnchorRef(anchorRef ? null : event.currentTarget);
  }

  const open = Boolean(anchorRef);

  const handleDelete = async () => {
    console.log('here')
    await(deletePost(id))
  }


  return (
    <>
      {initialData ? (
        <Grid container>
          <Grid item md={12} xs={12}>
            <Grid container spacing={1}>
              {initialData.data ? (
                initialData.data.map((post) => (
                  <Grid item md={12} key={post.id}>
                    <div
                      className={classes.post}
                    >
                      <Paper id={post.id} variant="outlined" >
                        <div className={classes.flex}>
                          <Link to={`/posts/${post.id}`}>
                            <Typography color="primary" variant="body1">{post.title}</Typography>
                          </Link>
                          <IconButton size="small"
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={(event) => handleToggle(event, post.id)}>
                            <MoreHoriz />
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
        </Grid>
      ) : (
          <Grid container spacing={1}>
            <Grid item md={12}>
              <Skeleton height="20" />
              <Skeleton height="20" />
              <Skeleton height="20" />
            </Grid>
          </Grid>
        )}
      <Popper
        id={id}
        open={open}
        anchorEl={anchorRef}
        role={undefined}
        transition
        disablePortal
        placement="bottom-end"
        className={classes.menuContainer}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <MenuList>
                <MenuItem onClick={() => history.push(`/update/${id}`)}>
                  <Typography variant="overline">
                    Edit post
                </Typography>
                </MenuItem>
                <MenuItem onClick={() => handleDelete(id)}>
                  <Typography variant="overline">
                    Delete post
                </Typography>
                </MenuItem>
              </MenuList>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
}

export default Dashboard;