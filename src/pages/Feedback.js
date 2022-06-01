import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
    const { numberOfAssertions } = this.props;
    return (
      <section>
        <h1>Feedback</h1>
        <Header />
        { this.feedbackMessage(numberOfAssertions) }
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  numberOfAssertions: state.player.assertions,
});

Feedback.propTypes = {
  numberOfAssertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Feedback);
