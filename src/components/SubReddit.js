import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectReddit, invalidateReddit } from '../actions/';
import Picker from './Picker';
import Posts from './Posts';
import { push } from 'react-router-redux'
// handleRefreshClick(e) {
//   e.preventDefault();
//
//   const { dispatch, selectedReddit } = this.props;
//   dispatch(invalidateReddit(selectedReddit));
//   dispatch(fetchPostsIfNeeded(selectedReddit));
// }
const SubReddit = (props) => {
  const { selectedReddit, posts, isFetching, lastUpdated } = props;

  const handleChange = (nextReddit) => {
    props.push(`/subreddit/${nextReddit}`);
  }

  return (
    <div>
      <Picker value={selectedReddit}
              onChange={ handleChange }
              options={['reactjs', 'elixir', 'emberjs']} />
      <p>
        {lastUpdated &&
          <span>
            Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
            {' '}
          </span>
        }
        {!isFetching &&
          <a href='#'
             onClick={this.handleRefreshClick}>
            Refresh
          </a>
        }
      </p>
      {isFetching && posts.length === 0 &&
        <h2>Loading...</h2>
      }
      {!isFetching && posts.length === 0 &&
        <h2>Empty.</h2>
      }
      {posts.length > 0 &&
        <div style={{ opacity: isFetching ? 0.5 : 1 }}>
          <Posts posts={posts} />
        </div>
      }
    </div>
  );
}

SubReddit.propTypes = {
  selectedReddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  push: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { selectedReddit, postsByReddit } = state;
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByReddit[selectedReddit] || {
    isFetching: true,
    items: []
  };

  return {
    selectedReddit,
    posts,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps, { push })(SubReddit);
