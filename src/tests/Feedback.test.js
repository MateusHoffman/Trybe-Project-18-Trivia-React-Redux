import React from 'react'
import {screen, waitFor} from '@testing-library/react'
import Feedback from '../pages/Feedback';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux.js'
import { createMemoryHistory } from "history";
import {INITIAL_STATE_GAME, API_MOCK} from './helpers/InitialStateMock';
import userEvent from '@testing-library/user-event';

const player = {
  name: "teste",
  assertions: 2,
  score: 200,
  gravatarEmail: "teste@teste.com",
  url: "https://www.gravatar.com/avatar/ce11fce876c93ed5d2a72da660496473",
  };
  
  const player2 = {
  name: "teste",
  assertions: 4,
  score: 200,
  gravatarEmail: "teste@teste.com",
  url: "https://www.gravatar.com/avatar/ce11fce876c93ed5d2a72da660496473",
  }; 


const historyMock = createMemoryHistory();
describe('Testes da landging page feedback', () => {
  test('se aparece a mensagem, a pontuacao e os acertos', () => {
    renderWithRouterAndRedux(<Feedback history={historyMock}/>)
    const answers = screen.getByTestId("feedback-total-question");
    const improveMessege = screen.getByText('Could be better...');
    // const userScore = screen.getByTestId("feedback-total-score");
    // expect(userScore).toBeInTheDocument();
    expect(improveMessege).toBeInTheDocument();
    expect(answers).toBeInTheDocument();
  })

  test('Se o botao redireciona para a pagina inicial', async () => {
    localStorage.setItem('token','504150afd88547f64f5c595c0e031215a4e1400cbbc6376670dba45711b4b9d7')
    const spyOn =  jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue(API_MOCK), }); 
    const {history} = renderWithRouterAndRedux(<App />, { initialState:  INITIAL_STATE_GAME, })
    const buttonPlay = screen.getByRole('button', { name: /play/i })
    const inputEmail = screen.getByTestId('input-gravatar-email')
    const inputName = screen.getByTestId('input-player-name')
    expect(buttonPlay).toHaveAttribute('disabled')
    userEvent.type(inputEmail, 'teste@trybe.com')
    userEvent.type(inputName, 'equipeTeste')
    expect(buttonPlay).not.toHaveAttribute('disabled')
    expect(history.location.pathname).toBe('/')
    userEvent.click(buttonPlay)
    await waitFor(()=> { expect(history.location.pathname).toBe('/game') }) 
    const timer = await screen.findByTestId('timer'); 
    expect(timer).toHaveTextContent('30')
    const btnPlayAgain = screen.getByTestId('btn-play-again');
    userEvent.click(btnPlayAgain)
    // history.push('/
    userEvent.click(btnPlayAgain);
    expect(history.location.pathname).toBe('/');
  });

  test('Se o botao redireciona para a pagina ranking ', async () => {
    localStorage.setItem('token','504150afd88547f64f5c595c0e031215a4e1400cbbc6376670dba45711b4b9d7')
    localStorage.setItem('ranking', '[{"name":"testRanking","score":195,"picture":"https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e"},{"name":"newTest","score":250,"picture":"https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e"}]' )
    const spyOn =  jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue(API_MOCK), }); 
    const {history} = renderWithRouterAndRedux(<App />, { initialState:  INITIAL_STATE_GAME, })
    const buttonPlay = screen.getByRole('button', { name: /play/i })
    const inputEmail = screen.getByTestId('input-gravatar-email')
    const inputName = screen.getByTestId('input-player-name')
    expect(buttonPlay).toHaveAttribute('disabled')
    userEvent.type(inputEmail, 'teste@trybe.com')
    userEvent.type(inputName, 'equipeTeste')
    expect(buttonPlay).not.toHaveAttribute('disabled')
    expect(history.location.pathname).toBe('/')
    userEvent.click(buttonPlay)
    await waitFor(()=> { expect(history.location.pathname).toBe('/game') }) 
    const timer = await screen.findByTestId('timer'); 
    expect(timer).toHaveTextContent('30')
    const btnRanking = screen.getByTestId('btn-ranking');
    userEvent.click(btnRanking)
    // history.push('/')
    userEvent.click(btnRanking);
    expect(history.location.pathname).toBe('/ranking');
  })
  
  // test('Could be better...', () => {
  //   const player = {score: 0,}
  //   renderWithRouterAndRedux(<Feedback />, { player })
  //   const feedbackText = screen.getByTestId('feedback-text');
  //   expect(feedbackText.innerHTML).toBe('Could be better...');
  //   player.score = 50

  //   })
    
  //   test('Well Done!', () => {
  //   const player = {score: 50,}
  //   renderWithRouterAndRedux(<Feedback />, { player: player2 })
  //   const feedbackText = screen.getByTestId('feedback-text');
  //   expect(feedbackText.innerHTML).toBe('Well Done!');
  //   }) 
});