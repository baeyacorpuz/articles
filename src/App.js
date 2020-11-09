import { Container, Grid, Hidden, makeStyles } from '@material-ui/core';
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import './App.css';
import './assets/css/main.scss';
import Header from './components/header/header';
import Sidenav from './components/header/sidenav';
import RouteBlock from './routes/RouteBlock';

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(10),
  },
  toolbar: {
    [theme.breakpoints.up('sm')]: {
      height: 50
    },
    [theme.breakpoints.down('xs')]: {
      height: 50
    },
  }
}))


const App = () => {
  
  const classes = useStyles();
  return (
    <div className="">
      <Router>
        <div>
          <Header />
          <div className={classes.appBar}>
            <div className={classes.toolbar} />
            <Container maxWidth="lg">
              <Grid container spacing={1}>
                <Grid item md={8}>
                  <RouteBlock />
                </Grid>
                <Grid item md={4}>
                  <Hidden xsDown implementation="css">
                    <Sidenav />
                  </Hidden>
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
      </Router>
    </div >
  );
}

export default App;
