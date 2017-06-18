# Side effects in Redux
## What are side effects?

Redux is all about functional programming. In this context side effects are any function calls that mutate state that is accessibe outside the function.

Think of all the places where a complex app may need to do this: talking to a server, accessing local storage, recording analytics events, etc.

## Where do they belong in our redux application?
In the redux flow, some action is dispatched and the reducers respond to the action by calculating the next state based on the old state and the action.

Redux demands the use of pure functions in its reducers, therefore this is no place to put side effects.

Fortunately the middleware part of redux allows the interception of actions and performing of side-effects. This allows us to write code that has side effects inside.

These are where the side effects can live:

https://goshakkk.name/redux-side-effect-approaches/

Flow:
* Talk about redux sync and async flow. introduce to thunks and middleware

*  Talk about the app as it is.
*  Try to write tests for synchronous action creator. **I Do and we do**

*  Write test for the thunk. See how hard it is. **I Do and we do**

* Ok, now move the handling of the api call to a middleware on its own. **I do and we do** create a middleware that intercepts actions.

* **You do:** actually complete the api call middleware layer.

https://github.com/StephenGrider/BookListM
## redux Saga:
So far we have sagas for the subreddit path and home.
* I do/we do: add saga for handleRefreshClick + tests
* you do: add saga for the by post id route + tests
