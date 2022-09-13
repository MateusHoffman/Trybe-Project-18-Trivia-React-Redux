import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { triviaActionThunk } from '../redux/actions';
import QuestionCard from '../components/QuestionCard';
import Header from '../components/Header';
import './Game.css'
// return version
class Game extends React.Component {
  componentDidMount() {
    const { triviaQuestions } = this.props;
    triviaQuestions();
  }

  render() {
    return (
      <main className='game'>
        <Header propGame={ this.props } />
        <QuestionCard propGame={ this.props } />
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  triviaQuestions: () => (
    dispatch(triviaActionThunk())
  ),
});

Game.propTypes = {
  triviaQuestions: PropTypes.array,
}.isRequired;

export default connect(null, mapDispatchToProps)(Game);
