document.addEventListener('DOMContentLoaded', function () {
	// Get username from localStorage (set during login)
	const username = localStorage.getItem('username');

	if (!username) {
		// Not logged in, redirect to login page
		window.location.href = '/login.html';
		return;
	}

	// Display username in the user menu
	document.getElementById('username-display').textContent = username;

	// Handle logout
	document
		.querySelector('.logout-button')
		.addEventListener('click', function () {
			// Clear stored user info
			localStorage.removeItem('username');
			// Redirect to login page
			window.location.href = '/login.html';
		});
});
