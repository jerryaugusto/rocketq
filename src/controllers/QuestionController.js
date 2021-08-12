const Database = require('../data/config');

module.exports = {
  async index(req, res) {
    const db = await Database();
    const roomId = req.params.room;
    const questionId = req.params.question;
    const action = req.params.action;
    const password = req.body.password;

    const roomVerify = await db.get(
      `SELECT * FROM rooms WHERE pass = ${password}`
    );

    if (roomVerify.pass == password) {
      if ((action == 'trash')) {
        await db.run(
          `DELETE FROM questions WHERE id = ${questionId}`
        );
      } else if ((action == 'check')) {
        await db.run(
          `UPDATE questions SET is_check = 1 WHERE id = ${questionId}`
        );
      }
    }

    res.redirect(`/room/${roomId}`);
  },

  async create(req, res) {
    const db = await Database();
    const question = req.body.question;
    const roomId = req.params.room;

    await db.run(
      `INSERT INTO questions(
        title,
        is_check,
        room
      )VALUES(
        "${question}",
        0,
        ${roomId}
      )`
    );

    await db.close();

    res.redirect(`/room/${roomId}`);
  },
};
