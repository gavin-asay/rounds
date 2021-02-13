const fs = require('fs');
const path = require('path');
const express = require('express');
const students = require('./data/students.json');
const mysql2 = require('mysql2');

const app = express();

const PORT = process.env.PORT || 3002;

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

app.get('/api/bedChart/:home', (req, res) => {
	let roster = students.filter(
		v =>
			v.tempHome === req.params.home ||
			(v.assignedHome === req.params.home && !v.tempHome)
	);

	if (roster.length === 0) {
		res.json({ message: 'No students on this home tonight' });
		return;
	}

	res.json({
		message: 'success',
		studentCount: roster.length,
		roster: roster,
	});
});

app.post('/api/bedChart', (req, res) => {
	console.log(req.body);
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}.`);
});
