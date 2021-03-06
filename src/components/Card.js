import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from 'react';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;
  console.log(isOwn)
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `element__trash ${isOwn ? 'element__trash_visible' : 'element__trash_hidden'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ''}`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLike() {
    props.onCardLike(props.card);
  }
  function handleDelete() {
    props.onDelete(props.card)
  }
  return (
    <div className="element">
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDelete}></button>
      <img onClick={handleClick} src={props.card.link} alt="Картинка" className="element__image" />
      <div className="element__description">
        <p className="element__subtitle">{props.card.name}</p>
        <div className="element__like-wrapper">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLike}></button>
          <p className="element__like-counter">{(props.card.likes).length}</p>
        </div>

      </div>
    </div>
  );
}

export default Card;
