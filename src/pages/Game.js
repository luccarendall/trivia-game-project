import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getQuestions from '../fetch/getQuestions';
import Timer from '../components/timer';
import { addScoreAction } from '../redux/actions';
import Header from '../components/Header';

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
      next: false,
      score: 0,
      assertations: 0,
    };
  }

  componentDidMount() {
    this.getQuestionsOnLoad();
  }

  timeOut = () => {
    this.setState({
      lockbutton: true,
    });
  }

  timer = (timer) => {
    const { next } = this.state;
    if (next) {
      this.setState({
        timer,
      });
    }
  }

  gameScore = () => {
    const { questionsArray, counter } = this.state;
    const { scoreDispatch } = this.props;
    const HARD_VALUE = 3;
    const MEDIUM_VALUE = 2;
    const EASY_VALUE = 1;
    const DEFAULT_VALUE = 10;
    const trinta = 30;
    const xablau = trinta - counter;

    let difficultyValue = 0;
    if (questionsArray[counter].difficulty === 'hard') difficultyValue = HARD_VALUE;
    if (questionsArray[counter].difficulty === 'medium') difficultyValue = MEDIUM_VALUE;
    if (questionsArray[counter].difficulty === 'easy') difficultyValue = EASY_VALUE;
    // pegar a informação do timer que tá como counter no componente timer.
    const newScore = (DEFAULT_VALUE + (xablau * difficultyValue));
    console.log(questionsArray[counter].difficulty);

    this.setState((prevState) => ({
      score: (prevState.score + newScore),
      assertations: (prevState.assertations + 1),
    }), () => {
      const { score, assertations } = this.state;
      scoreDispatch(score, assertations);
    });
  }

  answerChecker = ({ target }) => {
    // const option = target;
    // option.style.background = '#282c34';
    const { questionsArray, counter } = this.state;
    if (target.value === questionsArray[counter].correct_answer) {
      // Esse if só acontece quando o usuário clica na opção correta. Dá pra chamar o gameScore dentro dele
      console.log('acertou');
      this.gameScore();
    } else {
      console.log('erro');
      // target.className = 'red-border selected';
    }
    this.setState({
      classIncorrect: 'red-border',
      classCorrect: 'green-border',
      lockbutton: true,
    });
    if (counter < questionsArray.length) {
      this.setState({
        buttonClick: true,
      });
    }
  }

  nextQuestion = () => {
    const { counter, questionsArray } = this.state;
    // console.log(questionsArray);
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
      // const { score } = this.state;
      const { history } = this.props;
      // Pega o score salvo no estado e passar para o localStorage
      // localStorage.setItem('score', JSON.stringify(score));
      history.push('/feedback');
    }
  }

  getQuestionsOnLoad = async () => {
    // pega token lo localstorage
    const localStorageToken = localStorage.getItem('token');
    // faz o fetch de 5 perguntas
    const returnedQuestions = await getQuestions(localStorageToken);
    // verifica se o token é valido e desloga se nâo for..
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
          id="answerButton"
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
    const { questionsArray, counter, isLoading, buttonClick, next, timer } = this.state;

    return (
      <section>
        <Header />
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
        <div>
          { next ? <p>{ timer }</p>
            : (
              <Timer
                timeOut={ this.timeOut }
                timer={ this.timer }
                stop={ buttonClick }
                next={ next }
              />
            )}
        </div>
      </section>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  scoreDispatch: (score, assertations) => dispatch(addScoreAction(score, assertations)),
});

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  scoreDispatch: PropTypes.func.isRequired,
};

Game.defaultProps = {
  history: PropTypes.push,
};

export default connect(null, mapDispatchToProps)(Game);
