const express = require('express');
const QuestionController = require('./controllers/QuestionController');
const RoomController = require('./controllers/RoomController');

const route = express.Router();

/**
 * Rooms
 */
route.get('/', (req, res) => res.render('index', { page: 'enter-room' }));
route.get('/create-room', (req, res) =>
  res.render('index', { page: 'create-room' })
);
route.post('/make-room', RoomController.create);
route.get('/room/:room', RoomController.open);

/**
 * Questions
 */
route.post('/question/create/:room', QuestionController.create);
route.post('/question/:room/:question/:action', QuestionController.index);

module.exports = route;
