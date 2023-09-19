import React from 'react';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
	const [selectedCard, setSelectedCard] = React.useState(null)
	
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

	function closeAllPopups() {
		setSelectedCard(null);
		setIsAddPlacePopupOpen(false);
		setIsEditAvatarPopupOpen(false);
		setIsEditProfilePopupOpen(false)
	}

	return (
		<div className="body">
			<div className="page">
				<Header />
				<Main 
				onEditProfile={handleEditProfileClick}
				onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
				onCardClick={handleCardClick}
				/>
				<Footer />
				<PopupWithForm 
				title="Редактировать профиль"
				name="profile"
				buttonText="Сохранить"
				isOpen={isEditProfilePopupOpen}
				onClose={closeAllPopups}
				>
					<input className="popup__field popup__field_type_name" name="name" type="text" minLength="2" maxLength="40" placeholder="Имя" required />
					<span className="popup__field-error" id="name-error"></span>
					<input className="popup__field popup__field_type_job" name="about" type="text" minLength="2" maxLength="200" placeholder="О себе" required />
					<span className="popup__field-error" id="about-error"></span>
				</PopupWithForm>
				<PopupWithForm
				title="Новое место"
				name="card"
				buttonText="Создать"
				isOpen={isAddPlacePopupOpen}
				onClose={closeAllPopups}
				>
					<input className="popup__field popup__field_type_title" name="nameCard" type="text" minLength="2" maxLength="30" placeholder="Название" required />
					<span className="popup__field-error" id="nameCard-error"></span>
					<input className="popup__field popup__field_type_src" name="link" type="url" placeholder="Ссылка на картинку" required />
					<span className="popup__field-error" id="link-error"></span>
				</PopupWithForm>
				<ImagePopup
				onClose={closeAllPopups}
				card={selectedCard}
				></ImagePopup>
				<PopupWithForm
				title="Вы уверены?"
				name="deletion"
				buttonText="Да"
				onClose={closeAllPopups}
				></PopupWithForm>
				<PopupWithForm
				title="Обновить аватар"
				name="avatar"
				buttonText="Сохранить"
				isOpen={isEditAvatarPopupOpen}
				onClose={closeAllPopups}
				>
					<input className="popup__field popup__field_type_src" name="avatar" type="url" placeholder="Ссылка на картинку" required />
					<span className="popup__field-error" id="avatar-error"></span>
				</PopupWithForm>
			</div>
		</div>
	)
}

export default App;