import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import AceEditor from 'react-ace';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import styles from './stylesheet.scss';
import { classes, nn } from '/common/util';
import Cookies from 'js-cookie/src/js.cookie';
import Highlight from 'react-highlight';
import 'highlight.js/styles/monokai.css';
import chai from 'chai';
import { Rating } from '/components';

let socket = null;

@withRouter
@connect(
  ({ env }) => ({
    env
  })
)
class CompeteView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      last_tick_at: null,
      time_elapsed: null,
      last_typed_at: null,
      errors: null,
      code: null,
      selected_fb_user_id: null,
      game: {
        countdown_at: null,
        started_at: null,
        updated_at: null,
        finished_at: null,
        players: [],
        topic: null,
      },
    };
  }

  componentDidMount() {
    const { author } = this.props.env;
    if (author) {
      this.setState({ selected_fb_user_id: author.fb_user_id });

      const url = `http://${window.location.hostname}:8183`;
      socket = socketIOClient(url);
      const token = Cookies.get('token');
      socket.emit('AUTH', { token });
      socket.on('GAME_UPDATED', game => {
        const {
          countdown_at,
          started_at,
          updated_at,
        } = game;
        const last_tick_at = new Date();
        const time_elapsed = new Date(updated_at) - new Date(started_at || countdown_at);
        this.setState({ last_tick_at, time_elapsed, game });
      });
      socket.on('PLAYER_UPDATED', updated_player => {
        const players = [...this.state.game.players];
        const index = players.findIndex(player => player.user.fb_user_id === updated_player.user.fb_user_id);
        players[index] = updated_player;
        const game = { ...this.state.game, players };
        this.setState({ game });
      });
      socket.on('GAME_REMOVED', () => this.setState({ game: null }));
    }

    this.intervalId = setInterval(() => {
      const { last_tick_at, time_elapsed, last_typed_at } = this.state;
      const me = this.findPlayer(author.fb_user_id);
      const now = new Date();
      if (me) {
        if (!me.typing && (now - last_typed_at) < 300) {
          socket.emit('START_TYPING');
        }
        if (me.typing && (now - last_typed_at) >= 300) {
          socket.emit('STOP_TYPING');
        }
      }
      if (last_tick_at) {
        this.setState(state => ({
          time_elapsed: time_elapsed + (now - last_tick_at),
          last_tick_at: now,
        }));
      }
    }, 300);
  }

  componentWillUnmount() {
    if (socket) socket.disconnect();

    clearInterval(this.intervalId);
  }

  onChange(value) {
    this.setState({ last_typed_at: new Date(), code: value, errors: null });
  }

  run() {
    const { code, game } = this.state;
    if (code === null || code === '') return;
    const { expect } = chai;
    const errors = game.topic.testcases.map(testcase => {
      try {
        eval(code + ';' + testcase.eval);
      } catch (err) {
        return err;
      }
    });
    this.setState({ errors });
  }

  submit() {
    socket.emit('SUBMIT', this.state.code);
  }

  giveUp() {
    socket.emit('GIVE_UP');
  }

  select(player) {
    this.setState({ selected_fb_user_id: player.user.fb_user_id });
  }

  findPlayer(fb_user_id, players = this.state.game.players) {
    return players.find(player => player.user.fb_user_id === fb_user_id);
  }

  rate(stars) {
    const { selected_fb_user_id } = this.state;
    const player = this.findPlayer(selected_fb_user_id);
    const solution_id = player.solution._id;
    socket.emit('RATE', { solution_id, stars });
  }

  render() {
    const { author } = this.props.env;
    const {
      time_elapsed,
      errors,
      code,
      selected_fb_user_id,
      game,
    } = this.state;
    const {
      countdown_at,
      started_at,
      finished_at,
      players,
      topic,
    } = game;

    if (!author || !game) return <Redirect to='/' />;

    const me = this.findPlayer(author.fb_user_id) || {
      user: author,
      submitted_at: null,
      given_up_at: null,
      typing: false,
      ratings: {},
      solution: null,
    };
    const player = this.findPlayer(selected_fb_user_id) || me;

    let status = <span>Waiting for players</span>;
    if (finished_at) {
      status = <span>Please vote</span>;
    } else if (started_at) {
      const time_remaining = Math.max(topic.time - time_elapsed / 1000, 0);
      status = <span className={styles.big}>{nn(time_remaining / 60 | 0) + ':' + nn(time_remaining % 60 | 0)}</span>;
    } else if (countdown_at) {
      const time_remaining = (10 - time_elapsed / 1000) | 0;
      status = <span>Starting in {time_remaining} seconds</span>
    }
    const done = finished_at || me.submitted_at || me.given_up_at;
    const success = errors && errors.every(error => error === undefined);
    const editable = topic && !done;
    return (
      <div className={styles.compete_view}>
        <div className={styles.status}>
          {status}
        </div>
        {
          topic ?
            <div className={styles.problem_panel}>
              <div className={styles.title}>
                {topic.title}
              </div>
              <div className={styles.content}>
                {topic.content}
              </div>
              {
                topic.testcases.filter(testcase => testcase.public).map((testcase, i) => (
                  <Highlight className={classes(styles.sample, 'javascript')} key={i}>
                    {testcase.eval}
                  </Highlight>
                ))
              }
            </div> :
            <div className={styles.problem_panel}>
            </div>
        }
        <div className={styles.status_panel}>
          <div className={styles.versus}>
            <span>Players</span>
          </div>
          {
            players.map(player => {
              return (
                <div onClick={() => done && this.select(player)}
                     className={classes(styles.player, player.given_up_at && styles.given_up, player.submitted_at && styles.submitted)}
                     key={player.user.fb_user_id}>
                  <div className={styles.picture}
                       style={{ backgroundImage: `url(http://graph.facebook.com/${player.user.fb_user_id}/picture?type=square)` }} />
                  <div className={styles.name}>
                    {player.user.name}
                  </div>
                  {
                    player.typing &&
                    <img src="/img/typing.svg" className={styles.typing} />
                  }
                  {
                    Object.keys(player.ratings).length > 0 &&
                    <div className={styles.rating}>
                      <span className={styles.symbol}>⭐</span>
                      <span className={styles.number}>️{player.average_stars.toFixed(1)}</span>
                    </div>
                  }
                </div>
              );
            })
          }
        </div>
        <div className={styles.ide_panel}>
          <div
            className={classes(styles.player, player.given_up_at && styles.given_up, player.submitted_at && styles.submitted)}>
            <div className={styles.picture}
                 style={{ backgroundImage: `url(http://graph.facebook.com/${player.user.fb_user_id}/picture?type=square)` }} />
            <div className={styles.name}>
              {player.user.name}
            </div>
            {
              player.typing &&
              <img src="/img/typing.svg" className={styles.typing} />
            }
          </div>
          <AceEditor
            className={styles.editor}
            value={(done ? player.solution && player.solution.code : code) || ''}
            onChange={value => this.onChange(value)}
            mode="javascript"
            theme="monokai"
            name="editor"
            readOnly={!editable} />
          {
            editable &&
            <div className={styles.toolbar}>
              <a href='#' className={classes(styles.button, styles.run)} onClick={() => this.run()}>
                <span>Run</span>
              </a>
              <a href='#' className={classes(styles.button, styles.give_up)} onClick={() => this.giveUp()}>
                <span>Give Up</span>
              </a>
            </div>
          }
          {
            !done && errors &&
            <div className={styles.console}>
              {
                errors.map((error, i) => (
                  <div className={styles.testcase} key={i}>
                    <span className={styles.number}>Testcase #{i + 1}</span>
                    {
                      error === undefined ?
                        <span className={styles.pass}>pass</span> :
                        <span className={styles.fail}>{error.toString()}</span>
                    }
                  </div>
                ))
              }
            </div>
          }
          {
            !done && success &&
            <div className={styles.toolbar}>
              <a href='#' className={classes(styles.button, styles.submit)} onClick={() => this.submit()}>
                <span>Submit</span>
              </a>
            </div>
          }
          {
            done && player.solution &&
            <Rating stars={player.ratings[author.fb_user_id]}
                    rate={stars => this.rate(stars)} />
          }
        </div>
      </div>
    );
  }
}

export default CompeteView;