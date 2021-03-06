function ImagePopup(props) {
    let isOpen;
    props.isOpen ? isOpen = 'popup_opened' : isOpen = '';
    return (
        <div onClick={props.handleOverlayClick} className={`popup ${isOpen}`} id="popupImg">
            <div className="popup__img-container">
                <button className="popup__close " type="button" id="closeImgBtn" onClick={props.onClose}></button>
                <img src={props.card.link} alt="Картинка" className="popup__image" />
                <p className="popup__title">{props.card.name}</p>
            </div>
        </div>
    )
}

export default ImagePopup;