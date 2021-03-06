function PopupWithForm(props) {
  let isOpen;
  props.isOpen ? isOpen = 'popup_opened' : isOpen = '';
  return (
    <div onClick={props.onClickOverlay} className={`popup ${isOpen}`} id={`${props.name}Popup`}>
      <form className="popup__container" id={props.name} name={props.name} onSubmit={props.onSubmit} noValidate>
        <button className="popup__close popup__close_add-n-open" type="button" onClick={props.onClose}></button>
        <h2 className={`popup__heading popup__heading_${props.name}`}>{props.title}</h2>
        {props.children}
      </form>
    </div>
  );
}

export default PopupWithForm;
