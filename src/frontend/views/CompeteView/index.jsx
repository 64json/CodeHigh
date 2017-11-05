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
import { TopicApi } from '/apis';
import { TestcaseApi } from '/apis/index';
import 'highlight.js/styles/monokai.css';
import chai from 'chai';

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
      players: [],
      finished_at: null,
      time_elapsed: null,
      last_time: null,
      topic: null,
      testcases: null,
      results: null,
      last_typed_time: null,
      code: null,
      stars: null,
      selected_fb_user_id: null,
      removed: false,
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
        console.log(game);
        const {
          started_at,
          updated_at,
          finished_at,
          players,
          topic_id,
        } = game;
        const last_time = new Date();
        const time_elapsed = new Date(updated_at) - new Date(started_at);
        this.setState({ players, finished_at, time_elapsed, last_time });

        if (this.state.topic === null && topic_id !== null) {
          TopicApi.getTopic(topic_id)
            .then(({ topic }) => {
              this.setState({ topic });
              TestcaseApi.allTestcases({ topic: topic._id })
                .then(({ testcases }) => {
                  this.setState({ testcases });
                });
            });
        }
      });
      socket.on('GAME_REMOVED', () => this.setState({ removed: true }));
    }

    this.intervalId = setInterval(() => {
      const { time_elapsed, last_time, topic, last_typed_time } = this.state;
      const me = this.findPlayer(author.fb_user_id);
      const now = new Date();
      if (me) {
        if (!me.typing && (now - last_typed_time) < 300) {
          socket.emit('START_TYPING');
        }
        if (me.typing && (now - last_typed_time) >= 300) {
          socket.emit('STOP_TYPING');
        }
      }
      if (topic) {
        this.setState(state => ({
          time_elapsed: time_elapsed + (now - last_time),
          last_time: now,
        }));
      }
    }, 300);
  }

  componentWillUnmount() {
    if (socket) socket.disconnect();

    clearInterval(this.intervalId);
  }

  onChange(value) {
    this.setState({ last_typed_time: new Date(), code: value });
  }

  run() {
    const { code, testcases } = this.state;
    const { expect } = chai;
    const results = testcases.map(testcase => {
      try {
        eval(code + ';' + testcase.eval);
      } catch (err) {
        console.error(err);
        return false;
      }
      return true;
    });
    this.setState({ results });
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

  mouseOverRating(stars) {
    this.setState({ stars });
  }

  mouseOutRating() {
    this.setState({ stars: null });
  }

  findPlayer(fb_user_id, players = this.state.players) {
    return players && players.find(player => player.user.fb_user_id === fb_user_id);
  }

  rate(stars) {
    const { selected_fb_user_id } = this.state;
    const player = this.findPlayer(selected_fb_user_id);
    const solution_id = player.solution_id;
    socket.emit('RATE', { solution_id, stars });
  }

  render() {
    const { author } = this.props.env;
    const {
      players,
      finished_at,
      time_elapsed,
      topic,
      testcases,
      results,
      code,
      selected_fb_user_id,
      removed,
    } = this.state;

    if (!author || removed) return <Redirect to='/' />;

    const me = this.findPlayer(author.fb_user_id) || {
      user: author,
      submitted_at: null,
      given_up_at: null,
      code: null,
      typing: false,
      solution_id: null,
      ratings: [],
    };
    const player = this.findPlayer(selected_fb_user_id) || me;

    let status = <span>Waiting for players</span>;
    if (finished_at) {
      status = <span>Please vote</span>;
    } else if (topic) {
      const time_remaining = Math.max(topic.time - time_elapsed / 1000, 0);
      status = <span className={styles.big}>{nn(time_remaining / 60 | 0) + ':' + nn(time_remaining % 60 | 0)}</span>;
    }
    const done = finished_at || me.submitted_at || me.given_up_at;
    const success = results && results.every(result => result);
    const editable = topic && !done;
    return (
      <div className={styles.compete_view}>
        <div className={styles.status}>
          {status}
        </div>
        {
          topic && testcases ?
            <div className={styles.problem_panel}>
              <div className={styles.content}>
                {topic.content}
              </div>
              {
                testcases.filter(testcase => testcase.public).map(testcase => (
                  <Highlight className={classes(styles.sample, 'javascript')} key={testcase._id}>
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
                    player.ratings.length > 0 &&
                    <div className={styles.rating}>
                      <span className={styles.symbol}>⭐</span>
                      <span className={styles.number}>️{player.average_rating.toFixed(1)}</span>
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
            value={(done ? player.code : code) || ''}
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
            !done && results &&
            <div className={styles.console}>
              {
                testcases.map((testcase, i) => (
                  <div className={styles.testcase} key={testcase._id}>
                    <span className={styles.number}>Testcase #{i + 1}</span>
                    {
                      results &&
                      <span className={results[i] ? styles.pass : styles.fail}></span>
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
            done && player.solution_id &&
            <div className={styles.toolbar}>
              {
                [1, 2, 3, 4, 5].map(stars => {
                  const rating = player.ratings.find(rating => rating.fb_user_id === author.fb_user_id);
                  const disabled = this.state.stars ? stars > this.state.stars : rating ? stars > rating.stars : true;
                  return (
                    <a href='#' key={stars}
                       className={classes(styles.button, styles.star, disabled && styles.disabled)}
                       onMouseEnter={() => this.mouseOverRating(stars)} onMouseLeave={() => this.mouseOutRating()}
                       onClick={() => this.rate(stars)}>
                      <span>⭐️</span>
                    </a>
                  )
                })
              }
            </div>
          }
        </div>
      </div>
    );
  }
}

export default CompeteView;