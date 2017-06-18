import { select, call, put, takeEvery, takeLatest, cancelled } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { push } from 'react-router-redux'
import pathToRegexp from 'path-to-regexp'
import { matchPath } from 'react-router'
import { selectReddit, requestPosts, receivePosts } from '../actions/'

function makeApiCall(url) {
  return fetch(url)
  .then(req => req.json())
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

export function sagaWithMatch(match, saga) {
  return function() {
    return saga(match);
  }
}

export function* homeSaga(match) {
  const { selectedReddit }  = yield select();
  yield put(push(`/subreddit/${selectedReddit}`));
}

export function* postSaga(match) {
}

export function* subRedditSaga(match) {
  const { subreddit_id } = match.params;
  yield put(selectReddit(subreddit_id));

  const state = yield select();
  if (yield call(shouldFetchPosts, state,subreddit_id )){
    yield put(requestPosts(subreddit_id));
    const json = yield call(makeApiCall, `http://www.reddit.com/r/${subreddit_id}.json`)
    yield put(receivePosts(subreddit_id, json));
  }
}
const SAGA_FOR_ROUTE = {
  '/': homeSaga ,
  '/subreddit/:subreddit_id/': subRedditSaga,
  '/subreddit/:subreddit_id/posts/:id': postSaga
};

function sagaForRoute(location) {
  let match;
  for (const path in SAGA_FOR_ROUTE) {
    match = matchPath(location, {
      path,
      exact: true,
      strict: false
    })

    if (match) {
      return sagaWithMatch(match, SAGA_FOR_ROUTE[path]);
    }
  }

  return null;
}

function* navigationSaga(action) {
  const location = action.payload;
  const saga = sagaForRoute(location.pathname)
  if (saga) {
    yield call(saga);
  }
}

export default function* rootSaga() {
  yield [
    takeLatest("@@router/LOCATION_CHANGE", navigationSaga),
  ];
}
