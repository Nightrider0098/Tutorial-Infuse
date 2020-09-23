const express = require("express");
const mongoose = require("../controllers/mongodb-controller");
const Router = express.Router();
//const mongoose = require('mongoose')
const mConnect = require('../controllers/mongodb-controller')
const tutorialSchema = require('../modals/tutorial.model')
// const tmodel = mConnect.model('tutorial-status',tutorialSchema)

const tmodel = mConnect.model('t1', tutorialSchema)

var id_count = "";

tmodel.find({}, (err, data) => {
	if (err) { console.log("err", err); }
	else {
		// id_count = +data[0]['id'].substring(1) + 1 
		id_count = +data[data.length - 1].id.substring(1) + 1;
		console.log(id_count)
	}
})

Router.get('/:id', (req, res) => {
	tmodel.findOne({ "id": req.params.id }, (err, data) => {
		if (err) { console.log("err", err); }
		else { res.json(data) }
	})
})

Router.get('/', (req, res) => {
	var title = req.query.title
	if (title === undefined)
		tmodel.find({}, 'title description published id', (err, data) => {
			if (err) { console.log("err", err); }
			else { res.json(data) }
		})
	else {
		tmodel.find({
			"title": {
				$regex: '.*' + title + '.*', $options: 'i'
			}
		}, 'title description published id', (err, data) => {
			if (err) { console.log("err", err); }
			else { res.json(data) }
		})
	}
})

Router.post('/', (req, res) => {
	// console.log("accepted")
	var title = req.body.title;
	var description = req.body.description;
	var published = req.body.published;
	var id = req.body.id || ("T" + id_count);
	id_count += 1;

	tmodel.create({ title: title, description: description, published: published, id: id }, function (err, small) {
		if (err) {
			console.log("error occured while insert operation \n ", err)
			res.json({ 'type': 'insert', 'response': 'failed' })
		}
		else {
			console.log("saved!!!")
			res.json({ 'type': 'insert', 'response': 'sucess' })
		}

	});
})

Router.put('/:id', (req, res) => {
	var title = req.body.title;
	var description = req.body.description;
	var published = req.body.published;
	var id = req.params.id;
	var finalRes = {}
	var ls = {
		"title": title, "description": description, "published": published
	}
	var lt = Object.keys(ls)
	for (var i in lt) {
		if (ls[lt[i]] !== undefined) { finalRes[lt[i]] = ls[lt[i]] }
	}
	tmodel.updateOne({ id: id }, finalRes, () => {
		res.json({ 'type': 'update', "response": "sucessfull" })
	});
})

Router.delete('/:id', (req, res) => {
	var id = req.params.id;
	tmodel.deleteOne({ id: id }, (err) => {
		if (err) {
			console.log("err", err);
			res.json({ 'type': 'delete', 'response': 'failed' })
		}
		else {
			res.json({ 'type': 'delete', 'response': 'sucessfull' })
		}
	})
})

Router.delete('/', (req, res) => {
	tmodel.deleteMany({}, (err) => {
		if (err) {
			console.log('error occured while removing all document', err);
			res.json({ 'type': 'deleteAll', 'response': 'failed' })
		}
		else {
			res.json({ 'type': 'deleteAll', 'response': 'sucessfull' })
		}
	})
})

Router.use("*", (req, res) => {
	res.json({ 'type': "unrouted", 'response': 'not a valid route' })

})

module.exports = Router