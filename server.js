const fs = require('fs');
const path = require('path');
const express = require('express');
const units = require('./data/students.json');
const mysql2 = require('mysql2');

const app = express();

const PORT = process.env.PORT || 3002;

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
//parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));

app.get('/api/locationchart/:area', (req, res) => {
	let roster = units.filter(v => v.tempHome === req.params.area || (v.assignedArea === req.params.area && !v.tempArea));

	if (roster.length === 0) {
		res.json({ message: 'No units in this area tonight' });
		return;
	}

	res.json({
		message: 'success',
		unitCount: roster.length,
		roster: roster,
	});
});

app.post('/api/locationchart', (req, res) => {
	console.log(req.body);
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}.`);
});
