document.getElementById('login-form').addEventListener('submit', async (e) => {
	e.preventDefault();

	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	try {
		const response = await fetch('/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		});

		const data = await response.json();

		if (data.success) {
			document.getElementById('error').textContent = '';
			// Store username for use on the home page
			localStorage.setItem('username', username);
			// Redirect to home page
			window.location.href = '/home.html';
		} else {
			document.getElementById('error').textContent = data.message;
			document.getElementById('welcome').textContent = '';
		}
	} catch (error) {
		document.getElementById('error').textContent =
			'An error occurred during login.';
		document.getElementById('welcome').textContent = '';
	}
});
