import Emitter from './Emitter';
import randomstring from 'randomstring';
import { Topic } from '/models';

const COUNTDOWN = 10;
const MIN_PLAYERS = 2;
const MAX_PLAYERS = 8;
const INTERVAL = 100;

class Game extends Emitter {
  constructor(io, onRemove) {
    super(io, randomstring.generate());

    this.countdown_at = null;
    this.started_at = null;
    this.updated_at = null;
    this.finished_at = null;
    this.players = [];
    this.topic = null;

    const timer = setInterval(() => {
      const now = new Date();
      if (this.topic) {
        if (this.started_at && (now - this.started_at) >= this.topic.time * 1000) {
          this.finish();
        }
        if (this.finished_at && (now - this.finished_at) >= this.topic.time * this.players.length * 1000) {
          clearInterval(timer);
          this.remove();
          onRemove();
        }
      } else {
        if (this.countdown_at && (now - this.countdown_at) >= COUNTDOWN * 1000) {
          this.start();
        }
      }
    }, INTERVAL);
  }

  findPlayer(author, filter = () => true) {
    return this.players.find(player => author.fb_user_id === player.user.fb_user_id && filter(player));
  }

  addPlayer(player) {
    this.players.push(player);
    this.updatePlayers();
  }

  removePlayer(player) {
    const index = this.players.indexOf(player);
    if (~index) {
      this.players.splice(index, 1);
      this.updatePlayers();
    }
  }

  isEveryoneDone() {
    return this.players.every(player => player.isDone());
  }

  isPlaying() {
    return this.started_at && !this.finished_at;
  }

  updatePlayers() {
    if (this.players.length >= MAX_PLAYERS) return this.start();
    this.countdown_at = this.players.length >= MIN_PLAYERS ? new Date() : null;
    this.update();
  }

  start() {
    if (!this.started_at) {
      this.started_at = new Date();
      Topic.count()
        .then(count => {
          const random = Math.floor(Math.random() * count);
          return Topic.findOne().skip(random);
        })
        .then(topic => {
          this.topic = topic.toJSON({ req: {} });
          this.update();
        })
        .catch(console.error);
    }
  }

  update() {
    this.updated_at = new Date();
    this.emit('GAME_UPDATED', this);
  }

  finish() {
    if (this.isPlaying()) {
      this.finished_at = new Date();
      this.update();
    }
  }

  remove() {
    this.emit('GAME_REMOVED');
  }

  toJSON() {
    const {
      countdown_at,
      started_at,
      updated_at,
      finished_at,
      players,
      topic,
    } = this;
    return {
      countdown_at,
      started_at,
      updated_at,
      finished_at,
      players,
      topic,
    };
  }
}

export default Game;