import Emitter from './Emitter';
import { Solution } from '/models';

class Player extends Emitter {
  constructor(io, game, author) {
    super(io, game.room);
    this.game = game;
    this.connected = 1;

    this.user = author;
    this.submitted_at = null;
    this.given_up_at = null;
    this.typing = false;
    this.solution = null;
    this.ratings = {};
    this.average_stars = null;
  }

  connect() {
    this.connected++;
    this.game.update();
  }

  disconnect() {
    if (--this.connected < 1) {
      if (!this.game.started_at) {
        this.game.removePlayer(this);
      } else if (this.game.isPlaying()) {
        this.giveUp();
      }
    }
  }

  startTyping() {
    this.typing = true;
    this.update();
  }

  stopTyping() {
    this.typing = false;
    this.update();
  }

  submit(code) {
    if (!this.isDone()) {
      this.submitted_at = new Date();
      new Solution({
        topic: this.game.topic,
        time: (this.submitted_at - this.game.started_at) / 1000,
        code,
        author: this.user,
      }).force().save()
        .then(solution => {
          this.solution = solution.toJSON({ req: {} });
          if (this.game.isEveryoneDone()) return this.game.finish();
          this.update();
        })
        .catch(console.error);
    }
  }

  giveUp() {
    if (!this.isDone()) {
      this.given_up_at = new Date();
      if (this.game.isEveryoneDone()) return this.game.finish();
      this.update();
    }
  }

  isDone() {
    return this.submitted_at || this.given_up_at;
  }

  update() {
    this.updated_at = new Date();
    this.emit('PLAYER_UPDATED', this);
  }

  rate(solution_id, stars) {
    Solution.get(solution_id)
      .then(solution => solution.rate(stars, this.user))
      .then(solution => {
        const ratedPlayer = this.game.players.find(player => player.solution && player.solution._id.equals(solution_id));
        ratedPlayer.average_stars = solution.average_stars;
        ratedPlayer.ratings[this.user.fb_user_id] = stars;
        this.game.players = this.game.players.sort((p1, p2) => (p2.average_stars || 0) - (p1.average_stars || 0));
        this.game.update();
      })
      .catch(console.error);
  }

  toJSON() {
    const {
      user,
      submitted_at,
      given_up_at,
      typing,
      solution,
      ratings,
      average_stars,
    } = this;
    return {
      user,
      submitted_at,
      given_up_at,
      typing,
      solution,
      ratings,
      average_stars,
    };
  }
}

export default Player;