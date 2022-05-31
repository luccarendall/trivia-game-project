import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import Game from '../pages/Game'
import App from '../App'
import  userEvent  from '@testing-library/user-event'
import { screen, waitFor } from '@testing-library/react'

//function para mockar o setTime out como visto na documentação: https://jestjs.io/docs/timer-mocks
// function timerGame(callback) {
//       setTimeout(() => {
//       callback && callback();
//     }, 1000);
//   }
  
    
    describe('teste a tela de Game tem 90% de cobertura de testes', () => {
        const questionTest = {
            "response_code":0,
            "results":[
               {
                  "category":"Entertainment: Video Games",
                  "type":"multiple",
                  "difficulty":"easy",
                  "question":"What is the first weapon you acquire in Half-Life?",
                  "correct_answer":"A crowbar",
                  "incorrect_answers":[
                     "A pistol",
                     "The H.E.V suit",
                     "Your fists"
                    ]
                }
            ]
        };
 it('Verifica a renderização da tela GAME ' , async () => {
    const { history } = renderWithRouterAndRedux(<App />);
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

})
it('Valida se o header contem as informações da pessoa jogadora' , async () => {
    renderWithRouterAndRedux(<Game />);
    const name = 'MainGroup21'    
    const imageHeader = screen.getByRole('img');
    expect(imageHeader).toBeDefined();
    expect(imageHeader).toHaveAttribute('alt', 'Avatar do jogador');
    expect(imageHeader).toBeInTheDocument()
    expect(imageHeader).toHaveAttribute('src', 'https://www.gravatar.com/avatar/9bca006fec1d4791e8df5107c52c0307')
    const userNameHeader = screen.getByText(name)
    expect(userNameHeader).toBeInTheDocument()
    const initialScore = screen.getByText('0')
    expect(initialScore).toBeInTheDocument()
})
it('Valida se a pergunta é carregada corretamente após o load.' , async () => {
     jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionTest),
    });

    const { history } = renderWithRouterAndRedux(<Game />);
    const Loading = screen.getByText(/Loading.../i);
    expect(Loading).toBeDefined();
    const questionCategory = await screen.findByTestId('question-category');
    expect(questionCategory).toBeInTheDocument();
    const questionText =  screen.getByTestId('question-text');
    expect(questionText).toBeInTheDocument()
    const question = screen.getByText(/What is the first weapon you acquire in Half-Life?/i);
    expect(question).toBeDefined();
    const answers = screen.getByTestId('answer-options');
    expect(answers).toBeDefined();
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(4);
})

it('Valida a pagina desloga ao receber indicação de token invalido/expirado.' , async () => {
    const invalidToken = {
        "response_code":3,
        "results":[]
     };

     jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(invalidToken),
    });

    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/game');
    const Loading = screen.getByText(/Loading.../i);
    expect(global.fetch).toHaveBeenCalled();
    const userEmail = await screen.findByRole('textbox' , { name: /email/i})
    expect(userEmail).toBeInTheDocument()
    const userName = screen.getByRole('textbox' , { name: /userName/i})
    expect(userName).toBeInTheDocument()
    const buttonPlay = screen.getByRole('button' , { name: 'Play'})
    expect(buttonPlay).toBeInTheDocument()
    expect(buttonPlay.disabled).toBe(true)
    expect(Loading).toBeDefined();
      const { pathname } = history.location;
    console.log(pathname);    
    expect(pathname).toBe('/');
})
it('Valida se é possivel clicar na resposta correta e e se o estilo muda ao clickar nela e se o botão next é exibido.' , async () => {
    const questionTest = {
        "response_code":0,
        "results":[
           {
              "category":"Entertainment: Video Games",
              "type":"multiple",
              "difficulty":"easy",
              "question":"What is the first weapon you acquire in Half-Life?",
              "correct_answer":"A crowbar",
              "incorrect_answers":[
                 "A pistol",
                 "The H.E.V suit",
                 "Your fists"
                ]
            },
            {
                "category":"Entertainment: Video Games",
                "type":"multiple",
                "difficulty":"easy",
                "question":"What is the first weapon you acquire in Half-Life?",
                "correct_answer":"A crowbar",
                "incorrect_answers":[
                   "A pistol",
                   "The H.E.V suit",
                   "Your fists"
                  ]
              }
        ]
    };
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionTest),
    });
    const { history } = renderWithRouterAndRedux(<Game />);
    const Loading = screen.getByText(/Loading.../i);
    expect(Loading).toBeDefined();
    const correctAnswer = await screen.findByText('A crowbar');
   expect(correctAnswer).toBeInTheDocument();
   const next = screen.queryByText('next');
   expect(next).not.toBeInTheDocument();
   userEvent.click(correctAnswer);
   expect(correctAnswer).toHaveAttribute('class' , 'green-border');
   const nextBtn = await screen.findByText('next');
   expect(nextBtn).toBeInTheDocument();
})

it('Valida se é possivel clicar na resposta incorreta e e se o estilo muda ao clickar nela e se o botão next é exibido.' , async () => {
    const questionTest = {
        "response_code":0,
        "results":[
           {
              "category":"Entertainment: Video Games",
              "type":"multiple",
              "difficulty":"easy",
              "question":"What is the first weapon you acquire in Half-Life?",
              "correct_answer":"A crowbar",
              "incorrect_answers":[
                 "A pistol",
                 "The H.E.V suit",
                 "Your fists"
                ]
            },
            {
                "category":"Programing",
                "type":"multiple",
                "difficulty":"easy",
                "question":"Who wrote this part of the test?",
                "correct_answer":"Joao",
                "incorrect_answers":[
                   "Thalys",
                   "Carlos",
                   "Lucca"
                  ]
              }
        ]
    };
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionTest),
    });
    const { history } = renderWithRouterAndRedux(<Game />);
    const Loading = screen.getByText(/Loading.../i);
    expect(Loading).toBeDefined();
    const incorrectAnswer = await screen.findByText('The H.E.V suit');
   expect(incorrectAnswer).toBeInTheDocument();
   const next = screen.queryByText('next');
   expect(next).not.toBeInTheDocument();
   userEvent.click(incorrectAnswer);
   expect(incorrectAnswer).toHaveAttribute('class' , 'red-border');
   const nextBtn = await screen.findByText('next');
   expect(nextBtn).toBeInTheDocument();
   userEvent.click(nextBtn);
   const newAnswer = await screen.findByText('Joao');
   expect(newAnswer).toBeInTheDocument();
})
it('Valida se o timer funciona corretamente' , async () => {
    const questionTest = {
        "response_code":0,
        "results":[
           {
              "category":"Entertainment: Video Games",
              "type":"multiple",
              "difficulty":"easy",
              "question":"What is the first weapon you acquire in Half-Life?",
              "correct_answer":"A crowbar",
              "incorrect_answers":[
                 "A pistol",
                 "The H.E.V suit",
                 "Your fists"
                ]
            },
            {
                "category":"Programing",
                "type":"multiple",
                "difficulty":"easy",
                "question":"Who wrote this part of the test?",
                "correct_answer":"Joao",
                "incorrect_answers":[
                    "Thalys",
                    "Carlos",
                    "Lucca"
                ]
            }
        ]
    };
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(questionTest),
    });
    // const callback = jest.fn();
    jest.useFakeTimers();
    const { history } = renderWithRouterAndRedux(<Game />);
    const timer30 = screen.getByText(/30/i);
    expect(timer30).toBeDefined();
    const Loading = screen.getByText(/Loading.../i);
    expect(Loading).toBeDefined();
    // timerGame(callback);
    const incorrectAnswer = await screen.findByText('The H.E.V suit');
    console.log(incorrectAnswer);
    expect(incorrectAnswer).toBeInTheDocument();
    expect(incorrectAnswer).not.toBeDisabled();
    // jest.advanceTimersByTime(300000);
    await waitFor(() => {
        jest.advanceTimersByTime(30000);
        const incorrectAnswer2 = screen.getByText('The H.E.V suit');
        expect(incorrectAnswer2).toBeDisabled();     
        const Zero = screen.getAllByText(/0/i);
        console.log(incorrectAnswer2);
        expect(Zero).toHaveLength(2);
    });
})
})