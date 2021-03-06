import React from 'react';
import { withRouter } from 'react-router-dom';
import * as auth from '../utils/auth.js';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.props.handleHeaderLink('sign-up', 'Регистрация')
  }



  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(e){
    e.preventDefault();
    // здесь нужно будет добавить логин
    if (!this.state.email || !this.state.password){
      return;
    }
    auth.authorize(this.state.email, this.state.password)
    .then((data) => {
      if (data.token) {
        
        this.setState({email: '', password: ''}, () => {
          this.props.handleLogin()
          
          this.props.history.push('/')
        })
      }
    })
    .catch(err => console.log(err));
  }
  render(){
    return(
      <form className="auth" onSubmit={this.handleSubmit}>
        <h2 className="auth__heading">Вход</h2>

        <input type="email" placeholder="Email" className="auth__input" name="email" onChange={this.handleChange} id="email" value={this.state.email} autoComplete="off" />
        <input type="password" placeholder="Пароль" className="auth__input" name="password" onChange={this.handleChange} id="password" value={this.state.password} />
        <button className="auth__button" id="submitButton" type="submit">Войти</button>

      </form>
    )
  }
}

export default withRouter(Login);
