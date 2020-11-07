import { Button, ClickAwayListener, Container, Grid, Grow, IconButton, makeStyles, MenuItem, MenuList, Modal, Paper, Popper, Typography } from '@material-ui/core';
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
      borderRadius: 16,
      border: 'transparent'
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
    }
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

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const Content = (props) => {
  return (

    <div style={props.modalStyle} className={props.classes}>
      <h2 id="simple-modal-title">Attention!</h2>
      <p id="simple-modal-description">
        You are about to delete a post.
    </p>
      <Grid item xs={12}>
        <Button color="primary" size="small" onClick={() => props.handleDelete(props.id)} variant="contained">Proceed</Button>
        <Button color="primary" size="small" onClick={props.handleClose} variant="outlined">Cancel</Button>
      </Grid>
    </div>
  )
}

const Dashboard = () => {
  const classes = useStyles();
  const history = useHistory();
  const [initialData, setInitialData] = useState(null);
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [id, setID] = useState(null);

  useEffect(() => {
    loadInitialData();
  }, [])

  const loadInitialData = async () => {
    setInitialData(await listPosts())
  }

  const handleDelete = async (id) => {
    console.log(id)
    
    const apiResponse = await deletePost(id);
    if (apiResponse.status === 200) {
      loadInitialData();
      handleClose();
    } else {
      console.log('error')
    }
  }

  const handleOpen = (id) => {
    setOpen(true);
    setID(id)
  };

  const handleClose = () => {
    setOpen(false);
  };



  return (
    <>
      {initialData ? (
        <Container maxWidth="md">
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
                            {/* <IconButton size="small" onClick={handleToggle}>
                              <MoreVert />
                            </IconButton> */}
                            {/* <Typography color="primary" onClick={() => history.push(`/update/${post.id}`)} variant="button">Edit</Typography> */}
                          </div>
                          <Typography variant="caption" gutterBottom>{post.body}</Typography>
                          <Grid item xs={12}>
                            <Button color="primary" size="small" onClick={() => history.push(`/update/${post.id}`)} variant="contained">Update</Button>
                            <Button color="primary" size="small" onClick={() => handleOpen(post.id)} variant="outlined">Delete</Button>
                          </Grid>
                        </Paper>

                      </div>
                    </Grid>
                  ))
                ) : ''}
              </Grid>
            </Grid>
            <Grid item md={4}>
              <Sidenav />
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Content
          handleDelete={handleDelete}
          handleClose={handleClose}
          id={id}
          modalstyle={modalStyle}
          classes={classes.paper} />
      </Modal>
    </>
  );
}

export default Dashboard;