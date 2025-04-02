const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Login endpoint
app.post('/login', (req, res) => {
	const { username, password } = req.body;

	if (username === 'validuser' && password === 'validpassword') {
		res.json({ success: true, message: 'Login successful' });
	} else {
		res.status(401).json({
			success: false,
			message: 'Invalid credentials',
		});
	}
});

// Logout endpoint
app.post('/logout', (req, res) => {
	res.json({ success: true, message: 'Logout successful' });
});

app.listen(port, () => {
	console.log(`Test website running at http://localhost:${port}`);
});
