const { findGameWithJoinCode } = require('../../database/helpers');
const { Translate } = require('@google-cloud/translate');
const dotenv = require('dotenv');

dotenv.config();
const projId = process.env.GOOGLE_PROJECT_ID;


// const i18next = require('i18next');
// const middleware = require('i18next-express-middleware');
// const express = require('express');

// i18next.use(middleware.LanguageDetector).init({
//   preload: ['es'],
// });

// const app = express();
// app.use(middleware.handle(i18next, {
//   // ignoreRoutes: ['/foo'],  or function(req, res, options, i18next) { /* return true to ignore */ }
//   removeLngFromUrl: false,
// }));

module.exports = async ({ data, socket, io }) => {
  try {
    const { message, nickname, joinCode } = data;
    const game = await findGameWithJoinCode(joinCode);

    // const translate = new Translate({
    //   projectId: projId,
    // });
    // const text = message;
    // const target = 'en';
    // translate.translate(text, target)
    //   .then((results) => {
    //     let translations = results[0];
    //     translations = Array.isArray(translations)
    //       ? translations
    //       : [translations];

    //     console.log('Translations:');
    //     translations.forEach((translation, i) => {
    //       console.log(`${text[i]} => (${target}) ${translation}`);
    //       translated = translation;
    //     });
    //   })
    //   .catch((err) => {
    //     console.error('ERROR:', err);
    //   });
    //   console.log(game.word);
    //   console.log(translated);
    //   console.log(message);
    // translated.toLowerCase() === game.word || 
    if (message.toLowerCase() === game.word) {
      if (!socket.hasGuessedCorrect) {
        socket.hasGuessedCorrect = true;
        game.players = game.players.map(player => (
          player.nickname === nickname
            ? { nickname, score: player.score + 1 }
            : player
        ));
        await game.save();

        io.in(joinCode).emit('round:correct_guess', { nickname, scores: game.players });
      }
    } else {
      io.in(joinCode).emit('round:incorrect_guess', { nickname, message });
    }
  } catch (error) {
    socket.emit('round:error', { error });
  }
};
