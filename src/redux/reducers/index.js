import { ADD_SCORE, ADD_LOGIN } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

const playerReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_LOGIN:
    return {
      ...prevState,
      player: {
        ...prevState.player,
        name: action.name,
        gravatarEmail: action.gravatarEmail,
      },
    };
  case ADD_SCORE:
    return {
      ...prevState,
      player: {
        ...prevState.player,
        score: action.score,
        assertions: action.assertions,
      },
    };
  default:
    return prevState;
  }
};
export default playerReducer;
