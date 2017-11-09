import React from 'react';
import styles from './stylesheet.scss';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { TopicApi } from '/apis';
import { Comments, Login } from 'react-facebook';
import { classes } from '/common/util';
import AceEditor from 'react-ace';
import 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import { Rating } from '/components';
import { RatingApi, SolutionApi } from '../../apis/index';

const limit = 5;

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
      .then(({ topics }) => {
        for (const topic of topics) {
          topic.no_more = topic.top_solutions.length < limit;
        }
        this.setState({ topics })
      })
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

  updateTopic(topic_id, change) {
    const topics = JSON.parse(JSON.stringify(this.state.topics));
    const topic = topics.find(topic => topic._id === topic_id);
    Object.assign(topic, change);
    this.setState({ topics });
  }

  rate(topic, solution, stars) {
    SolutionApi.rateSolution(solution._id, { stars })
      .then(() => SolutionApi.allSolutions({
        topic: topic._id,
        sort: '-average_stars',
        limit: topic.top_solutions.length,
        populate: 'author',
      }))
      .then(({ top_solutions }) => this.updateTopic(topic._id, { top_solutions }))
      .catch(console.error);
  }

  loadMore(topic) {
    this.updateTopic(topic._id, { no_more: true });
    SolutionApi.allSolutions({
      topic: topic._id,
      sort: '-average_stars',
      skip: topic.top_solutions.length,
      limit,
      populate: 'author',
    })
      .then(({ solutions }) => this.updateTopic(topic._id, {
        top_solutions: [...topic.top_solutions, ...solutions],
        no_more: solutions.length < limit,
      }))
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
                <Login
                  onResponse={this.props.signIn}>
                  <a href='#' className={styles.button}>
                    SIGN IN
                  </a>
                </Login>
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
                        author && author._id === topic.author._id ?
                          <Link to={`/topic/${topic._id}`} className={classes(styles.title, styles.owned)}>
                            {topic.title}
                          </Link> :
                          <div className={styles.title}>
                            {topic.title}
                          </div>
                      }
                      <div className={styles.space} />
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
                      const is_opened = solution._id === opened;
                      return (
                        <div className={classes(styles.row, is_opened && styles.opened)} key={i}>
                          <div onClick={() => this.open(solution)}
                               className={styles.player}>
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
                            is_opened &&
                            <AceEditor
                              className={styles.editor}
                              value={solution.code}
                              mode="javascript"
                              theme="monokai"
                              name="editor"
                              readOnly={true} />
                          }
                          {
                            is_opened && author &&
                            <Rating stars={rating ? rating.stars : 0}
                                    rate={stars => this.rate(topic, solution, stars)} />
                          }
                          {
                            is_opened &&
                            <Comments href={`http://codehigh.net/${topic._id}/${solution._id}`}
                                      colorScheme='dark'
                                      className={styles.comment} />
                          }
                        </div>
                      );
                    })
                  }
                  {
                    !topic.no_more &&
                    <div className={styles.load_more} onClick={() => this.loadMore(topic)}>
                      <span>Load More</span>
                    </div>
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