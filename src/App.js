import { makeStyles } from '@material-ui/core';
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import './App.css';
import './assets/css/main.scss';
import Header from './components/header/header';
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
    '& .MuiToolbar-root.MuiToolbar-regular': {
      [theme.breakpoints.up('sm')]: {
        padding: 0
      },
    }
  },
  toolbar: {
    [theme.breakpoints.up('sm')]: {
      height: 70
    },
    [theme.breakpoints.down('xs')]: {
      height: 70
    },
  }
}))


function App() {
  const classes = useStyles();
  return (
    <div className="">
      <Router>
        <div>
          <Header />
          <div className={classes.appBar}>
            <div className={classes.toolbar} />
            <div className="">
              <RouteBlock />
            </div>
          </div>
        </div>
      </Router>
    </div >
  );
}

export default App;
