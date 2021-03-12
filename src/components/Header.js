import logoImg from '../images/header__logo.svg';


function Header(props) {
  return (
    <header className="header">
      <img src={logoImg} alt="Место лого" className="header__logo" />
      <div className="header__link-email-wrapper">
        <p className="header__p">{props.email}</p>
        <button onClick={props.onClick} className={`header__link ${props.linkActive && 'header__link_active'}`}>{props.linkText}</button>
      </div>
    </header>
  );
}

export default Header;
