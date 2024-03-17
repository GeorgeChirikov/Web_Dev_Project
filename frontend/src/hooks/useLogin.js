import { useState } from 'react';

export default function useLogin(url) {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const login = async (object) => {
		setIsLoading(true);
		setError(null);
		const response = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(object),
		});
		const user = await response.json();

		if (!response.ok) {
			console.log(
				'This should not load into the page, since the login had an error. If it does, the code needs fixing.'
			);
			setError(user.error);
			setIsLoading(false);
			alert('Invalid username or password');
			return error;
		}

		localStorage.setItem('token', user.token);
		localStorage.setItem('user', JSON.stringify(user));
		setIsLoading(false);
	};

	return { login, isLoading, error };
}
