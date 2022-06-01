import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 30,
      timer: null,
    };
  }

  // Essa função reinicia a isCounter a cada 1 segundo
  componentDidMount() {
    const oneSecond = 1000;
    const timer = setInterval(this.isCounter, oneSecond);
    this.setState({ timer });
  }

  // Essa limpa o contador quando o componente for desmontado
  componentWillUnmount() {
    const { timer } = this.state;
    clearInterval(timer);
  }

  // Contador propriamente dito. Conta de 30 até 0. Falta implementar uma lógica para desativar o botão de resposta após esse tempo
  isCounter = () => {
    const { counter } = this.state;
    const { timeOut, timer, stop, next } = this.props; // ideias de nomes para as funções/atributos. Alterar todos com pontos vermelhos

    if (counter > 0 && !stop) {
      this.setState((prevState) => ({
        counter: prevState.counter - 1,
      }), () => {
        timer(counter);
      });
    } else {
      timeOut();
    }

    if (!next && stop) {
      this.setState({
        counter: 30,
      });
    }
  }

  exportCounter = () => {
    const { counter } = this.state;
    return counter;
  }

  // Aqui um render para fazer o contador aparecer na tela. Depois a gente coloca um CSS e deixa bonitinho
  render() {
    const { counter } = this.state;
    return (
      <div>
        <p>{ counter }</p>
      </div>
    );
  }
}

Timer.propTypes = {
  timeOut: PropTypes.func,
}.isRequired;

export default Timer;

// O que será avaliado

// Será validado se é possível aguardar 5 segundos e responder a alternativa correta
// Será validado se ao aguardar mais de 30 segundos para responder, todos botões estão desabilitados
