/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@material-ui/core';
import { Form } from 'react-final-form';
import { TextField } from 'mui-rff'
import { createPost, getPost, updatePost } from '../../apis/posts';
import { useHistory, useParams } from 'react-router';

const PostForm = (editMode) => {
  const params = useParams();
  const history = useHistory();
  const [loading, setIsLoading] = useState(true);
  const [initialValues, setInitialValues] = useState(null)
  const userId = 1

  const blankFormValues = {
    title: '',
    body: ''
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(false);
    const loadInitialFormData = async () => {
      if (params.id) {
        const initialData = await getPost(params.id)
        setInitialValues(initialData.data)
      } else {
        setInitialValues(blankFormValues)
      }
    };

    loadInitialFormData();
  }, [])

  const onSubmit = async (values) => {
    if (params.id) {
      values.userId = initialValues.userId;
      values.id = params.id;
      const apiResponse = await updatePost(params.id, values);
      if (apiResponse.status === 200) {
        alert('Success')
        history.push(`/posts/${apiResponse.data.id}`)
      }

    } else {
      values.userId = userId;
      const apiResponse = await createPost(values)
      console.log(apiResponse)
      if (apiResponse.status === 201) {
        alert('Post created!', apiResponse.data.id)
        history.push(`/`)
      }
    }
  }

  return (
    <>
      {initialValues && !loading ? (
        <Form
          onSubmit={onSubmit}
          initialValues={initialValues}
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Grid container spacing={1}>
                <Grid item md={12} xs={12}>
                  <TextField
                    label="Title"
                    name="title"
                    variant="outlined"
                    disabled={submitting}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    label="Description"
                    name="body"
                    variant="outlined"
                    multiline
                    rows={6}
                    disabled={submitting}
                  />
                </Grid>

                <Grid item md={12} xs={12}>
                  <Button color="primary" onClick={handleSubmit} variant="contained">
                    {params.id ? 'Update' : 'Save'}
                  </Button>
                  <Button color="primary" onClick={() => history.goBack()} variant="outlined">Cancel</Button>
                </Grid>
              </Grid>
            </form>
          )}
        >
        </Form>
      ) : (
          'Loading form ...'
        )}
    </>
  );
}

export default PostForm;