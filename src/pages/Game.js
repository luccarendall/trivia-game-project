import React, { Component } from 'react';

class Game extends Component {
  render() {
    const { name, score, picture } = JSON.parse(localStorage.getItem('ranking'));
    return (
      <section>
        <header>
          <img
            src={ picture }
            alt="Avatar do jogador"
            data-testid="header-profile-picture"
          />
          <div data-testid="header-player-name">{ name }</div>
          <div data-testid="header-score">{ score }</div>
        </header>
      </section>
    );
  }
}

export default Game;
