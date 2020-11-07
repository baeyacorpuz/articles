import React, { useEffect, useState } from 'react';
import { Avatar, Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { listNews } from '../../apis/news';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  sidenav: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: {
    [theme.breakpoints.up('sm')]: {
      height: 24
    },
    [theme.breakpoints.down('sm')]: {
      height: 24
    },
  },
  newsList: {
    '& .MuiPaper-outlined': {
      padding: 16,
      borderRadius: 16,
      border: 'transparent'
    }
  },
}))

const Sidenav = () => {
  const classes = useStyles();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const loadInitialData = async () => {
      setInitialData(await listNews())
    }

    loadInitialData();
  }, [])

  return (
    <>
      {initialData ? (
        <Grid container>
          <Grid item xs={12} className={classes.newsList}>
            <Paper variant="outlined">
              <Typography variant="overline" gutterBottom>News from TechCrunch</Typography>
              <Divider height={20} />
              <div className={classes.toolbar} />

              {initialData.data.articles !== undefined ? (
                initialData.data.articles.map((news, index) => (
                  <div key={index}>
                    <Typography variant="body1">{news.title}</Typography>
                    <Typography variant="overline" gutterBottom>{news.author}</Typography>
                  </div>
                ))
              ) : (
                  <Typography variant="caption" color="textSecondary">News will show here</Typography>
                )}
            </Paper>
          </Grid>
        </Grid>
      ) : (
          <Grid container>
            <Grid item xs={12}>
              <Skeleton height="20" />
              <Skeleton height="20" />
              <Skeleton height="20" />
            </Grid>
          </Grid>
        )
      }
    </>
  );
}

export default Sidenav;