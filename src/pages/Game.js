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
      classIncorrect: '',
      classCorrect: '',
      lockbutton: false,
      buttonClick: false,
    };
  }

  componentDidMount() {
    this.getQuestionsOnLoad();
  }

  answerChecker = ({ target }) => {
    // const option = target;
    // option.style.background = '#282c34';
    const { questionsArray, counter } = this.state;
    if (target.value === questionsArray[counter].correct_answer) {
      console.log('acertou');
    } else {
      console.log('erro');
      // target.className = 'red-border selected';
    }
    this.setState({
      classIncorrect: 'red-border',
      classCorrect: 'green-border',
      lockbutton: true,
    });
    if (counter < questionsArray.length - 1) {
      this.setState({
        buttonClick: true,
      });
    }
  }

  nextQuestion = () => {
    const { counter, questionsArray } = this.state;
    console.log(questionsArray);
    if (counter < questionsArray.length - 1) {
      // const selected = document.getElementsByClassName('selected');
      // selected.classList.remove('selected');
      const newCounter = counter + 1;
      console.log(newCounter);
      this.setState({
        buttonClick: false,
        counter: newCounter,
        lockbutton: false,
        classIncorrect: '',
        classCorrect: '',
      });
    } else {
      const newCounter = counter;
      this.setState({
        counter: newCounter,
        buttonClick: false,
        lockbutton: true,
      });
    }
  }

  getQuestionsOnLoad = async () => {
    // pega token lo localstorage
    const localStorageToken = localStorage.getItem('token');
    // faz o fetch de 5 perguntas
    const returnedQuestions = await getQuestions(localStorageToken);
    // verifica se o token é valido e desloga se nâo for.
    if (returnedQuestions.results.length < 1) {
      localStorage.removeItem('token');
      const { history } = this.props;
      return history.push('/');
    }
    // aloca array de perguntas no estado:
    this.setState({
      questionsArray: returnedQuestions.results,
      isLoading: false,
    });
  }

  createAnswersButton = () => {
    const { questionsArray,
      counter,
      classCorrect,
      classIncorrect,
      lockbutton } = this.state;
    const answers = [];
    /* pega respostas erradas e coloca num array answers */
    questionsArray[counter].incorrect_answers.forEach((wrongAnswer) => {
      answers.push(wrongAnswer);
    });
    /* pega respostas certas e coloca num array answers */
    answers.push(questionsArray[counter].correct_answer);
    // cria botoes e os aloca na const buttons
    const buttons = [];
    answers.map((answer, index) => (
      buttons.push(
        <button
          key={ index }
          type="button"
          // style={ answer === questionsArray[counter].correct_answer
          //   ? { styleCorrect } : { styleIncorrect } }
          className={ answer === questionsArray[counter].correct_answer
            ? classCorrect : classIncorrect }
          data-testid={ answer === questionsArray[counter].correct_answer
            ? 'correct-answer' : `wrong-answer-${index}` }
          disabled={ lockbutton }
          onClick={ this.answerChecker }
          value={ answer }
        >
          { answer }
        </button>,
      )));
    const zerocinco = 0.5;
    return (buttons.sort(() => Math.random() - zerocinco))
      .map((answer) => answer);
  };

  render() {
    const playerData = JSON.parse(localStorage.getItem('ranking'));
    const { name, score, picture } = playerData[playerData.length - 1];
    const { questionsArray, counter, isLoading, buttonClick } = this.state;

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
            <div data-testid="answer-options">
              {this.createAnswersButton() }
            </div>
            { buttonClick
            && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.nextQuestion }
              >
                next
              </button>)}
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
