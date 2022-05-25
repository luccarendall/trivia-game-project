import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getQuestions from '../fetch/getQuestions';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      counter: 0,
      questionsArray: [],
      isLoading: true,
      zerocinco: 0.5,
    };
  }

  componentDidMount() {
    this.getQuestionsOnLoad();
  }

  getQuestionsOnLoad = async () => {
    // pega token lo localstorage
    const localStorageToken = localStorage.getItem('token');
    // faz o fetch de 5 perguntas
    const returnedQuestions = await getQuestions(localStorageToken);
    console.log(returnedQuestions.results);
    // verifica se o token é valido e desloga se nâo for.
    const tree = 3;
    if (returnedQuestions.response_code === tree) {
      localStorage.storage.removeItem('token');
      const { history } = this.props;
      history.push('/');
    } else {
      // aloca array de perguntas no estado:
      this.setState({
        questionsArray: returnedQuestions.results,
        isLoading: false,
      });
    }
  }

  render() {
    const { name, score, picture } = JSON.parse(localStorage.getItem('ranking'));
    const { questionsArray, counter, isLoading, zerocinco } = this.state;
    const answers = [];
    // answers.sort((a, b) => b > a);
    // const { category } = questionsArray[0];

    return (
      <section>
        <header>
          <h1>Game</h1>
          <img
            src={ picture }
            alt="Avatar do jogador"
            data-testid="header-profile-picture"
          />
          <div data-testid="header-player-name">{ name }</div>
          <div data-testid="header-score">{ score }</div>
        </header>

        {/* exibe a categoria da pergunta */}
        { isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <p data-testid="question-category">
              { questionsArray[counter].category }
            </p>
            <p data-testid="question-text">
              { questionsArray[counter].question }
            </p>
            <div data-testif="answer-options">
              {/* pega respostas erradas e coloca num array answers */}
              { questionsArray[counter].incorrect_answers.forEach((wrongAnswer) => {
                answers.push(wrongAnswer);
              })}
              {/* pega respostas certas e coloca num array answers */}
              {answers.push(questionsArray[counter].correct_answer)}
              {/* mistura as respostas de forma randomica */}
              { (answers[Math.floor(Math.random() * answers.length)])}
              { (answers.sort(() => Math.random() - zerocinco))
                .map((answer, index) => (
                  <button
                    key={ index }
                    type="button"
                    data-testid={ answer === questionsArray[counter].correct_answer
                      ? 'correct-answer' : `wrong-answer-${index}` }
                  >
                    { answer }
                  </button>))}
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default Game;

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

Game.defaultProps = {
  history: PropTypes.push,
};
