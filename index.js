const express = require('express')();
const bodyParser = require("body-parser");

var cors = require('cors')
express.use(cors())
express.use(bodyParser.json());
express.use(bodyParser.urlencoded({ extended: true }));

//propriedades do modelo users
var users = [
	{
		name: 'Flavio Farias',
		email: 'ffpsjr@gmail.com',
		password: 'Vaca505@',
	}
];

var nextId = 0;
express.get('/users', (req, res) => {
	res.status(200).json({
		msg:'oi'
	});
})

express.get('/users/:id', (req, res) => {
	console.log(users[req.params.id]);
	res.status(200).json(users[req.params.id]);
})

express.post("/users", (req, res) => {
	const user = {
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		id: nextId,
	};
	nextId = nextId + 1;
	users.push(user);
	console.log(user);
	res.status(201).json(user);
});

//função post
express.post("/users/login", (req, res) => {
	const user = {
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	};

	console.log(user);
	for (var i = 0; i < users.length; i++) {
		if(users[i].email === user.email && users[i].password === user.password){
			return res.status(200).json({
				status: 'ok'
			});
		}
	}

	return res.status(200).json({
		status: 'erro'
	});
});

express.listen(8080, () => {
	console.log('listening at 8080');
})