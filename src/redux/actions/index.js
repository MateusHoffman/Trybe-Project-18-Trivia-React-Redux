import { fetchQuestions } from '../../services/requestAPI';

export const TIME_OVER = 'TIME_OVER';
export const TIME_INIT = 'TIME_INIT';

export const timerOverAction = (payload) => ({
  type: TIME_OVER,
  payload,
});

export const timerInitAction = (payload) => ({
  type: TIME_INIT,
  payload,
});

export const GET_API = 'GET_API';
export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_NAME = 'ADD_NAME';

export const triviaAction = (payload) => ({
  type: GET_API,
  payload,
});

export const triviaActionThunk = () => async (dispatch) => {
  const questions = await fetchQuestions();
  const randomNumber = 0.5;
  const newPayload = questions.results.map((item) => {
    const obj = {
      ...item,
      questionsArray: [...item.incorrect_answers, item.correct_answer]
        .sort(() => Math.random() - randomNumber),
    };
    return obj;
  });
  const newObj = {
    response_code: questions.response_code,
    results: newPayload,
  };
  dispatch(triviaAction(newObj));
};

export const addEmail = (email) => ({
  type: ADD_EMAIL,
  payload: {
    email, // (Usa o mesmo nome do state)
  },
});

export const addName = (name) => ({
  type: ADD_NAME,
  payload: {
    name, // (Usa o mesmo nome do state)
  },
});

export const ADD_SCORE = 'ADD_SCORE';
export const addScore = (score) => ({
  type: ADD_SCORE,
  payload: {
    score, // (Usa o mesmo nome do state)
  },
});

export const ADD_ASSERTIONS = 'ADD_ASSERTIONS';
export const addAssertions = (assertions) => ({
  type: ADD_ASSERTIONS,
  payload: {
    assertions, // (Usa o mesmo nome do state)
  },
});

export const RESET_SCOREBOARD = 'RESET_SCOREBOARD';
export const resetScoreboard = (reset) => ({
  type: RESET_SCOREBOARD,
  payload: {
    reset, // (Usa o mesmo nome do state)
  },
});
