import * as actions from './index'
import * as constants from '../constants'

//https://medium.com/@ferrannp/unit-testing-with-jest-redux-async-actions-fetch-9054ca28cdcd

describe('async actions', () => {
  beforeEach(function() {
    window.fetch = jest.fn().mockImplementation(
      () => {
        console.log('yo')
        return Promise.resolve({
          json: () => { foo: 'bar'}
        })
      }
    );
  })
  it('test fetchPosts', () => {


    const reddit = "test";
    const fetchPostsThunk = actions.fetchPosts(reddit);
    const dispatch = jest.fn();

    fetchPostsThunk(dispatch);
    console.log(dispatch.mock.calls.length)
  })
})

describe('actions', () => {
  it('should create an action to select a subreddit', () => {
    const reddit = 'tests'
    const expectedAction = {
      type: constants.SELECT_REDDIT,
      reddit
    }
    expect(actions.selectReddit(reddit)).toEqual(expectedAction)
  })
})
