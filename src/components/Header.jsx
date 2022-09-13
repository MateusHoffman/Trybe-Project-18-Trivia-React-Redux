import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createImageSrc } from '../services/requestAPI';
import './Header.css'

const SCORE_3 = 3;
class Header extends Component {
  handleRanking = () => {
    const { propGame: { history } } = this.props;
    history.push('/ranking');
  }

  handlePlayAgain = () => {
    const { propGame: { history } } = this.props;
    history.push('/');
  }

  render() {
    const { name, email, score, assertions } = this.props;
    return (
      <header className='header'>
        <div className='div-header'>

          <div className='div-scoreboard'>
            <div>
              <span>Scoreboard: </span>
              <span data-testid="header-score">{score}</span>
            </div>

            <div>
              <span>Number of hits: </span>
              <span data-testid="feedback-total-question">{assertions}</span>
            </div>
          </div>

          <div className='div-button'>
            <div>
              <button
                type="button"
                data-testid="btn-ranking"
                onClick={ this.handleRanking }
                >
                Ranking
              </button>
              <button
                type="button"
                data-testid="btn-play-again"
                onClick={ this.handlePlayAgain }
                >
                Play Again
              </button>
            </div>

            <h3 data-testid="feedback-text">{SCORE_3 <= assertions ? 'Well Done!' : 'Could be better...' }</h3>
          </div>


          <div className='div-profile'>
            <img
              src={ createImageSrc(email) }
              alt="user"
              data-testid="header-profile-picture"
            />
            <div data-testid="header-player-name">{name ? name : 'Your name'}</div>
          </div>

          <p data-testid="feedback-total-score" style={{ visibility: 'hidden' }}>{score}</p>
        </div>
      </header>
    );
  }
}
Header.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
  assertions: PropTypes.number,
}.isRequired;
const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
  assertions: state.player.assertions,
});
export default connect(mapStateToProps)(Header);
