import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import Login from './Login'
import Register from './Register'
import AddPlacePopup from './AddPlacePopup'
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from './ImagePopup.js'
import ProtectedRoute from "./ProtectedRoute";

import api from '../utils/api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false)
    const [currentUser, setCurrentUser] = React.useState({})
    const [loggedIn, setLoggedIn] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState({})
    const [cards, setCards] = React.useState([]);
    const [email, setEmail] = React.useState('');
    const [link, setLink] = React.useState('/sign-in');
    const [linkText, setLinkText] = React.useState('Войти');
    const [linkActive, setLinkActive] = React.useState(false);

    React.useEffect(() => {
        if (localStorage.getItem('jwt')) {
            auth.checkToken(localStorage.getItem('jwt')).then((data) => {
                setEmail(data.data.email);
                api.getUserInfo()
                .then((res) => {
                    setCurrentUser(res);
                    handleLogin();
                    
                })
                .catch(err => console.log(err))
            })
        }
        
        else {
            setLoggedIn(false);
        }
        
    }, [])

    React.useEffect(() => {
            api.getInitialCards()
            .then((res) => {
                setCards(res);
            })
            .catch(err => console.log(err))
        
    }, [])

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
            // Обновляем стейт
            setCards(newCards);
        });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id).then((newCard) => {
            const newCards = cards.filter((c) => {
                return c._id !== card._id
            });
            setCards(newCards);
        })
    }

    function handleCardClick(card) {
        setSelectedCard(card);
        setIsImagePopupOpen(true);
        document.addEventListener('keydown', handleEscClose);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsImagePopupOpen(false);
        setSelectedCard({});
        document.removeEventListener('keydown', handleEscClose);
    }

    function handleOverlayClick(evt) {
        if (evt.target.classList.contains('popup_opened')) {
            closeAllPopups();
        }
    }

    function handleEscClose(evt) {
        if (evt.key === 'Escape') {
            closeAllPopups();
        }
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
        document.addEventListener('keydown', handleEscClose);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
        document.addEventListener('keydown', handleEscClose);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
        document.addEventListener('keydown', handleEscClose);
    }

    function handleUpdateUser(params) {
        api.setProfile(params.name, params.about)
            .then((res) => {
                setCurrentUser(res);
            })
    }

    function handleUpdateAvatar(params) {
        api.setAvatar(params.avatar)
            .then((res) => {
                setCurrentUser(res);
            })
    }

    function handleAddPlace(params) {
        api.createCard(params.name, params.link)
            .then((newCard) => {
                setCards([newCard, ...cards])
            })
    }
    function handleHeaderLink(link, linkText) {
        setLink(link);
        setLinkText(linkText);
        setLinkActive(false);

    }
    function handleLogin(){
        setLoggedIn(true);
        setLinkText('Выйти');
        setLink('/logout')
    }

    return (
        <div className="page">
            
            <CurrentUserContext.Provider value={currentUser}>

            <Header link={link} linkText={linkText} email={email} linkActive={linkActive} />
            <Switch>
                
                <Route exact path="/sign-in">
                    <Login handleLogin={handleLogin} handleHeaderLink={handleHeaderLink} />
                </Route>

                <Route exact path="/sign-up">
                    <Register handleHeaderLink={handleHeaderLink} />
                </Route>
                
                <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main} cards={cards} onDelete={handleCardDelete} onLike={handleCardLike}
                        onCardClick={handleCardClick} onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}/>
                <Footer />
                
            </Switch>
            <Route>
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
            <AddPlacePopup onAddPlace={handleAddPlace} isOpen={isAddPlacePopupOpen} onClickOverlay={handleOverlayClick} onClose={closeAllPopups} />

            <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClickOverlay={handleOverlayClick} onClose={closeAllPopups} />

            <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onClickOverlay={handleOverlayClick} />


            <ImagePopup onClickOverlay={handleOverlayClick} isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups} />
            </CurrentUserContext.Provider>
        </div >
    );
}

export default App;
