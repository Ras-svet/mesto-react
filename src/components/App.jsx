import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeleteCardPopup from './ConfirmDeleteCardPopup';

function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
	const [isCardDeletePopupOpen, setIsCardDeletePopupOpen] = React.useState(false);
	const [selectedCard, setSelectedCard] = React.useState(null);
	const [currentUser, setCurrentUser] = React.useState({});
	const [cards, setCards] = React.useState([]);
	const [deletedCard, setDeletedCard] = React.useState(null)

	React.useEffect(() => {
		Promise.all([api.getUserInfo(), api.getCards()])
		.then(([userData, cards]) => {
			setCurrentUser(userData)
			setCards(cards)
		})
		.catch(err => {
			console.log(`Ошибка при отправке запроса ${err}`)
		})
	}, [])

	function handleEditProfileClick() {
		setIsEditProfilePopupOpen(true)
	}

	function handleAddPlaceClick() {
		setIsAddPlacePopupOpen(true)
	}

	function handleEditAvatarClick() {
		setIsEditAvatarPopupOpen(true)
	}

	function handleCardClick(selectedCard) {
		setSelectedCard(selectedCard)
	}

	function handleCardDeleteConfirm(card) {
		setDeletedCard(card);
		setIsCardDeletePopupOpen(true)
	}

	function closeAllPopups() {
		setSelectedCard(null);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsEditProfilePopupOpen(false);
		setIsCardDeletePopupOpen(false)
	}

	function handleCardLike(card) {
		const isLiked = card.likes.some(i => i._id === currentUser._id);

		if (!isLiked) {
			api.addLike(card._id)
			.then((newCard) => {
				setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
			})
			.catch(err => {
				console.log(`Ошибка при отправке запроса ${err}`)
			})
		} else {
			api.removeLike(card._id)
			.then((newCard) => {
				setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
			})
			.catch(err => {
				console.log(`Ошибка при отправке запроса ${err}`)
			})
		}
	}

	function handleCardDelete(card) {
		api.deleteCard(card._id)
		.then(() => {
			setCards((state) => state.filter((c) => c._id !== card._id));
			closeAllPopups()
		})
		.catch(err => {
			console.log(`Ошибка при отправке запроса ${err}`)
		})
	}

	function handleUpdateUser(data) {
		api.changeUserInfo(data)
		.then((newUserData) => {
			setCurrentUser(newUserData);
			closeAllPopups()
		})
		.catch(err => {
			console.log(`Ошибка при отправке запроса ${err}`)
		})
	}

	function handleUpdateAvatar(data) {
		api.changeAvatar(data)
		.then((newAvatar) => {
			setCurrentUser(newAvatar);
			closeAllPopups()
		})
		.catch(err => {
			console.log(`Ошибка при отправке запроса ${err}`)
		})
	}

	function handleAddPlaceSubmit(data) {
		api.addCard(data)
		.then((newCard) => {
			setCards([newCard, ...cards]);
			closeAllPopups()
		})
		.catch(err => {
			console.log(`Ошибка при отправке запроса ${err}`)
		})
	}

	return (
		<CurrentUserContext.Provider value={currentUser}>
			<div className="body">
				<div className="page">
					<Header />
					<Main
						onEditProfile={handleEditProfileClick}
						onAddPlace={handleAddPlaceClick}
						onEditAvatar={handleEditAvatarClick}
						onCardClick={handleCardClick}
						onCardLike={handleCardLike}
						cards={cards}
						onCardDelete={handleCardDeleteConfirm}
					/>
					<Footer />
					<EditProfilePopup 
						isOpen={isEditProfilePopupOpen} 
						onClose={closeAllPopups} 
						onUpdateUser={handleUpdateUser} 
					/>
					<AddPlacePopup 
						isOpen={isAddPlacePopupOpen} 
						onClose={closeAllPopups} 
						onAddPlace={handleAddPlaceSubmit} 
					/>
					<ImagePopup 
						onClose={closeAllPopups} 
						card={selectedCard} 
					/>
					<ConfirmDeleteCardPopup 
						isOpen={isCardDeletePopupOpen} 
						onClose={closeAllPopups} 
						isActive={true} 
						onCardDelete={handleCardDelete} 
						card={deletedCard} 
					/>
					<EditAvatarPopup 
						isOpen={isEditAvatarPopupOpen} 
						onClose={closeAllPopups} 
						onUpdateAvatar={handleUpdateAvatar} 
					/>
				</div>
			</div>
		</CurrentUserContext.Provider>
		
	)
}

export default App;