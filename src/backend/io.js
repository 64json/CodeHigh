import socketIO from 'socket.io';
import { Auth, Solution, Topic } from '/models';
import randomstring from 'randomstring';

const io = socketIO();
const games = [];
io.on('connection', socket => {
  let socketUser = null;

  socket.on('AUTH', data => {
    const { token } = data;
    Auth.verify(token)
      .then(auth => Auth.populate(auth, 'user'))
      .then(auth => auth.refresh())
      .then(auth => {
        socketUser = auth.user;
        const { fb_user_id, name } = auth.user;
        assignPlayer({ fb_user_id, name });
      })
      .catch(err => {
        console.error(err);
        socket.disconnect()
      });
  });

  const assignPlayer = user => {
    let game = games.find(game => game.players.some(player => !game.finished_at && user.fb_user_id === player.user.fb_user_id));
    if (!game) {
      game = games.find(game => !game.started_at);
    }
    if (!game) {
      game = {
        room: randomstring.generate(),
        started_at: null,
        updated_at: null,
        finished_at: null,
        players: [],
        topic: null,
      };
      games.push(game);
    }
    socket.join(game.room);

    let player = game.players.find(player => user.fb_user_id === player.user.fb_user_id);
    if (!player) {
      player = {
        user,
        submitted_at: null,
        given_up_at: null,
        typing: false,
        ratings: {},
        solution: null,
      };
      game.players.push(player);
    }

    if (game.started_at || game.players.length < 2) {
      updateGame(game);
    } else {
      game.started_at = new Date();
      Topic.count()
        .then(count => {
          const random = Math.random() * count | 0;
          return Topic.findOne().skip(random)
        })
        .then(topic => {
          game.topic = topic.toJSON({ req: {} });
          updateGame(game);
        })
        .catch(console.error);
    }

    socket.on('START_TYPING', () => {
      player.typing = true;
      updateGame(game);
    });
    socket.on('STOP_TYPING', () => {
      player.typing = false;
      updateGame(game);
    });
    socket.on('SUBMIT', code => {
      player.submitted_at = new Date();
      new Solution({
        topic: game.topic,
        time: (player.submitted_at - game.started_at) / 1000,
        code,
      }).setAuthor(socketUser).save()
        .then(solution => {
          player.solution = solution.toJSON({ req: {} });
          updateGame(game);
        })
        .catch(console.error);
    });
    socket.on('GIVE_UP', () => {
      player.given_up_at = new Date();
      updateGame(game);
    });
    socket.on('RATE', data => {
      const { solution_id, stars } = data;
      Solution.get(solution_id)
        .then(solution => solution.rate(stars, socketUser))
        .then(solution => {
          const ratedPlayer = game.players.find(player => solution._id.equals(player.solution._id));
          ratedPlayer.average_stars = solution.average_stars;
          ratedPlayer.ratings[player.user.fb_user_id] = stars;
          game.players = game.players.sort((p1, p2) => (p2.average_stars || 0) - (p1.average_stars || 0));
          updateGame(game);
        })
        .catch(console.error);
    });
  };

  const updateGame = game => {
    game.updated_at = new Date();
    const all_submitted = game.players.every(player => player.submitted_at || player.given_up_at);
    const time_done = game.topic_id && (game.updated_at - game.started_at) / 1000 > game.topic_time;
    if (!game.finished_at && (all_submitted || time_done)) {
      game.finished_at = game.updated_at;
      setTimeout(() => {
        io.to(game.room).emit('GAME_REMOVED');
        const index = games.indexOf(game);
        if (~index) games.splice(index, 1);
      }, 5 * 60 * 1000);
    }
    io.to(game.room).emit('GAME_UPDATED', game);
  };
});

export default io;