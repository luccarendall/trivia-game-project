import { ADD_SCORE } from '../actions';

const INITIAL_STATE = {
  score: 0,
};

const scoreReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_SCORE:
    return {
      ...prevState,
      score: action.score,
    };
  default:
    return prevState;
  }
};
export default scoreReducer;
