import React from 'react';
import PopupWithForm from './PopupWithForm.js'



function EditAvatarPopup(props) {
    const urlRef = React.useRef(''); // записываем объект, возвращаемый хуком, в переменную

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: urlRef.current.value,
        });
        urlRef.current.value = '';
    }

    return (
        <PopupWithForm onClickOverlay={props.onClickOverlay} onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} name="avatar-edit" title="Обновить аватар" >
            <div className="popup__input-container">
                <input ref={urlRef} type="url" className="popup__input" id="avatarUrl" name="avatarUrl" placeholder="Ссылка на картинку" required />
                <p id="avatarUrl-error" className="popup__input-error"></p>
            </div>

            <button onClick={props.onClose} className="popup__save popup__confirm" type="submit">Сохранить</button>
        </PopupWithForm>
    )

}

export default EditAvatarPopup;