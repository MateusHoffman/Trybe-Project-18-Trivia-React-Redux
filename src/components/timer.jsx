import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { timerOverAction } from '../redux/actions';
// componente timer,
// faz contagem regressiva, e ao chegar em 0 altera o estado global timerOver para true
class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      seconds: 30,
    };
  }

  // ao carregar na pagina incia contagem regressiva
  componentDidMount() {
    const ONE_SECOND = 1000;
    this.timerID = setInterval(() => {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    }, ONE_SECOND);
  }

  // a cada update, verifica se a contagem regressiva chegou em 0
  componentDidUpdate(_prevProps, prevState) {
    const { timeOver } = this.props;
    const TIME_LIMIT = 1;

    timeOver({
      timerOver: false,
      seconds: prevState.seconds,
    });

    if (prevState.seconds === TIME_LIMIT) {
      // caso a contagem esteja em 0, chama uma action para atualizar o estado global de timeOver para true
      clearInterval(this.timerID);
      timeOver({
        timerOver: true,
        seconds: 0,
      });
      // e para o contador
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    const { seconds } = this.state;
    return (
      <div data-testid="countSeconds">{seconds}</div>
    );
  }
}

Timer.propTypes = {
  timeOver: PropTypes.bool,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  timeOver: (payload) => dispatch(timerOverAction(payload)),
});
export default connect(null, mapDispatchToProps)(Timer);
// export default Timer;
