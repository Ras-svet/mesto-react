import React from "react";

function Card(props) {
	function handleClick() {
		props.onCardClick(props)
	}

	return (
		<div className="element" onClick={handleClick}>
			<button type="button" className="element__trash" aria-label="кнопка для удаления карточки"></button>
			<img className="element__image" src={props.link} alt={props.name} />
			<div className="element__block">
				<h2 className="element__title">{props.name}</h2>
				<div className="element__like">
					<button type="button" className="element__like-button" aria-label="кнопка отметки нравится"></button>
					<span className="element__like-number">{props.likes.length}</span>
				</div>
			</div>
		</div>
	)
}

export default Card;