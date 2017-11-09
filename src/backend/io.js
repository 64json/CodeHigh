import socketIO from 'socket.io';
import { Auth, Solution, Topic } from '/models';
import randomstring from 'randomstring';

const MIN_PLAYERS = 2;
const MAX_PLAYERS = 8;
const COUNTDOWN = 10;
const io = socketIO();
const games = [];
io.on('connection', socket => {
  let author = null;
  let game = null;
  let player = null;
  let timer = null;

  const startGame = () => {
    if (!game.started_at) {
      game.started_at = new Date();
      Topic.count()
        .then(count => {
          const random = Math.floor(Math.random() * count);
          return Topic.findOne().skip(random)
        })
        .then(topic => {
          game.topic = topic.toJSON({ req: {} });
          updateGame();
        })
        .catch(console.error);
    }
  };

  const updateGame = () => {
    game.updated_at = new Date();
    io.to(game.room).emit('GAME_UPDATED', game);
  };

  const updatePlayer = player => {
    game.updated_at = new Date();
    io.to(game.room).emit('PLAYER_UPDATED', player);
  };

  const finishGame = () => {
    if (game.started_at && !game.finished_at) {
      game.finished_at = new Date();
      updateGame();
    }
  };

  const removeGame = () => {
    clearInterval(timer);
    io.to(game.room).emit('GAME_REMOVED');
    const index = games.indexOf(game);
    if (~index) games.splice(index, 1);
  };

  socket.on('AUTH', data => {
    const { token } = data;
    Auth.verify(token)
      .then(auth => Auth.populate(auth, 'user'))
      .then(auth => auth.refresh())
      .then(auth => {
        author = auth.user;
        game = games.find(game => game.started_at && !game.finished_at && game.players.some(player => author.fb_user_id === player.user.fb_user_id));
        if (!game) {
          game = games.find(game => !game.started_at);
        }
        if (!game) {
          timer = setInterval(() => {
            const now = new Date();
            if (game.topic) {
              if (game.started_at && (now - game.started_at) >= game.topic.time * 1000) {
                finishGame();
              }
              if (game.finished_at && (now - game.finished_at) >= game.topic.time * game.players.length * 1000) {
                removeGame();
              }
            } else {
              if (game.countdown_at && (now - game.countdown_at) >= COUNTDOWN * 1000) {
                startGame();
              }
            }
          }, 100);

          game = {
            room: randomstring.generate(),
            countdown_at: null,
            started_at: null,
            updated_at: null,
            finished_at: null,
            players: [],
            topic: null,
          };
          games.push(game);
        }
        socket.join(game.room);

        player = game.players.find(player => author.fb_user_id === player.user.fb_user_id);
        if (!player) {
          player = {
            user: author.toJSON({ req: {} }),
            submitted_at: null,
            given_up_at: null,
            typing: false,
            ratings: {},
            solution: null,
          };
          game.players.push(player);
          game.countdown_at = game.players.length >= MIN_PLAYERS ? new Date() : null;
        }

        if (game.started_at || game.players.length < MAX_PLAYERS) {
          updateGame();
        } else {
          startGame();
        }

        addListeners();
      })
      .catch(err => {
        console.error(err);
        socket.disconnect()
      });
  });

  const isEveryoneSubmitted = () => game.players.every(player => player.submitted_at || player.given_up_at);

  const addListeners = () => {
    socket.on('disconnect', () => {
      if (!game.started_at) {
        const index = game.players.indexOf(player);
        if (~index) {
          game.players.splice(index, 1);
          game.countdown_at = game.players.length >= MIN_PLAYERS ? new Date() : null;
          updateGame();
        }
      }
    });
    socket.on('START_TYPING', () => {
      player.typing = true;
      updatePlayer(player);
    });
    socket.on('STOP_TYPING', () => {
      player.typing = false;
      updatePlayer(player);
    });
    socket.on('SUBMIT', code => {
      player.submitted_at = new Date();
      new Solution({
        topic: game.topic,
        time: (player.submitted_at - game.started_at) / 1000,
        code,
      }).setAuthor(author).save()
        .then(solution => {
          player.solution = solution.toJSON({ req: {} });
          if (isEveryoneSubmitted()) return finishGame();
          updatePlayer(player);
        })
        .catch(console.error);
    });
    socket.on('GIVE_UP', () => {
      player.given_up_at = new Date();
      if (isEveryoneSubmitted()) return finishGame();
      updatePlayer(player);
    });
    socket.on('RATE', data => {
      const { solution_id, stars } = data;
      Solution.get(solution_id)
        .then(solution => solution.rate(stars, author))
        .then(solution => {
          const ratedPlayer = game.players.find(player => solution._id.equals(player.solution && player.solution._id));
          ratedPlayer.average_stars = solution.average_stars;
          ratedPlayer.ratings[player.user.fb_user_id] = stars;
          game.players = game.players.sort((p1, p2) => (p2.average_stars || 0) - (p1.average_stars || 0));
          updateGame();
        })
        .catch(console.error);
    });
  };
});

export default io;