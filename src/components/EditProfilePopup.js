import React from 'react';
import PopupWithForm from './PopupWithForm.js'
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const [name, setName] = React.useState('')
    const [about, setAbout] = React.useState('')
    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser]);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleAboutChange(e) {
        setAbout(e.target.value)
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about
        });
    }

    return (
        <PopupWithForm onClickOverlay={props.onClickOverlay} onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} name="edit-card" title="Редактировать профиль" >
            <div className="popup__input-container">
                <input type="text" className="popup__input" id="name" name="name" required minLength="2" maxLength="40" onChange={handleNameChange} value={name || ''} />
                <p id="name-error" className="popup__input-error"></p>
            </div>

            <div className="popup__input-container">
                <input type="text" className="popup__input" id="about" name="about" required minLength="2" maxLength="200" onChange={handleAboutChange} value={about || ''} />
                <p id="about-error" className="popup__input-error"></p>
            </div>

            <button className="popup__save" type="submit" onClick={props.onClose}>Сохранить</button>
        </PopupWithForm>
    )

}

export default EditProfilePopup;