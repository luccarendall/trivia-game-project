import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import Game from '../Game'
import App from '../App'
import  userEvent  from '@testing-library/user-event'
import { screen} from '@testing-library/react'
import App from '../App';

    // let localStorage;

    // beforeEach(() => {
    //     localStore = {};
    //   });

    //   spyOn(window.localStorage, 'getItem').and.callFake(
    //       (Key) => key in localStore? , localStore[key] : null );
          
    //       spyOn(window.localStorage, 'setItem').and.callFake(
    //           (key, value) => (localStore[key] = value + ")
    //         );
    // spyOn(window.localStorage, 'clear').and.callFake(()
    //  => (localStore = {}));
    //     });
    
    describe('teste a tela de Game', () => {
 it('Crie um _header_ que deve conter as informações da pessoa jogadora' , async () => {
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
    
    const imageHeader = await screen.findByRole('img')
    expect(imageHeader).toBeInTheDocument()
    expect(imageHeader).toHaveAttribute('src', 'https://www.gravatar.com/avatar/9bca006fec1d4791e8df5107c52c0307')
    const userName = screen.getByText(name)
    expect(userName).toBeInTheDocument()
    const userEmail = screen.getByText(email)
    const initialScore = screen.getByText('0')
    expect(initialScore).toBeInTheDocument()

})
})
//  it('Testa se o botão settings leva a página settings', () => {
//     renderWithRouterAndRedux(<App />)
//      const buttonSettings = screen.getByRole('button' , { name: 'Settings'})
//      expect(buttonSettings).toBeInTheDocument()
   
    
//      userEvent.click(buttonSettings)

//      const settingsTitleHeader = screen.getByRole('heading', {name: 'Settings', level: 1})
//      expect(settingsTitleHeader).toBeInTheDocument()
//  })

