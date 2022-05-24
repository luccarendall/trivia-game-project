import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import App from '../App'
import  userEvent  from '@testing-library/user-event'
import { screen} from '@testing-library/react'

describe('teste a tela de login', () => {
 it('teste se o input de email está na tela', () => {
   renderWithRouterAndRedux(<App />)
   const userEmail = screen.getByRole('textbox' , { name: /email/i})
   expect(userEmail).toBeInTheDocument()
   
 })
 it('testa se o input de Name está na tela', () => {
    renderWithRouterAndRedux(<App />)
    const userName = screen.getByRole('textbox' , { name: /userName/i})
    expect(userName).toBeInTheDocument()
 })
 it('Testa se após a verificação de e-mail o botão ativa e ao ser clicado redireciona para a página do jogo' , async () => {
    renderWithRouterAndRedux(<App />)
    const userEmail = screen.getByRole('textbox' , { name: /email/i})
   expect(userEmail).toBeInTheDocument()
   const userName = screen.getByRole('textbox' , { name: /userName/i})
    expect(userName).toBeInTheDocument()
    const buttonPlay = screen.getByRole('button' , { name: 'Play'})
    expect(buttonPlay).toBeInTheDocument()
    const email = 'maingroup21@gmail.com'
    const name = 'MainGroup21'
    
    userEvent.type(userEmail, email)
    userEvent.type(userName, name)
    userEvent.click(buttonPlay)
    
    const gameTitleHeader = await screen.findByRole('heading', {name: /Game/i , level: 1})
    expect(gameTitleHeader).toBeInTheDocument()
 })
 it('Testa se o botão settings leva a página settings', () => {
    renderWithRouterAndRedux(<App />)
     const buttonSettings = screen.getByRole('button' , { name: 'Settings'})
     expect(buttonSettings).toBeInTheDocument()
   
    
     userEvent.click(buttonSettings)

     const settingsTitleHeader = screen.getByRole('heading', {name: 'Settings', level: 1})
     expect(settingsTitleHeader).toBeInTheDocument()
 })
})