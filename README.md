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
