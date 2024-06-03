import styles from './app.module.css';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const fieldScheme = yup.object().shape({
	login: yup
		.string()
		.matches(
			/^[\w_]*$/,
			'Неверный логин. Допустимые символы - буквы, цифры и нижнее подчеркивание.',
		)
		.max(20, 'Неверный логин. Должно быть не более 20 символов.')
		.min(3, 'Неверный логин. Должно быть не менее 3 символов.'),
	password: yup
		.string()
		.matches(
			/^[\w_]*$/,
			'Неверный пароль. Допустимые символы - буквы, цифры и нижнее подчеркивание.',
		)
		.max(20, 'Неверный пароль. Должно быть не более 20 символов.')
		.min(3, 'Неверный пароль. Должно быть не менее 3 символов.'),
	confirmPassword: yup
		.string()
		.matches(
			/^[\w_]*$/,
			'Неверный пароль. Допустимые символы - буквы, цифры и нижнее подчеркивание.',
		)
		.max(20, 'Неверный пароль. Должно быть не более 20 символов.')
		.min(3, 'Неверный пароль. Должно быть не менее 3 символов.')
		.oneOf([yup.ref('password')], 'Пароли не совпадают'),
});

export const App = () => {
	const submitButtonRef = useRef(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { login: '', password: '', confirmPassword: '' },
		resolver: yupResolver(fieldScheme),
	});

	const loginError = errors.login?.message;
	const passwordError = errors.password?.message;
	const confirmPasswordError = errors.confirmPassword?.message;

	const onSubmit = (formData) => {
		console.log(formData);
	};

	return (
		<div className={styles.container}>
			<div className={styles.logo}>Авторизация</div>
			<div className={styles.app}>
				<div className={styles.loginItem}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className={styles.formField}>
							{loginError && (
								<div className={styles.wrongPassword}>{loginError}</div>
							)}
							<input
								className={styles.formInput}
								name="login"
								type="text"
								placeholder="Логин"
								{...register('login')}
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
								placeholder="Пароль"
								{...register('password')}
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
								placeholder="Подтвержение пароля"
								{...register('confirmPassword')}
							/>
						</div>
						<div className={styles.formField}>
							<button
								className={styles.formBtn}
								type="submit"
								disabled={!!loginError}
								ref={submitButtonRef}
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
