const fs = require('fs');
const path = require('path');
const express = require('express');
const students = require('./data/students.json');

const app = express();

const PORT = process.env.PORT || 3002;

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

app.get('/api/bedChart/:home', (req, res) => {
	return res.json(
		students.filter(
			v => v.tempHome === req.params.home || v.assignedHome === req.params.home
		)
	);
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}.`);
});
