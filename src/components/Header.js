import logoImg from '../images/header__logo.svg';
import { Link } from 'react-router-dom';


function Header(props) {
  return (
    <header className="header">
      <img src={logoImg} alt="Место лого" className="header__logo" />
      <div className="header__link-email-wrapper">
        <p className="header__p {}">{props.email}</p>
        <Link to={props.link} className={`header__link ${props.linkActive && 'header__link_active'}`}>{props.linkText}</Link>
      </div>
    </header>
  );
}

export default Header;
