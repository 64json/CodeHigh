import React from 'react';
import styles from './stylesheet.scss';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { TopicApi } from '/apis';
import { classes } from '/common/util';
import AceEditor from 'react-ace';
import { Comments } from 'react-facebook';
import 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import { Rating } from '/components';
import { RatingApi, SolutionApi } from '../../apis/index';

@withRouter
@connect(
  ({ env }) => ({
    env
  })
)
class HomeView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topics: [],
      opened: null,
      rating: null,
    };
  }

  componentDidMount() {
    TopicApi.allTopics({ populate: 'author,top_solutions.author' })
      .then(({ topics }) => this.setState({ topics }))
      .catch(console.error);
  }

  open(solution) {
    const { author } = this.props.env;
    const opened = this.state.opened === solution._id ? null : solution._id;
    if (opened && author) {
      RatingApi.allRatings({ solution: solution._id, author: author._id })
        .then(({ ratings }) => {
          const [rating] = ratings;
          this.setState({ opened, rating });
        })
        .catch(console.error);
    } else {
      this.setState({ opened });
    }
  }

  rate(solution, stars) {
    SolutionApi.rateSolution(solution._id, { stars })
      .then(({ solution }) => {
        const rating = { ...this.state.rating };
        if (rating.solution === solution._id) {
          rating.stars = stars;
          this.setState({ rating });
        }
        const topics = JSON.parse(JSON.stringify(this.state.topics));
        for (let i = 0; i < topics.length; i++) {
          for (let j = 0; j < topics[i].top_solutions.length; j++) {
            if (topics[i].top_solutions[j]._id === solution._id) {
              topics[i].top_solutions[j].average_stars = solution.average_stars;
            }
          }
        }
        this.setState({ topics });
      })
      .catch(console.error);
  }

  render() {
    const { author } = this.props.env;
    const { topics, opened, rating } = this.state;

    return (
      <div className={styles.home_view}>
        <div className={styles.cover}>
          <span className={styles.slogan}>
            &ldquo;Hi {author ? author.first_name : 'stranger'},<br />wanna be code high<br />with me?&rdquo;
          </span>
          {
            author ?
              <div className={styles.button_container}>
                <Link to='/compete' className={styles.button}>
                  COMPETE NOW
                </Link>
                <Link to='/topic/new' className={styles.button}>
                  PROPOSE A TOPIC
                </Link>
              </div> :
              <div className={styles.button_container}>
                <a href='#' onClick={this.props.signIn} className={styles.button}>
                  SIGN IN
                </a>
              </div>
          }
        </div>
        <div className={styles.topics}>
          <div className={styles.section}>
            <span>Topics</span>
          </div>
          {
            topics.map(topic => {
              return (
                <div className={styles.topic} key={topic._id}>
                  <div className={styles.title_row}>
                    <div className={styles.player}>
                      {
                        topic.author._id === author._id ?
                          <Link to={`/topic/${topic._id}`} className={classes(styles.title, styles.owned)}>
                            {topic.title}
                          </Link> :
                          <div className={styles.title}>
                            {topic.title}
                          </div>
                      }
                      <div className={styles.picture}
                           style={{ backgroundImage: `url(http://graph.facebook.com/${topic.author.fb_user_id}/picture?type=square)` }} />
                      <div className={styles.name}>
                        {topic.author.name}
                      </div>
                    </div>
                    <div className={styles.content}>
                      {topic.content}
                    </div>
                  </div>
                  {
                    topic.top_solutions.map((solution, i) => {
                      return (
                        <div className={styles.row} key={i}>
                          <div onClick={() => this.open(solution)}
                               className={classes(styles.player)}>
                            <div className={styles.picture}
                                 style={{ backgroundImage: `url(http://graph.facebook.com/${solution.author.fb_user_id}/picture?type=square)` }} />
                            <div className={styles.name}>
                              {solution.author.name}
                            </div>
                            {
                              <div className={styles.rating}>
                                <span className={styles.symbol}>⭐</span>
                                <span
                                  className={styles.number}>️{solution.average_stars ? solution.average_stars.toFixed(1) : 0}</span>
                              </div>
                            }
                          </div>
                          {
                            solution._id === opened &&
                            <AceEditor
                              className={styles.editor}
                              value={solution.code}
                              mode="javascript"
                              theme="monokai"
                              name="editor"
                              readOnly={true} />
                          }
                          {
                            solution._id === opened && author &&
                            <Rating stars={rating ? rating.stars : 0}
                                    rate={stars => this.rate(solution, stars)} />
                          }
                          {
                            solution._id === opened &&
                            <Comments href={`http://localhost:8080/${topic._id}/${solution._id}`}
                                      colorScheme='dark'
                                      className={styles.comment} />
                          }
                        </div>
                      );
                    })
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default HomeView;