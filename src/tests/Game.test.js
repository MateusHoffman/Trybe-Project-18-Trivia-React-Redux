import React from 'react'
import {screen, waitFor} from '@testing-library/react'
import Game from '../pages/Game';
import App from '../App'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux.js'
import {INITIAL_STATE_GAME, API_MOCK} from './helpers/InitialStateMock';
import userEvent from '@testing-library/user-event'

describe('Testes de cobertura total', () => {

  test('1', async () => {
    localStorage.setItem('token','504150afd88547f64f5c595c0e031215a4e1400cbbc6376670dba45711b4b9d7')
    const spyOn =  jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(API_MOCK),
    }); 
    const { history } = renderWithRouterAndRedux(<Game />)
    await (waitFor(() =>expect(spyOn).toHaveBeenCalled()));

    const btnCorrectAnswer = screen.getByTestId('correct-answer'); 
    userEvent.click(btnCorrectAnswer)
    const btnNextQuestion = screen.getByTestId('btn-next')
    userEvent.click(btnNextQuestion)

    const btnCorrectAnswer2 = screen.getByTestId('correct-answer'); 
    userEvent.click(btnCorrectAnswer2)
    const btnNextQuestion2 = screen.getByTestId('btn-next')
    userEvent.click(btnNextQuestion2)

    const btnCorrectAnswer3 = screen.getByTestId('correct-answer'); 
    userEvent.click(btnCorrectAnswer3)
    const btnNextQuestion3 = screen.getByTestId('btn-next')
    userEvent.click(btnNextQuestion3)

    const btnCorrectAnswer4 = screen.getByTestId('correct-answer'); 
    userEvent.click(btnCorrectAnswer4)
    const btnNextQuestion4 = screen.getByTestId('btn-next')
    userEvent.click(btnNextQuestion4)

    const btnCorrectAnswer5 = screen.getByTestId('wrong-answer-2'); 
    userEvent.click(btnCorrectAnswer5)
    const btnNextQuestion5 = screen.getByTestId('btn-next')
    userEvent.click(btnNextQuestion5)
    
    const btnNextQuestion6 = screen.queryByTestId('btn-next')
    expect(btnNextQuestion6).toBeFalsy()
  })

  test('Se o timer esta no documento', async () => {
    localStorage.setItem('token','504150afd88547f64f5c595c0e031215a4e1400cbbc6376670dba45711b4b9d7')
    const spyOn =  jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(API_MOCK),
    }); 
    const { history } = renderWithRouterAndRedux(<Game />, {
      initialState:  INITIAL_STATE_GAME,
    })
    await (waitFor(() =>expect(spyOn).toHaveBeenCalled()));
    await (screen.findByTestId('timer'));
  })
  test('Se as resposta estão habilitadas assim que a página é renderizada', async () => {
    localStorage.setItem('token','504150afd88547f64f5c595c0e031215a4e1400cbbc6376670dba45711b4b9d7')
    const spyOn =  jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(API_MOCK),
    }); 
    const { history } = renderWithRouterAndRedux(<Game />, {
      initialState:  INITIAL_STATE_GAME,
    })
    await (waitFor(() =>expect(spyOn).toHaveBeenCalled()));
    await (screen.findByTestId('timer'));
    const answerButton = await screen.findByTestId('correct-answer'); 
    expect(answerButton).toBeInTheDocument();
    expect(answerButton).not.toBeDisabled();
  })
  test('Se a APi é chamada', async () => {
    localStorage.setItem('token','504150afd88547f64f5c595c0e031215a4e1400cbbc6376670dba45711b4b9d7')
    const spyOn =  jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(API_MOCK),
    }); 
    renderWithRouterAndRedux(<Game />, {
      initialState:  INITIAL_STATE_GAME,
    })
    // await (screen.findByTestId('timer'));
    // const answerButton = await screen.findByTestId('correct-answer'); 
    // await (waitFor(() => expect(answerButton).toBeDisabled(),{timeout:31000}));
    await (waitFor(() =>expect(spyOn).toHaveBeenCalled()));
  })
  test('Se ao clicar na resposta, o botao next aparece', async () => {
    localStorage.setItem('token','504150afd88547f64f5c595c0e031215a4e1400cbbc6376670dba45711b4b9d7')
    const spyOn =  jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(API_MOCK),
    }); 
    const { history } = renderWithRouterAndRedux(<Game />, {
      initialState:  INITIAL_STATE_GAME,
    })
    // await (screen.findByTestId('timer'));
    // const answerButton = await screen.findByTestId('correct-answer'); 
    // await (waitFor(() => expect(answerButton).toBeDisabled(),{timeout:31000}));
    await (waitFor(() =>expect(spyOn).toHaveBeenCalled()));
    const correctButton = screen.getByRole('button', {
      name: /false/i
    })
    const incorrectButton = screen.getByRole('button', {
      name: /true/i
    })
    userEvent.click(correctButton)
    const nextButton = screen.getByRole('button', {
      name: /next/i
    })
    const score = screen.getByTestId('header-score');
    expect(correctButton).toHaveAttribute('style',"border: 3px solid rgb(6, 240, 15); border-style: solid;")
    expect(incorrectButton).toHaveAttribute('style',"border: 3px solid red; border-style: solid;")
    expect(nextButton).toBeInTheDocument();
    expect(score).toHaveTextContent('40')
    userEvent.click(nextButton)
    await new Promise((r) => setTimeout(r, 2000));   
    const gravitonButton = screen.getByRole('button', {
      name: /graviton/i
    })
    userEvent.click(gravitonButton)
    expect(score).toHaveTextContent('140');
    const timer = screen.getByTestId('timer');
    expect(timer).toHaveTextContent('29');
    const scoreboard = screen.getByTestId('feedback-total-score');
    const assertions = screen.getByTestId('feedback-total-question');
    expect(scoreboard).toHaveTextContent('140')
    expect(assertions).toHaveTextContent('2')
    userEvent.click(nextButton)
    expect(nextButton).toHaveAttribute('type','button')
    userEvent.click(nextButton)
    // expect(nextButton).toHaveAttribute('onclick','this.handleGoFeedback')
    userEvent.click(nextButton)
    history.push('/feedback')
    await waitFor(()=> { expect(history.location.pathname).toBe('/feedback') })
    
  })

  test('funcionalidade de acertos', async () => {
    localStorage.setItem('token','504150afd88547f64f5c595c0e031215a4e1400cbbc6376670dba45711b4b9d7')
    // localStorage.setItem('ranking', '[{"name":"testRanking","score":195,"picture":"https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e"}]' )
    const spyOn =  jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(API_MOCK),
    }); 
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
    await (waitFor(() =>expect(spyOn).toHaveBeenCalled()));
    const correctButton = screen.getByRole('button', { name: /false/i })
    const incorrectButton = screen.getByRole('button', { name: /true/i })
    const totalScore = screen.getByTestId('feedback-total-score')
    const question = screen.getByTestId('feedback-total-question')
    expect(correctButton).toBeInTheDocument()
    expect(incorrectButton).toBeInTheDocument()
    expect(totalScore).toBeInTheDocument()
    expect(question).toBeInTheDocument()
    expect(totalScore).toHaveTextContent('0')
    expect(question).toHaveTextContent('0')
    const correctButtonStyle = screen.getByRole('button', { name: /false/i }).style
    // const incorrectButtonStyle = screen.getByRole('button', { name: /true/i }).style
    expect(correctButtonStyle).toHaveProperty('border-style', 'hidden')
    // expect(incorrectButtonStyle).not.toBeVisible()
    await new Promise((r) => setTimeout(r, 2000)); 
    expect(screen.getByTestId('countSeconds')).toHaveTextContent('28')
    userEvent.click(correctButton)
    expect(correctButtonStyle).not.toHaveProperty('border-style', 'hidden')
    expect(correctButton).toHaveAttribute('style',"border: 3px solid rgb(6, 240, 15); border-style: solid;")
    expect(totalScore).toHaveTextContent('39')
    expect(question).toHaveTextContent('1')
    const nextButton = screen.getByTestId('btn-next')
    expect(nextButton).toBeInTheDocument()
    expect(nextButton).toHaveAttribute('type','button')
    userEvent.click(nextButton)
    expect(screen.getByTestId('countSeconds')).toHaveTextContent('30')
    const feedbackText = screen.getByTestId('feedback-text')
    expect(feedbackText).toBeInTheDocument()
    expect(feedbackText).toHaveTextContent('Could be better...')
    const correctButton2 = screen.getByRole('button', { name: /graviton/i })
    userEvent.click(correctButton2)
    userEvent.click(nextButton)
    const correctButton3 = screen.getByRole('button', {name: /Video Card/i})
    userEvent.click(correctButton3)
    expect(feedbackText).toHaveTextContent('Well Done!')
    userEvent.click(nextButton)
    const correctButton4 = screen.getByRole('button', {name: /Scar-20\/G3SG1/i}) 
    userEvent.click(correctButton4)
    userEvent.click(nextButton)
    const correctButton5 = screen.getByRole('button', {name: /Junji Ito/i}) 
    userEvent.click(correctButton5)
    userEvent.click(nextButton)
    // expect(nextButton).not.toBeInTheDocument()
    expect(history.location.pathname).toBe('/game');
  })

  jest.setTimeout(35000)
  test('Se o timer desabilita os botões ao final de 30 segundos', async () => {
    localStorage.setItem('token','504150afd88547f64f5c595c0e031215a4e1400cbbc6376670dba45711b4b9d7')
    const spyOn =  jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(API_MOCK),
    }); 
    renderWithRouterAndRedux(<Game />, {
      initialState:  INITIAL_STATE_GAME,
    })
    const timer = await screen.findByTestId('timer'); 
    expect(timer).toHaveTextContent('30')
    await new Promise((r) => setTimeout(r, 25000)); 
    expect(timer).toHaveTextContent('5')
    await new Promise((r) => setTimeout(r, 6000));
    await (waitFor(() =>expect(spyOn).toHaveBeenCalled()));
    const trueButton = screen.getByRole('button', {
      name: /true/i
    })
    expect(trueButton).toBeDisabled();
    const nextButton = screen.getByRole('button', {
      name: /next/i
    })
    userEvent.click(nextButton)
    const gravitonButton = screen.getByRole('button', {
      name: /graviton/i
    })
    expect(gravitonButton).not.toBeDisabled();       
    expect(timer).toHaveTextContent('0')
  })

});