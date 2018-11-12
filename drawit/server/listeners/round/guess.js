const { findGameWithJoinCode } = require('../../database/helpers');
const { Translate } = require('@google-cloud/translate');
const dotenv = require('dotenv');
const start = require('./start.js');

dotenv.config();
const projId = process.env.GOOGLE_PROJECT_ID;

module.exports = async ({ data, socket, io }) => {
  try {
    const { message, nickname, joinCode } = data;
    const game = await findGameWithJoinCode(joinCode);

    // ping google translate api
    const translate = new Translate({
      projectId: projId,
    });
    const text = message;
    const target = 'en';
    translate.translate(text, target)
      .then((results) => {
        let translations = results[0];
        translations = Array.isArray(translations)
          ? translations
          : [translations];

        console.log('Translations:');
        translations.forEach((translation, i) => {
          console.log(`${text[i]} => (${target}) ${translation}`);
          console.log(message, translation, game.word);
          if (message.toLowerCase() === game.word || translation.toLowerCase() === game.word) {
            if (!socket.hasGuessedCorrect) {
              socket.hasGuessedCorrect = true;
              game.players = game.players.map(player => (
                player.nickname === nickname
                  ? { nickname, score: player.score + 1 }
                  : player
              ));
              game.save();
              io.in(joinCode).emit('round:correct_guess', { nickname, scores: game.players, message });
            }
          } else {
            io.in(joinCode).emit('round:incorrect_guess', { nickname, message });
            console.log('message', message);
          }
        });
      })
      .catch((err) => {
        console.error('ERROR:', err);
      });
  } catch (error) {
    socket.emit('round:error', { error });
  }
};

// const { findGameWithJoinCode } = require('../../database/helpers');

// module.exports = async ({ data, socket, io }) => {
//   try {
//     const { message, nickname, joinCode } = data;
//     const game = await findGameWithJoinCode(joinCode);

//     if (message.toLowerCase() === game.word) {
//       if (!socket.hasGuessedCorrect) {
//         socket.hasGuessedCorrect = true;
//         game.players = game.players.map(player => (
//           player.nickname === nickname
//             ? { nickname, score: player.score + 1 }
//             : player
//         ));
//         await game.save();

//         io.in(joinCode).emit('round:correct_guess', { nickname, scores: game.players });
//       }
//     } else {
//       io.in(joinCode).emit('round:incorrect_guess', { nickname, message });
//     }
//   } catch (error) {
//     socket.emit('round:error', { error });
//   }
// };
