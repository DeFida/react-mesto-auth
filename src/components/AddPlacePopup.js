import React from "react";
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props) {
    const nameRef = React.useRef('');
    const urlRef = React.useRef('');

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: nameRef.current.value,
            link: urlRef.current.value
        });
        nameRef.current.value = '';
        urlRef.current.value = '';
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} onClickOverlay={props.onClickOverlay} onClose={props.onClose} isOpen={props.isOpen} name="add-card" title="Новое место">
            <div className="popup__input-container">
                <input ref={nameRef} type="text" className="popup__input popup__input_add-card" id="cardName" name="cardName" placeholder="Название" required />
                <p id="cardName-error" className="popup__input-error"></p>
            </div>
            <div className="popup__input-container">
                <input ref={urlRef} type="url" className="popup__input popup__input_add-card" id="cardLink" name="cardLink" placeholder="Ссылка на картинку" required />
                <p id="cardLink-error" className="popup__input-error"></p>
            </div>
            <button className="popup__save popup__save_add-card" type="submit" onClick={props.onClose}>Создать</button>
        </PopupWithForm>
    )
}

export default AddPlacePopup;