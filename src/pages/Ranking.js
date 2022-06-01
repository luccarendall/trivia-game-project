import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Ranking extends Component {
  onClick = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const rankingData = JSON.parse(localStorage.getItem('ranking'));
    return (
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>
        {rankingData.map((player, index) => (
          <div key={ index }>
            <p data-testid={ `player-name-${index}` }>
              {`Jogador: ${player.name}`}
            </p>
            <p data-testid={ `player-score-${index}` }>{`Pontos: ${player.score}`}</p>
            <img src={ player.picture } alt={ `Imagem do jogador ${player.name}` } />
          </div>))}
        <footer>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ this.onClick }
          >
            Início
          </button>
        </footer>
      </section>);
  }
}

export default Ranking;

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

Ranking.defaultProps = {
  history: PropTypes.push,
};
