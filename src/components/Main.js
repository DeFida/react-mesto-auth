import React from 'react';

import editBtnImg from '../images/profile__edit.svg';
import addBtnImg from '../images/profile__add-button-img.svg';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import Card from './Card'

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);


  return (
    <main className="main">
      <section className="profile">
        <div onClick={props.onEditAvatar} className="profile__photo-wrapper">
          <img src={currentUser.avatar} alt="" className="profile__photo" />
          <div className="profile__photo-overlay"></div>
        </div>
        <div className="profile__info">
          <div className="profile__name-btn-wrapper">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button onClick={props.onEditProfile} className="profile__edit-button" type="button"><img src={editBtnImg}
              alt="Изменить" className="profile__edit-button-img" /></button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button onClick={props.onAddPlace} className="profile__add-button" type="button">
          <img src={addBtnImg} className="profile__add-button-img" alt="Добавить" />
        </button>
      </section>

      <section className="elements">
        {props.cards.map((item) => <Card onCardClick={props.onCardClick} key={item._id} card={item} onCardLike={props.onLike} onDelete={props.onDelete} />)}
      </section>
    </main>
  );


}

export default Main;
