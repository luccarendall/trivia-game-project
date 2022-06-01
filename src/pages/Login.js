import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import getToken from '../fetch/getToken';
import { loginAction } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      userName: '',
      button: true,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { email, userName } = this.state;
      const mailformat = /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/;
      const floor = 2;
      if (email.match(mailformat)
      && userName.length >= floor) {
        this.setState({
          button: false,
        });
      } else {
        this.setState({
          button: true,
        });
      }
    });
  };

 onClick = async () => {
   const { userName, email } = this.state;
   const { loginDispatch } = this.props;
   const hash = md5(email).toString();
   const rankingLocalStorage = {
     name: userName,
     score: 0,
     picture: `https://www.gravatar.com/avatar/${hash}`,
   };
   const rankingData = JSON.parse(localStorage.getItem('ranking'));
   if (rankingData !== null) {
     localStorage
       .setItem('ranking', JSON.stringify([...rankingData, rankingLocalStorage]));
   } else {
     localStorage.setItem('ranking', JSON.stringify([rankingLocalStorage]));
   }

   const returnToken = await getToken();
   localStorage.setItem('token', `${returnToken}`);
   loginDispatch(userName, email);
   const { history } = this.props;
   history.push('/game');
 }

 goToSettings = () => {
   const { history } = this.props;
   history.push('/settings');
 }

 render() {
   const { button } = this.state;
   return (
     <fieldset>
       <label htmlFor="userName">
         Username
         <input
           id="userName"
           type="text"
           name="userName"
           data-testid="input-player-name"
           onChange={ this.onInputChange }
         />
       </label>

       <label htmlFor="email">
         Email
         <input
           id="email"
           name="email"
           type="email"
           data-testid="input-gravatar-email"
           onChange={ this.onInputChange }
         />
       </label>
       <button
         type="button"
         data-testid="btn-play"
         disabled={ button }
         onClick={ this.onClick }
       >
         Play
       </button>
       <button
         type="button"
         data-testid="btn-settings"
         onClick={ this.goToSettings }
       >
         Settings
       </button>
     </fieldset>);
 }
}

const mapDispatchToProps = (dispatch) => ({
  loginDispatch: (name, email) => dispatch(loginAction(name, email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  loginDispatch: PropTypes.func.isRequired,
};

Login.defaultProps = {
  history: PropTypes.push,
};

export default connect(null, mapDispatchToProps)(Login);
