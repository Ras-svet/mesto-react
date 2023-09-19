import React, { useEffect } from 'react';
import api from '../utils/api';
import Card from './Card';

function Main(props) {
	const [userName, setUserName] = React.useState('');
	const [userDescription, setUserDescription] = React.useState('');
	const [userAvatar, setUserAvatar] = React.useState('');
	const [cards, setCards] = React.useState([]);

	React.useEffect(() => {
		Promise.all([api.getUserInfo(), api.getCards()])
		.then(([userData, cards]) => {
			setUserAvatar(userData.avatar);
			setUserName(userData.name);
			setUserDescription(userData.about);
			setCards(cards)
		})
		.catch(err => {
			console.log(`Ошибка при отправке запроса ${err}`)
		})
	}, [])
	return (
		<main className="content">
			<section className="profile">
				<div className="profile__content">
					<div className="profile__avatar-edit" onClick={props.onEditAvatar}>
						<img className="profile__avatar" src={userAvatar} alt="аватар профиля" />
					</div>
					<div className="profile__info">
						<div className="profile__block">
							<h1 className="profile__name">{userName}</h1>
							<button type="button" onClick={props.onEditProfile} className="profile__edit-button" aria-label="кнопка редактирования профиля"></button>
						</div>
						<p className="profile__job">{userDescription}</p>
					</div>
				</div>
				<button type="button" onClick={props.onAddPlace} className="profile__add-button" aria-label="кнопка добавления контента"></button>
			</section>
			<section className="elements">
				{cards.map(card => {
					return (
						<Card
						key={card._id}
						link={card.link}
						name={card.name}
						likes={card.likes}
						onCardClick={props.onCardClick}
						/> 
					)
				})}
			</section>
		</main>
	)
}

export default Main;