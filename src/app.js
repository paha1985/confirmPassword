import styles from './app.module.css';
import { useState, useRef } from 'react';

export const App = () => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [confirmPasswordError, setConfirmPasswordError] = useState('');
	const [loginError, setLoginError] = useState(null);

	const submitButtonRef = useRef(null);

	const onLoginChange = ({ target }) => {
		setLogin(target.value);

		let error = null;

		if (!/^[\w_]*$/.test(target.value)) {
			error =
				'Неверный логин. Допустимые символы - буквы, цифры и нижнее подчеркивание.';
		} else if (target.value.length > 20) {
			error = 'Неверный логин. Должно быть не более 20 символов.';
		}

		setLoginError(error);
	};

	const onPasswordChange = ({ target }) => {
		setPassword(target.value);

		let error = null;

		if (!/^[\w_]*$/.test(target.value)) {
			error =
				'Неверный пароль. Допустимые символы - буквы, цифры и нижнее подчеркивание.';
		} else if (target.value.length > 20) {
			error = 'Неверный пароль. Должно быть не более 20 символов.';
		}

		setPasswordError(error);

		if (confirmPassword === target.value) {
			submitButtonRef.current.focus();
		}
	};

	const onConfirmPasswordChange = ({ target }) => {
		setConfirmPassword(target.value);

		let error = null;

		if (!/^[\w_]*$/.test(target.value)) {
			error =
				'Неверный пароль. Допустимые символы - буквы, цифры и нижнее подчеркивание.';
		} else if (target.value.length > 20) {
			error = 'Неверный пароль. Должно быть не более 20 символов.';
		}

		setConfirmPasswordError(error);

		if (password === target.value) {
			submitButtonRef.current.focus();
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();
		let res = {};
		res.name = login;
		res.password = password;
		console.log(res);
	};

	const onLoginBlur = () => {
		if (login.length < 3) {
			setLoginError('Неверный логин. Должно быть не менее 3 символов.');
		}
	};

	const onPasswordBlur = () => {
		if (password.length < 3) {
			setPasswordError('Неверный пароль. Должно быть не менее 3 символов.');
		}
	};

	const onConfirmPasswordBlur = () => {
		if (confirmPassword.length < 3) {
			setConfirmPasswordError('Неверный пароль. Должно быть не менее 3 символов.');
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.logo}>Авторизация</div>
			<div className={styles.app}>
				<div className={styles.loginItem}>
					<form onSubmit={onSubmit}>
						<div className={styles.formField}>
							{loginError && (
								<div className={styles.wrongPassword}>{loginError}</div>
							)}
							<input
								className={styles.formInput}
								name="login"
								type="text"
								value={login}
								placeholder="Логин"
								onChange={onLoginChange}
								onBlur={onLoginBlur}
							/>
						</div>
						<div className={styles.formField}>
							{passwordError && (
								<div className={styles.wrongPassword}>
									{passwordError}
								</div>
							)}
							<input
								name="password"
								type="password"
								value={password}
								placeholder="Пароль"
								onChange={onPasswordChange}
								onBlur={onPasswordBlur}
							/>
						</div>
						<div className={styles.formField}>
							{confirmPasswordError && (
								<div className={styles.wrongPassword}>
									{confirmPasswordError}
								</div>
							)}
							<input
								name="confirmPassword"
								type="password"
								value={confirmPassword}
								placeholder="Подтвержение пароля"
								onChange={onConfirmPasswordChange}
								onBlur={onConfirmPasswordBlur}
							/>
						</div>
						<div className={styles.formField}>
							<button
								ref={submitButtonRef}
								className={styles.formBtn}
								type="submit"
								disabled={
									loginError !== null ||
									passwordError !== null ||
									confirmPasswordError !== null
								}
							>
								Зарегистрироваться
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
