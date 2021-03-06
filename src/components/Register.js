import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as auth from '../utils/auth.js';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.props.handleHeaderLink('sign-in', 'Войти')
  }
  componentDidMount(){

  }
  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    auth.register(this.state.email, this.state.password).then((res) => {
        if(res.statusCode !== 400){
            this.props.history.push('/sign-in');
        }
    })
  }
  render(){
    return(
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

