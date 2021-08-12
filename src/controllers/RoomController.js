const Database = require('../data/config');

module.exports = {
  async create(req, res) {
    const db = await Database();
    const pass = req.body.password;
    let roomId = '';
    let isRoom = true;

    while (isRoom) {
      for (var i = 0; i < 6; i++) {
        roomId += Math.floor(Math.random() * 10);
      }

      const roomsCreatedId = await db.all(`SELECT id FROM rooms`);

      isRoom = roomsCreatedId.some(
        (roomCreatedId) => roomsCreatedId === roomId
      );

      if (!isRoom) {
        await db.run(
          `INSERT INTO rooms(
            id,
            pass
          )VALUES(
            ${parseInt(roomId)},
            ${pass}
          )`
        );
      }
    }

    await db.close();

    res.redirect(`/room/${roomId}`);
  },

  async open(req, res) {
    const db = await Database();
    const roomId = req.params.room;

    const questions = await db.all(
      `SELECT * FROM questions WHERE room = ${roomId} AND is_check = 0`
    );
    const questionsRead = await db.all(
      `SELECT * FROM questions WHERE room = ${roomId} AND is_check = 1`
    );

    res.render('room', {
      roomId: roomId,
      questions: questions,
      questionsRead: questionsRead,
    });
  },
};
