import resSuccess from '../images/resSuccess.svg'
import resErr from '../images/resErr.svg'

function InfoToolTip(props) {
  return (
    <div className="popup popup_opened">
      <div className="popup__tool-tip" noValidate>
        <button className="popup__close popup__close_add-n-open" type="button" onClick={props.onClose}></button>
        <img src={props.res ? resSuccess : resErr} alt="res"/>
        <h2 className="popup__tool-tip-heading">{props.res ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
      </div>
    </div>
  );
}

export default InfoToolTip;
