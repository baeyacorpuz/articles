/* eslint-disable react-hooks/exhaustive-deps */
import { Button, ClickAwayListener, Container, Divider, Grid, Grow, IconButton, makeStyles, MenuItem, MenuList, Paper, Popper, Typography } from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import { TextField } from 'mui-rff';
import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'react-final-form';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { deletePost, getComments, getPost } from '../../apis/posts';

const useStyles = makeStyles((theme) => ({
  post: {
    '& .MuiPaper-root.MuiPaper-outlined': {
      padding: theme.spacing(3),
      borderRadius: 7
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
    marginBottom: theme.spacing(3)
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
    '& .MuiIconButton-root': {
      padding: '12px 0px 12px'
    },
    '& .MuiSvgIcon-root': {
      marginRight: 15,
      padding: 10,
      borderRadius: 25,
      border: '1px solid',
      width: 48,
      height: 48
    },
    display: 'flex',
    alignItems: 'center',
  },
  commentContainer: {
    marginTop: theme.spacing(4),
    '& .MuiTypography-body2': {
      cursor: 'pointer'
    },
    '& .MuiButton-containedPrimary': {
      marginTop: 15
    },
    '& .MuiButton-contained:hover': {
      boxShadow: 'none'
    }
  },
  marginTop: {
    margin: theme.spacing(2, 0)
  }
}))

const Post = () => {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();
  const [loading, setIsLoading] = useState(true);
  const [initialValues, setInitialValues] = useState(null)
  const [comments, setComments] = useState(null)
  const [showComments, setShowComments] = useState(false)
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null);

  const blankFormComment = {
    body: ''
  }

  useEffect(() => {
    const loadInitialFormData = async () => {
      if (params.id) {
        const initialData = await getPost(params.id)
        setInitialValues(initialData.data)
        setComments(await getComments(params.id))
      }
    };
    setIsLoading(false);

    loadInitialFormData();
  }, [])

  const handleComment = () => {
    setShowComments((prevShow) => !prevShow)
  }

  const onSubmit = (values) => {
    console.log(values)
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

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleDelete = async (id) => {
    await deletePost(id)
    history.goBack()
  }

  return (
    <>
      <Container maxWidth="lg">
        <Grid container spacing={1}>
          <Grid md={12} item className={classes.iconContainer}>
            <Link to="/">
              <Typography variant="button" gutterBottom>Back</Typography>
            </Link>
          </Grid>
          <Grid item md={8}>
            <div className={classes.post} >
              {initialValues && !loading ? (
                <Paper variant="outlined" >
                  <div className={classes.flex}>
                    <Typography color="primary" variant="body1">{initialValues.title}</Typography>
                    <IconButton size="small"
                      ref={anchorRef}
                      aria-controls={open ? 'menu-list-grow' : undefined}
                      aria-haspopup="true"
                      onClick={handleToggle}>
                      <MoreHoriz />
                    </IconButton>
                  </div>
                  <Popper open={open} anchorEl={anchorRef.current} placement="bottom-end" role={undefined} transition disablePortal>
                    {({ TransitionProps }) => (
                      <Grow
                        {...TransitionProps}
                        style={{ width: 250 }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                              <MenuItem onClick={() => history.push(`/update/${initialValues.id}`)}>Edit Post</MenuItem>
                              <MenuItem onClick={() => handleDelete(initialValues.id)}>Delete Post</MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                  <Typography variant="caption" gutterBottom>{initialValues.body}</Typography>
                  <div className={classes.commentContainer}>
                    {comments ? (
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography gutterBottom color="primary" onClick={handleComment} variant="body2">{comments.data.length} comments</Typography>
                          {showComments ? (
                            <>
                              <Divider />
                              {comments.data.map((comment) => (
                                <div key={comment.id} className={classes.marginTop} >
                                  <Typography color="primary" variant="button">{comment.email}</Typography> {comment.body}
                                </div>
                              ))}
                              <Form
                                onSubmit={onSubmit}
                                initialValues={blankFormComment}
                                render={({ handleSubmit, submitting }) => (
                                  <form noValidate onSubmit={handleSubmit}>
                                    <TextField
                                      name="body"
                                      variant="outlined"
                                      label=""
                                      size="small"
                                      fullWidth
                                      placeholder="Write a comment"
                                      disabled={submitting}
                                    />
                                    <Button color="primary" onClick={handleSubmit} variant="contained">Post a comment</Button>
                                  </form>
                                )}
                              />
                            </>
                          ) : (
                              ''
                            )}
                        </Grid>
                        <Grid item xs={12}>

                        </Grid>
                      </Grid>
                    ) : (
                        ''
                      )}
                  </div>
                </Paper>
              ) : (
                  'Loading...'
                )}
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Post;