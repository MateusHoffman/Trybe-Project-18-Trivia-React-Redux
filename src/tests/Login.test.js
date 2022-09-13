import App from '../App'
import React from 'react'
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {API_MOCK} from './helpers/InitialStateMock';

describe('Testes Pagina Login', () => {
    it('Verifica se a pagina possui um input com o data-testid "input-player-name"', () => {
        renderWithRouterAndRedux(<App/>)
        const inputName = screen.getByTestId('input-player-name')
        expect(inputName).toBeInTheDocument()
    })

    it('Verifica se a pagina possui um input com o data-testid "input-gravatar-email"', () => {
        renderWithRouterAndRedux(<App/>)
        const inputEmail = screen.getByTestId('input-gravatar-email')
        expect(inputEmail).toBeInTheDocument()
    })

    it('Verifica se a pagina possui um button com type submit e data-testid "btn-play"', () => {
        renderWithRouterAndRedux(<App/>)
        const buttonPlay = screen.getByTestId('btn-play')
        expect(buttonPlay).toBeInTheDocument()
        expect(buttonPlay).toHaveAttribute('type', 'submit')
    })

    it('Verifica se o botão inicia desabilitado', ()=> {
        renderWithRouterAndRedux(<App/>)
        const buttonPlay = screen.getByTestId('btn-play')
        expect(buttonPlay).toHaveAttribute('disabled')
    })

    it('Testa se, ao digitar um nome e um email, o botão é habilitado', () => {
        renderWithRouterAndRedux(<App/>)
        const buttonPlay = screen.getByTestId('btn-play')
        const inputEmail = screen.getByTestId('input-gravatar-email')
        const inputName = screen.getByTestId('input-player-name')
        expect(buttonPlay).toHaveAttribute('disabled')
        userEvent.type(inputEmail, 'teste@trybe.com')
        userEvent.type(inputName, 'equipeTeste')
        expect(buttonPlay).not.toHaveAttribute('disabled')
    })

    it('Verifica se, ao digitar um nome e um email, e clicar no botão play, é redirecionado para pagina do jogo', async () => {
        const {history} = renderWithRouterAndRedux(<App/>)
        const buttonPlay = screen.getByRole('button', { name: /play/i })
        const inputEmail = screen.getByTestId('input-gravatar-email')
        const inputName = screen.getByTestId('input-player-name')
        expect(buttonPlay).toHaveAttribute('disabled')
        userEvent.type(inputEmail, 'teste@trybe.com')
        userEvent.type(inputName, 'equipeTeste')
        expect(buttonPlay).not.toHaveAttribute('disabled')
        expect(history.location.pathname).toBe('/')
        userEvent.click(buttonPlay)
        history.push('/game')
        await waitFor(()=> { expect(history.location.pathname).toBe('/game') })        
    })

    it('Verifica se o botão com data-testid "btn-settings" esta na tela', ()=> {
        renderWithRouterAndRedux(<App/>)
        const buttonSettings = screen.getByTestId('btn-settings')
        expect(buttonSettings).toBeInTheDocument();
    })

    it('Verifica se ao clicar no botão com data-testid "btn-settings" é redirecionado para /settings', async ()=> {
        const {history} = renderWithRouterAndRedux(<App/>)
        const buttonSettings = screen.getByTestId('btn-settings')
        expect(buttonSettings).toBeInTheDocument();
        expect(history.location.pathname).toBe('/')
        userEvent.click(buttonSettings)
        history.push('/settings')
        await waitFor(()=> {expect(history.location.pathname).toBe('/settings')})
    })

    it('Verifica se a api é chamada', async () => {
        localStorage.setItem('token','504150afd88547f64f5c595c0e031215a4e1400cbbc6376670dba45711b4b9d7')
        const spyOn =  jest.spyOn(global, 'fetch');
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue(API_MOCK),
        }); 
        const {history} = renderWithRouterAndRedux(<App/>)
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
    })

    it('verifica se ao receber um token invalido, retorna na pagina login', async () => {
        localStorage.setItem('token','504150afd88547f64f5c595c0e031215a4e1400cbbc6376670dba45711b4b9d7')
        const spyOn =  jest.spyOn(global, 'fetch');
        global.fetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({response_code: 0, results:[]}),
        }); 
        const {history} = renderWithRouterAndRedux(<App/>)
        const buttonPlay = screen.getByRole('button', { name: /play/i })
        const inputEmail = screen.getByTestId('input-gravatar-email')
        const inputName = screen.getByTestId('input-player-name')
        expect(buttonPlay).toHaveAttribute('disabled')
        userEvent.type(inputEmail, 'teste@trybe.com')
        userEvent.type(inputName, 'equipeTeste')
        expect(buttonPlay).not.toHaveAttribute('disabled')
        expect(history.location.pathname).toBe('/')
        userEvent.click(buttonPlay)
        await waitFor(()=> { expect(history.location.pathname).toBe('/') })
        await (waitFor(() =>expect(spyOn).toHaveBeenCalled()));
    })
})