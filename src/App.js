import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore, { history } from './configureStore';
import Home from './components/Home';
import Post from './components/Post';
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Route exact path="/" component={Home}/>
            <Route exact path="/subreddit/:subreddit_id/comments/:id" component={Post}/>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
