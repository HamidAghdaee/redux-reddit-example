import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store, { history } from './store';
import Home from './components/Home';
import Post from './components/Post';
import SubReddit from './components/SubReddit';
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Route exact path="/subreddit/:subreddit_id" component={SubReddit}/>
            <Route exact path="/subreddit/:subreddit_id/posts/:id" component={Post}/>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
