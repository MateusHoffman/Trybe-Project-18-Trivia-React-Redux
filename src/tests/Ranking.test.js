import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import userEvent from '@testing-library/user-event';
import Ranking from '../pages/Ranking';

describe('Página de Ranking', () => {
  test('ordem dos colocados', () => {
    const ranking = JSON.stringify([{
      name: 'arthur',
      score: 350,
    },
    {
      name: 'arthurl',
      score: 500,
    }
  ])
    localStorage.setItem('ranking', ranking)
    renderWithRouterAndRedux(<Ranking />);
    expect(screen.getByTestId('player-name-0')).toHaveTextContent('arthurl')
    expect(screen.getByTestId('player-name-1')).toHaveTextContent('arthur')
  })

  test('Se o botao leva para o homepage', () => {
    const { history } = renderWithRouterAndRedux(<App />)
    history.push('/ranking')
    userEvent.click(screen.getByTestId('btn-go-home'));
    expect(history.location.pathname).toBe('/')
  })

})
