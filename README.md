# Overview of Course:
Workshop Objectives
* Overview of Redux
* Redux Middleware
* Redux Thunk and Redux Promise Middleware
* Redux Sagas
* Redux Observables

# Redux
From Official Redux docs:

**Redux is a predictable state container for JavaScript apps.**

The whole state of your app is stored in an object tree inside a single store.
The only way to change the state tree is to emit an action, an object describing what happened.
To specify how the actions transform the state tree, you write pure reducers.

That's it!

```
import { createStore } from 'redux'

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */
function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(counter)

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.

store.subscribe(() =>
  console.log(store.getState())
)

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch({ type: 'INCREMENT' })
// 1
store.dispatch({ type: 'INCREMENT' })
// 2
store.dispatch({ type: 'DECREMENT' })
// 1

```

Instead of mutating the state directly, you specify the mutations you want to happen with plain objects called actions. Then you write a special function called a reducer to decide how every action transforms the entire application's state.

Synchronous Redux Flow:
![alt text](https://cdn-images-1.medium.com/max/1600/1*CBfav7WP_SuV_UV87N1_Og.png "Redux")


# Side effects in Redux
## What are side effects?

Redux is all about functional programming. In this context **side effects** are any function calls that mutate state that is accessible outside the function.

Think of all the places where a complex app may need to do this: talking to a server, accessing local storage, recording analytics events, etc.

## Where do they belong in our redux application?
In the redux flow, some action is dispatched and the reducers respond to the action by calculating the next state based on the old state and the action.

Redux demands the use of pure functions in its reducers, therefore this is no place to put side effects.

Fortunately the middleware part of redux allows the interception of actions and performing of side-effects. This allows us to write code that has side effects inside.


Asynch Redux Flow:
![alt text](https://cloud.githubusercontent.com/assets/54934/9560826/3de78528-4e2a-11e5-8399-946824aaaaf9.png "Redux")

During the rest of this course we will be exploring where the side effects can live in our Redux applications:

* Inside Action Creators. This is the case for the Redux-thunk library.

* Specialized middleware that handles particular types of Async actions for us, such as in redux-promise-middleware.

* Listen for actions in the middleware and respond accordingly. This is the approach taken by


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
