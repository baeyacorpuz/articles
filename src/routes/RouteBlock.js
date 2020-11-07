import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Dashboard from '../components/dashboard/dashboard';
import PostForm from '../components/post/postform';
import Post from '../components/post/posts';

const RouteBlock = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/posts/:id" component={Post} />
        <Route path="/add" component={PostForm} />
        <Route path="/update/:id" component={PostForm} />

      </Switch>
    </>
  );
}
 
export default RouteBlock;