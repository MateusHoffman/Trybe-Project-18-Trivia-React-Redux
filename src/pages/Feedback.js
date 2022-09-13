import React from 'react';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
// import { createImageSrc } from '../services/requestAPI';
// const SCORE_3 = 3;
class Feedback extends React.Component {
  render() {
    // const { email, name, score } = this.props;
    return (
      <div>
        <Header propGame={ this.props } />
        <h1>Feedback</h1>
      </div>
    );
  }
}
// FeedBack.propTypes = {
//   email: PropTypes.string,
//   name: PropTypes.string,
//   score: PropTypes.number,
// }.isRequired;
// const mapStateToProps = (state) => ({
//   email: state.player.gravatarEmail,
//   score: state.player.score,
// });
export default Feedback;
