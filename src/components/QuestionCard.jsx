import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import NextButton from './NextButton';
// import { Link } from 'react-router-dom';
import Timer from './timer';
import {
  timerInitAction,
  addScore as addScoreAction,
  addAssertions as addAssertionsAction,
} from '../redux/actions';// (Editar o caminho)
import { createImageSrc } from '../services/requestAPI';
import './QuestionCard.css'

const maxCount = 4;
class QuestionCard extends React.Component {
  state = {
    count: 0,
    borderAnswer: 'hidden',
    showButton: false,
  }

  handleCount = () => {
    const { timer } = this.props;
    const { count } = this.state;
    if (count === maxCount) {
      this.handleGoFeedback();
      this.setState({ showButton: false });
    }
    this.setState({
      count: count + 1,
      borderAnswer: 'hidden',
    });
    timer(false);
  }

  handleClickBtnAnswer = (e) => {
    const { addScore, gameSeconds, addAssertions } = this.props;
    const { borderAnswer: currentBorderState } = this.state;
    this.setState({
      borderAnswer: currentBorderState === 'hidden' && 'solid',
      showButton: true,
    });
    const strBorderRed = e.target.style.border.includes('red');
    const checkDifficult = e.target.getAttribute('difficult');
    const difficult = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    if (!strBorderRed) addAssertions(1);
    const initialTime = 30;
    const { seconds = initialTime } = gameSeconds;
    const pointsBase = 10;
    const answer = strBorderRed
      ? 0 : (pointsBase + (Number(seconds) * Number(difficult[checkDifficult])));
    addScore(answer);
  }

  handleGoFeedback = () => {
    const { name, score, gravatarEmail } = this.props;
    // propGame.history.push('/feedback');
    const playerScore = {
      name,
      score,
      picture: createImageSrc(gravatarEmail),
    };
    const getStorage = localStorage.getItem('ranking')
      ? JSON.parse(localStorage.getItem('ranking'))
      : '';
    const storage = [...getStorage, playerScore];
    localStorage.setItem('ranking', JSON.stringify(storage));
  }

  render() {
    const { dataProp, timerOver } = this.props;
    const { count, borderAnswer, showButton } = this.state;

    const btnNext = (
      <button
        className='btn-next-question'
        type="button"
        data-testid="btn-next"
        onClick={ this.handleCount }
      >
        Next
      </button>
    );
    return (
      <div className='question-card'>
        <div className='div-question'>
          { dataProp.map((item, index) => (
            count === index
              && (
                <div key={ index }>
                  <h2 data-testid="question-category">{item.category}</h2>
                  <p data-testid="question-text">{ item.question }</p>
                  <div data-testid="answer-options">
                    {
                      item.questionsArray
                        .map((answer, index2) => (
                          <button
                            key={ index2 }
                            disabled={ timerOver }
                            onClick={ this.handleClickBtnAnswer }
                            difficult={ item.difficulty }
                            type="button"
                            data-testid={
                              `${answer === item.correct_answer
                                ? 'correct-answer'
                                : `wrong-answer-${index2}`}`
                            }
                            style={ { border: `${answer === item.correct_answer
                              ? '3px solid rgb(6, 240, 15)' : '3px solid red'}`,
                            borderStyle: borderAnswer } }
                            >
                            {answer}
                          </button>))
                    }
                    <div data-testid="timer" style={{ display: 'none' }}><Timer /></div>
                  </div>
                  {
                    (timerOver || showButton)
                      ? btnNext
                      : null
                  }
                </div>
              )
          )) }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dataProp: state.game.data.results,
  timerOver: state.game.timerOver,
  gameSeconds: state.game,
  name: state.player.name,
  email: state.player.gravatarEmail,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  timer: (payload) => dispatch(timerInitAction(payload)),
  addScore: (score) => dispatch(addScoreAction(score)),
  addAssertions: (assertions) => dispatch(addAssertionsAction(assertions)),
});

QuestionCard.propTypes = {
  dataProp: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(QuestionCard);
