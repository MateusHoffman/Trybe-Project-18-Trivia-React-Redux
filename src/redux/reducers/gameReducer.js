import { TIME_OVER, GET_API, TIME_INIT } from '../actions';

const INITIAL_STATE = {
  timerOver: false,
  data: {
    responde_code: '',
    results: [],
    seconds: 30,
  },
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TIME_OVER:
    return {
      ...state,
      timerOver: action.payload.timerOver,
      seconds: action.payload.seconds,
    };
  case TIME_INIT:
    return {
      ...state,
      timerOver: action.payload,
    };
  case GET_API:
    return {
      ...state,
      data: action.payload,
    };
  default:
    return state;
  }
};

export default gameReducer;
