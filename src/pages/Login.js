import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getToken from '../fetch/getToken';

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
      const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
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
   const returnToken = await getToken();
   localStorage.setItem('token', `${returnToken}`);
   const { history } = this.props;
   history.push('/game');
 }

 render() {
   const { button } = this.state;
   return (
     <fieldset>
       <label htmlFor="userName">
         Username
         <input
           type="text"
           name="userName"
           data-testid="input-player-name"
           onChange={ this.onInputChange }
         />
       </label>

       <label htmlFor="email">
         Email
         <input
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
     </fieldset>);
 }
}

export default Login;

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

Login.defaultProps = {
  history: PropTypes.push,
};
