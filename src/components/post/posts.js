/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Container, Grid, IconButton, makeStyles, Modal, Paper, Typography } from '@material-ui/core';
import { ArrowBackIosOutlined } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { deletePost, getPost } from '../../apis/posts';

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
  iconContainer: {
    '& .MuiIconButton-root:hover': {
      backgroundColor: 'transparent'
    },
    '& .MuiSvgIcon-root': {
      marginRight: 15,
      padding: 5,
      borderRadius: 25,
      border: '1px solid'
    },
    display: 'flex',
    alignItems: 'center',
  }
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

const Post = () => {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();
  const [loading, setIsLoading] = useState(true);
  const [initialValues, setInitialValues] = useState(null)
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [id, setID] = useState(null);

  useEffect(() => {
    setIsLoading(false);
    const loadInitialFormData = async () => {
      if (params.id) {
        const initialData = await getPost(params.id)
        setInitialValues(initialData.data)
      }
    };

    loadInitialFormData();
  }, [])

  const handleDelete = async (id) => {
    console.log(id)

    const apiResponse = await deletePost(id);
    if (apiResponse.status === 200) {
      // loadInitialData();
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
      <Container maxWidth="md">
        <Grid container spacing={1}>
          <Grid md={12} item className={classes.iconContainer}>
            <IconButton onClick={() => history.goBack()}>
              <ArrowBackIosOutlined />
            </IconButton>
            Back
          </Grid>
          <Grid item md={8}>
            <div className={classes.post} >
              {initialValues ? (
                <Paper variant="outlined" >
                  <div className={classes.flex}>
                    <Typography color="primary" variant="body1">{initialValues.title}</Typography>
                  </div>
                  <Typography variant="caption" gutterBottom>{initialValues.body}</Typography>
                  <Grid item xs={12}>
                    <Button color="primary" size="small" onClick={() => history.push(`/update/${params.id}`)} variant="contained">Update</Button>
                    <Button color="primary" size="small" onClick={() => handleOpen(params.id)} variant="outlined">Delete</Button>
                  </Grid>
                </Paper>
              ) : (
                  'Loading...'
                )}
            </div>
          </Grid>
        </Grid>
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
      </Container>
    </>
  );
}

export default Post;