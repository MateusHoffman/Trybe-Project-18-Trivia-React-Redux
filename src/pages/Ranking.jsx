import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  resetScoreboard as resetScoreboardAction,
} from '../redux/actions';// (Editar o caminho);
import './Ranking.css'

class Ranking extends React.Component {
  state = {
    storage: [],
  }

  componentDidMount = () => {
    this.setState({ storage: JSON.parse(localStorage.getItem('ranking')) });
  }

  handleGoHome = () => {
    const { history, resetScoreboard } = this.props;
    history.push('/');
    resetScoreboard(0);
  }

  render() {
    const { storage } = this.state;
    return (
      <section className='ranking'>
        <header className='header'>
          <div className='div-header'>
            <h2 data-testid="ranking-title">Ranking</h2>
            <button
              className='btn-next-question'
              style={{ height: '2rem' }}
              type="button"
              data-testid="btn-go-home"
              onClick={ this.handleGoHome }
            >
              Go Home
            </button>
          </div>
        </header>

        <div className='question-card'>
          <div className='div-question' style={{ padding: '2rem' }}>
            <ol className='ol-ranking'>
              {storage
                .sort((a, b) => b.score - a.score)
                .map(({ name, score, picture }, index) => (
                  <li key={ index }>
                    <img src={ picture } alt={ name } />
                    <p data-testid={ `player-name-${index}` }>{name}</p>
                    <p data-testid={ `player-score-${index}` }>{score}</p>
                  </li>
                ))}
            </ol>
          </div>
        </div>
      </section>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.object,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  resetScoreboard: (reset) => dispatch(resetScoreboardAction(reset)),
});

export default connect(null, mapDispatchToProps)(Ranking);
