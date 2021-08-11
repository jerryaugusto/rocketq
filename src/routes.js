const express = require('express');
const QuestionController = require('./controllers/QuestionController');
const RoomController = require('./controllers/RoomController');

const route = express.Router();

/**
 * Gets
 */
route.get('/', (req, res) => res.render('index', { page: 'enter-room' }));
route.get('/create-room', (req, res) =>
  res.render('index', { page: 'create-room' })
);
route.get('/room/:room', (req, res) => res.render('room'));

/**
 * Posts
 */
route.post('/question/:room/:question/:action', QuestionController.index);
route.post('/make-room', RoomController.create);

module.exports = route;
