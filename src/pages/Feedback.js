import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends React.Component {
  feedbackMessage = (score) => {
    const checkNumber = 3;
    if (score < checkNumber) {
      return <h1 data-testid="feedback-text">Could be better...</h1>;
    }
    return <h1 data-testid="feedback-text">Well Done!</h1>;
  }

  render() {
    const { numberOfAssertions, score, assertions } = this.props;
    return (
      <section>
        <h1>Feedback</h1>
        <Header />
        { this.feedbackMessage(numberOfAssertions) }
        <div data-testid="feedback-total-score">{ score }</div>
        <div data-testid="feedback-total-question">{ assertions }</div>
        <Link to="/" data-testid="btn-play-again">Play Again</Link>
        <Link to="/ranking" data-testid="btn-ranking">Ranking</Link>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  numberOfAssertions: state.player.assertions,
  score: state.player.score,
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  numberOfAssertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
