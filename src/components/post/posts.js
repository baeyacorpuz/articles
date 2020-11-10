/* eslint-disable react-hooks/exhaustive-deps */
import { Button, ClickAwayListener, Divider, Grid, Grow, IconButton, makeStyles, MenuItem, MenuList, Paper, Popper, Typography } from '@material-ui/core';
import { MoreHoriz } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import { TextField } from 'mui-rff';
import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'react-final-form';
import { useHistory, useParams } from 'react-router';
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
    marginBottom: theme.spacing(5)
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
  const [errorMsg, setErrorMsg] = useState(false)
  const anchorRef = useRef(null);

  const blankFormComment = {
    body: ''
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadInitialFormData = async () => {
      if (params.id) {
        const initialData = await getPost(params.id)
        if (initialData) {
          setInitialValues(initialData.data)
          setComments(await getComments(params.id))
        } else {
          setErrorMsg('Error fetching data')
        }
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
    const apiResponse = await(deletePost(id))
    if (apiResponse) {
      console.log(apiResponse)
    }
    history.goBack()
  }

  return (
    <>
      {!loading ? (
        <Grid container spacing={1}>
          <Grid item md={12}>
            <div className={classes.post} >
              {initialValues ? (
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
                              <MenuItem onClick={() => history.push(`/update/${initialValues.id}`)}>
                                <Typography variant="overline">Edit post</Typography>
                              </MenuItem>
                              <MenuItem onClick={() => handleDelete(initialValues)}>
                                <Typography variant="overline">Delete post</Typography>
                              </MenuItem>
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
                          ) : (null)}
                        </Grid>
                      </Grid>
                    ) : (
                        <Typography gutterBottom color="primary" onClick={handleComment} variant="body2">Add a comment</Typography>
                      )}
                  </div>
                </Paper>
              ) : (
                  errorMsg
                )}
            </div>
          </Grid>
        </Grid>
      ) : (
          <Skeleton height="20" />
        )}
    </>
  );
}

export default Post;