import { push } from 'react-router-redux'
import { matchPath } from 'react-router'
import * as RX from 'rxjs';

export function homeEpic( { getState }, match) {
  
  const { selectedReddit }  = getState();
  return push(`/subreddit/${selectedReddit}`);
}

// export function homeEpic(...args) {
//   console.log(args)
// }

export function epicWithMatch(match, epic) {
  return function(...args) {
    return epic(...args, match);
  }
}

const EPIC_FOR_ROUTE = {
  '/': homeEpic ,
  // '/subreddit/:subreddit_id/': subRedditSaga,
  // '/subreddit/:subreddit_id/posts/:id': postSaga
};

function epicForRoute(location) {
  let match;
  for (const path in EPIC_FOR_ROUTE) {
    match = matchPath(location, {
      path,
      exact: true,
      strict: false
    })

    if (match) {
      return epicWithMatch(match, EPIC_FOR_ROUTE[path]);
    } else {
      return () => {
        return {
          type: 'NOOP'
        }
      }
    }
  }

  return null;
}


const navigationEpic = (action$, ...args) => {
  return action$.ofType("@@router/LOCATION_CHANGE")
    .map(action => {
      const location = action.payload;
      const epic = epicForRoute(location.pathname)
      if (epic) {
        return epic(...args)
      }
    })

}

export default navigationEpic;
