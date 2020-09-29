import React from 'react';
import { hot } from 'react-hot-loader';
// import {useMediaQuery} from 'react-responsive';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Article from './components/Article';
import Home from './components/Home';
import Posts from './components/Posts';
import Section from './components/Section';
import Post from './components/Post';

const App = ({ posts }) => {
  return (
    <BrowserRouter>
      <Navbar />
      <Article>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/posts/:section/:post" component={Post} />
          <Route path="/posts/:section">
            <Section posts={posts} />
          </Route>
          <Route path="/posts">
            <Posts posts={posts} />
          </Route>
        </Switch>
      </Article>
    </BrowserRouter>
  );
};

export default hot(module)(App);
