import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import Login from './Login'
import Register from './Register'
import AddPlacePopup from './AddPlacePopup'
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from './ImagePopup.js';
import InfoToolTip from './InfoToolTip.js';
import ProtectedRoute from "./ProtectedRoute";

import api from '../utils/api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
    const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false)
    const [isResponsePopupOpen, setIsResponsePopupOpen] = React.useState(false)
    const [responseStatus, setResponseStatus] = React.useState(false)
    const [currentUser, setCurrentUser] = React.useState({})
    const [email, setEmail] = React.useState('')
    const [loggedIn, setLoggedIn] = React.useState(false)
    const [selectedCard, setSelectedCard] = React.useState({})
    const [cards, setCards] = React.useState([]);
    const [link, setLink] = React.useState('/sign-in');
    const [linkText, setLinkText] = React.useState('Войти');
    const [linkActive, setLinkActive] = React.useState(false);

    const history = useHistory();

    React.useEffect(() => {
        if (localStorage.getItem('jwt')) {
            auth.checkToken(localStorage.getItem('jwt')).then((data) => {
                setEmail(data.data.email);
                handleLogin();
            })
                .catch(err => console.log(err))
        }
        else {
            setLoggedIn(false);
        }

    }, [email])

    React.useEffect(() => {
        api.getInitialCards()
            .then((res) => {
                setCards(res);
            })
            .catch(err => console.log(err))
    }, [])

    React.useEffect(() => {
        api.getUserInfo()
            .then((res) => {
                setCurrentUser(res);
                handleLogin();
                setIsResponsePopupOpen(false);
            })
            .catch(err => console.log(err))
    }, [])

    function handleSubmitLogin(email, password) {
        auth.authorize(email, password)
            .then((data) => {
                if (data.token) {
                    setEmail(email);
                    console.log(data.token);
                    localStorage.setItem('jwt', data.token);
                    handleLogin();
                    history.push('/')
                }
            })
            .catch(err => {
                console.log(err);
                setIsResponsePopupOpen(true);
                setResponseStatus(false);
            });
    }

    function handleSubmitRegister(email, password) {
        auth.register(email, password).then((res) => {
            if (res.statusCode !== 400) {
                setIsResponsePopupOpen(true);
                setResponseStatus(true);
                history.push('/sign-in')
                console.log('You are successfully registered, and being redirected to Login page.')
            }
        }).catch((res) => {
            console.log(res);
            setIsResponsePopupOpen(true);
            setResponseStatus(false);
        })
    }

    function handleLogin() {
        setLoggedIn(true);
        setLinkText('Выйти');
        setLink('/logout');
        setLinkActive(false);
    }

    function handleHeaderBtn() {
        if (loggedIn) {
            localStorage.removeItem('jwt');
            setLinkText('Регистрация')
            setLoggedIn(false);
            // history.push("/sign-in");
        }
        else if (link === '/sign-in') {
            history.push("/sign-in");
        }
        else {
            history.push("/sign-up");
        }
    }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
            // Обновляем стейт
            setCards(newCards);
        }).catch(err => console.log(err));
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id).then((newCard) => {
            const newCards = cards.filter((c) => {
                return c._id !== card._id
            });
            setCards(newCards);
        }).catch(err => console.log(err))
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
        setIsResponsePopupOpen(false)
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
            .catch(err => console.log(err))
    }

    function handleUpdateAvatar(params) {
        api.setAvatar(params.avatar)
            .then((res) => {
                res.email = currentUser.email;
                setCurrentUser(res);
            })
            .catch(err => console.log(err))
    }

    function handleAddPlace(params) {
        api.createCard(params.name, params.link)
            .then((newCard) => {
                setCards([newCard, ...cards])
            })
            .catch(err => console.log(err))
    }
    function handleHeaderLink(link, linkText) {
        setLink(link);
        setLinkText(linkText);
        setLinkActive(true);
    }

    return (
        <div className="page">

            <CurrentUserContext.Provider value={currentUser}>

                <Header onClick={handleHeaderBtn} link={link} linkText={linkText} email={loggedIn ? email : ''} linkActive={linkActive} />
                <Switch>

                    <Route exact path="/sign-in">
                        <Login handleHeaderLink={handleHeaderLink} handleSubmitLogin={handleSubmitLogin} />
                    </Route>

                    <Route exact path="/sign-up">
                        <Register handleHeaderLink={handleHeaderLink} handleSubmitRegister={handleSubmitRegister} />
                    </Route>

                    <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main} cards={cards} onDelete={handleCardDelete} onLike={handleCardLike}
                        onCardClick={handleCardClick} onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />
                    <Footer />

                </Switch>
                <Route>
                    {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
                </Route>
                <AddPlacePopup onAddPlace={handleAddPlace} isOpen={isAddPlacePopupOpen} onClickOverlay={handleOverlayClick} onClose={closeAllPopups} />

                <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClickOverlay={handleOverlayClick} onClose={closeAllPopups} />

                <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onClickOverlay={handleOverlayClick} />

                <ImagePopup onClickOverlay={handleOverlayClick} isOpen={isImagePopupOpen} card={selectedCard} onClose={closeAllPopups} />

                <InfoToolTip res={responseStatus} onClickOverlay={handleOverlayClick} isOpen={isResponsePopupOpen} onClose={closeAllPopups}></InfoToolTip>

            </CurrentUserContext.Provider>
        </div >
    );
}

export default App;
