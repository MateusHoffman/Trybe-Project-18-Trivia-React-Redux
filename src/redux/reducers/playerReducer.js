import {
  ADD_EMAIL, ADD_NAME, ADD_SCORE, ADD_ASSERTIONS, RESET_SCOREBOARD,
} from '../actions/index';// (Editar o caminho)
// import { createImageSrc } from '../../services/requestAPI';// (Editar o caminho)

const INITIAL_STATE = {
  name: '', // nome-da-pessoa,
  assertions: 0, // número-de-acertos,
  score: 0, // pontuação,
  gravatarEmail: '', // email-da-pessoa,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EMAIL:
    return {
      ...state,
      gravatarEmail: action.payload.email,

    };
  case ADD_NAME:
    return {
      ...state,
      name: action.payload.name,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: state.score + action.payload.score,
    };
  case ADD_ASSERTIONS:
    return {
      ...state,
      assertions: state.assertions + action.payload.assertions,
    };
  case RESET_SCOREBOARD:
    return {
      ...state,
      score: action.payload.reset,
      assertions: action.payload.reset,
    };
  default:
    return state;
  }
};

export default userReducer;
