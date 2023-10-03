import React from "react";
import PopupWithForm from "./PopupWithForm";

function ConfirmDeleteCardPopup(props) {
	function handleSubmit(evt) {
		evt.preventDefault();
		props.onCardDelete(props.card)
	}

	return (
		<PopupWithForm
			title="Вы уверены?"
			name="deletion"
			buttonText="Да"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onActive={props.onActive}
			onSubmit={handleSubmit}
		></PopupWithForm>
	)
}

export default ConfirmDeleteCardPopup