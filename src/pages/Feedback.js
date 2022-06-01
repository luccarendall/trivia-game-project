import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Feedback extends Component {
  render() {
    return (
      <>
        <h1 data-testid="feedback-text">Aqui está seu Feedback</h1>
        <Link to="/" data-testid="btn-play-again">Play Again</Link>

      </>
    );
  }
}

export default Feedback;

// Ao clicar no botão "Play Again", a pessoa deve ser redirecionada para a tela de início (login)
// O botão para "Play Again" deve possuir o atributo data-testid com o valor btn-play-again
