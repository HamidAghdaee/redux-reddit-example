import fetch from 'isomorphic-fetch';
import {
  SELECT_REDDIT, INVALIDATE_REDDIT,
  REQUEST_POSTS, RECEIVE_POSTS
} from '../constants/';

export function selectReddit(reddit) {
  return {
    type: SELECT_REDDIT,
    reddit
  };
}

export function invalidateReddit(reddit) {
  return {
    type: INVALIDATE_REDDIT,
    reddit
  };
}

function requestPosts(reddit) {
  return {
    type: REQUEST_POSTS,
    reddit
  };
}

function receivePosts(reddit, json) {
  return {
    type: RECEIVE_POSTS,
    reddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}

export function fetchPosts(reddit) {
  return dispatch => {
    dispatch(requestPosts(reddit));
    console.log(fetch === global.fetch)
    return fetch(`http://www.reddit.com/r/${reddit}.json`)
      .then(req => {
        console.log(req)
        return req.json()
      })
      .then(json => dispatch(receivePosts(reddit, json)));
  }
}

function shouldFetchPosts(state, reddit) {
  const posts = state.postsByReddit[reddit];
  if (!posts) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate;
  }
}

export function fetchPostsIfNeeded(reddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), reddit)) {
      return dispatch(fetchPosts(reddit));
    }
  };
}
