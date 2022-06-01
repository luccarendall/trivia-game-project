export const ADD_SCORE = 'ADD_SCORE';
export const ADD_LOGIN = 'ADD_LOGIN';

export const addScoreAction = (score, assertions) => ({
  type: ADD_SCORE,
  score,
  assertions,
});

export const loginAction = (name, gravatarEmail) => ({
  type: ADD_LOGIN,
  name,
  gravatarEmail,
});
