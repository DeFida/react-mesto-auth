import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.props.handleHeaderLink('/sign-in', 'Войти')
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleSubmitRegister(this.state.email, this.state.password)
    this.props.history.push('/sign-in')
  }
  render() {
    return (
      <form className="auth" onSubmit={this.handleSubmit}>
        <h2 className="auth__heading">Регистрация</h2>

        <input type="email" placeholder="Email" className="auth__input" name="email" id="email" onChange={this.handleChange} value={this.state.email} autoComplete="off" />
        <input type="password" placeholder="Пароль" className="auth__input" name="password" id="password" onChange={this.handleChange} value={this.state.password} />
        <button className="auth__button" id="submitButton" type="submit" >Зарегистрироваться</button>
        <Link className="auth__under-text" to="/sign-in">Уже зарегистрированы? Войти</Link>
      </form>
    )
  }

}

export default withRouter(Register);

