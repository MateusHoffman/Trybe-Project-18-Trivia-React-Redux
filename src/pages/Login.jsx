import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchToken, fetchQuestions } from '../services/requestAPI';
import {
  addEmail as addEmailAction,
  addName as addNameAction,
} from '../redux/actions';// (Editar o caminho)
import './Login.css'

class Login extends React.Component {
  state = ({
    disabledBtn: true,
    nameInput: '',
    email: '',
  })

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
    const { nameInput, email } = this.state;
    if (nameInput && email) {
      this.setState({
        disabledBtn: false,
      });
    } else {
      this.setState({
        disabledBtn: true,
      });
    }
  }

  handleSubmit = async (e) => {
    const { history, addEmail, addName } = this.props;
    const { email, nameInput } = this.state;
    e.preventDefault();
    const { token } = await fetchToken();
    localStorage.setItem('token', token);
    const { results } = await fetchQuestions();
    if (!results.length) {
      history.push('/');
    } else {
      localStorage.setItem('token', token);
      addEmail(email);
      addName(nameInput);
      history.push('/game');
    }
  }

  handleSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const { disabledBtn, nameInput, email } = this.state;
    return (
      <section className='container'>
        <section className='screen'>
          <section className='screen__content'>
            <form className='login'>
              <div className='login__field'>
                <i className="login__icon fas fa-user"></i>
                <input
                  className='login__input'
                  placeholder="Write your name..."
                  type="text"
                  id="nameInput"
                  name="nameInput"
                  value={ nameInput }
                  data-testid="input-player-name"
                  onChange={ this.handleChange }
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  className='login__input'
                  placeholder="Write your email..."
                  type="email"
                  id="email"
                  name="email"
                  value={ email }
                  data-testid="input-gravatar-email"
                  onChange={ this.handleChange }
                />
              </div>
              <button className="button login__submit"
                type="submit"
                data-testid="btn-play"
                onClick={ this.handleSubmit }
                disabled={ disabledBtn }
              >
                <span className="button__text">Play</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>		
              {/* <label htmlFor="nameInput" className='login__field'>
                <i className="login__icon fas fa-user"></i>
                <input
                  className='login__input'
                  placeholder="Write your name..."
                  type="text"
                  id="nameInput"
                  name="nameInput"
                  value={ nameInput }
                  data-testid="input-player-name"
                  onChange={ this.handleChange }
                />
              </label> */}
              {/* <label htmlFor="email">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={ email }
                  data-testid="input-gravatar-email"
                  onChange={ this.handleChange }
                />
              </label> */}
              {/* <button
                type="submit"
                data-testid="btn-play"
                onClick={ this.handleSubmit }
                disabled={ disabledBtn }
              >
                Play
              </button> */}
              <button
                className="button login__submit"
                style={{ width: '50%', height: '2rem', fontSize: '0.7rem'}}
                type="button"
                data-testid="btn-settings"
                onClick={ this.handleSettings }
              >
                <span className="button__text">Settings</span>
              </button>
            </form>
                {/* <i className="button__icon fas fa-chevron-right"></i> */}
          </section>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>		
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </section>
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.string,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  addEmail: (email) => (
    dispatch(addEmailAction(email))),
  addName: (name) => (
    dispatch(addNameAction(name))),
});

export default connect(null, mapDispatchToProps)(Login);
