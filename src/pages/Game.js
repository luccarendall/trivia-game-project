import React, { Component } from 'react';

class Game extends Component {
  render() {
    const { name, score, picture } = JSON.parse(localStorage.getItem('ranking'));
    return (
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
    );
  }
}

export default Game;
