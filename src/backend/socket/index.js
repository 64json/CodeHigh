import socketIO from 'socket.io';
import { Auth } from '/models';
import Game from './Game';
import Player from './Player';

const connectSocket = httpServer => {
  const io = socketIO(httpServer, { path: '/socket' });
  const games = [];
  io.on('connection', socket => {
    socket.on('AUTH', data => {
      const { token } = data;
      Auth.verify(token)
        .then(auth => Auth.populate(auth, 'user'))
        .then(auth => auth.refresh())
        .then(auth => {
          const author = auth.user.toJSON({ req: {} });
          let game = games.find(game => !game.finished_at && game.findPlayer(author, player => !player.isDone()));
          if (!game) game = games.find(game => !game.started_at);
          if (!game) {
            game = new Game(io, () => {
              const index = games.indexOf(this);
              if (~index) games.splice(index, 1);
            });
            games.push(game);
          }
          socket.join(game.room);

          let player = game.findPlayer(author);
          if (player) {
            player.connect();
          } else {
            player = new Player(io, game, author);
            game.addPlayer(player);
          }

          listenOnPlayer(player);
        })
        .catch(err => {
          console.error(err);
          socket.disconnect()
        });
    });

    const listenOnPlayer = player => {
      socket.on('disconnect', () => {
        player.disconnect();
      });
      socket.on('START_TYPING', () => {
        player.startTyping();
      });
      socket.on('STOP_TYPING', () => {
        player.stopTyping();
      });
      socket.on('SUBMIT', code => {
        player.submit(code);
      });
      socket.on('GIVE_UP', () => {
        player.giveUp();
      });
      socket.on('RATE', data => {
        const { solution_id, stars } = data;
        player.rate(solution_id, stars);
      });
    };
  });
};

export default connectSocket;