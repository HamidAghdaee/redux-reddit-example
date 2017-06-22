import { combineEpics } from 'redux-observable';
import navigationEpic from './navigation';

export default combineEpics(
  navigationEpic
);
