import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import App from '../App'
import  userEvent  from '@testing-library/user-event'
import { screen} from '@testing-library/react'
import { toBeRequired } from '@testing-library/jest-dom';

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
   const token = {
      "response_code":0,
      "response_message":"Token Generated Successfully!",
      "token":"f00cb469ce38726ee00a7c6836761b0a4fb808181a125dcde6d50a9f3c9127b6"
   };
   jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(token),
  });
  
   const { history } = renderWithRouterAndRedux(<App />)
   const userEmail = screen.getByRole('textbox' , { name: /email/i})
   expect(userEmail).toBeInTheDocument()
   const userName = screen.getByRole('textbox' , { name: /userName/i})
   expect(userName).toBeInTheDocument()
   const buttonPlay = screen.getByRole('button' , { name: 'Play'})
   expect(buttonPlay).toBeInTheDocument()
   expect(buttonPlay.disabled).toBe(true)
   const email = 'maingroup21@gmail.com'
   const name = 'MainGroup21'
   userEvent.type(userEmail, email)
   userEvent.type(userName, name)
   userEvent.click(buttonPlay)
   expect(buttonPlay.disabled).toBe(false)
   // const loading = await screen.findByText(/loading.../i)
   const { pathname } = history.location;
   console.log(pathname);
   expect(global.fetch).toBeCalledTimes(1)
   // expect(loading).toBeDefined()      
   //  const gameTitleHeader = await screen.findByRole('heading', {name: /Game/i , level: 1})
   //  expect(gameTitleHeader).toBeInTheDocument()
 })
 it('Testa se o botão settings leva a página settings', () => {
    renderWithRouterAndRedux(<App />)
     const buttonSettings = screen.getByRole('button' , { name: 'Settings'})
     expect(buttonSettings).toBeInTheDocument()
   
    
     userEvent.click(buttonSettings)

     const settingsTitleHeader = screen.getByRole('heading', {name: 'Settings', level: 1})
     expect(settingsTitleHeader).toBeInTheDocument()
 })
}
)
