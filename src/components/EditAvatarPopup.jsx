import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
	const avatarRef = React.useRef();
	const [ linkError, setLinkError ] = React.useState('');
	const [ activeButton, setActiveButton ] = React.useState(true);

	function handleSubmit(evt) {
		evt.preventDefault();

		props.onUpdateAvatar({
			avatar: avatarRef.current.value
		})
	}

	function handleChangeLink(evt) {
		const linkRule = new RegExp('^http(?::\\/\\/|s:\\/\\/).*?\\.(?:gif|jpg|png)$', 'i')
		if (!linkRule.test(avatarRef.current.value)) {
			setLinkError('Неверный адрес изображения')
			if (!avatarRef.current.value) {
				setLinkError('Поле не может быть пустым')
			}
		} else {
			setLinkError('')
		}
	}

	React.useEffect(() => {
		if (linkError === '') {
			setActiveButton(true)
		} else {
			setActiveButton(false)
		}
	}, [linkError])

	React.useEffect(() => {
		setActiveButton(false);
		avatarRef.current.value='';
		setLinkError('')
	}, [props.isOpen])

	return (
		<PopupWithForm
			title="Обновить аватар"
			name="avatar"
			buttonText="Сохранить"
			isOpen={props.isOpen}
			onClose={props.onClose}
			onSubmit={handleSubmit}
			onActive={activeButton}
		>
			<input className="popup__field popup__field_type_src" name="avatar" type="url" ref={avatarRef} onChange={handleChangeLink} placeholder="Ссылка на картинку" required />
			<span className="popup__field-error" id="avatar-error">{linkError}</span>
		</PopupWithForm>
	)
}

export default EditAvatarPopup;