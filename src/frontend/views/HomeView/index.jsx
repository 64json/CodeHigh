import React from 'react';
import styles from './stylesheet.scss';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { TopicApi } from '/apis';
import { classes } from '/common/util';
import AceEditor from 'react-ace';
import 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

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
    };
  }

  componentDidMount() {
    TopicApi.allTopics({ populate: 'top_solutions.authors' })
      .then(({ topics }) => {
        this.setState({ topics });
      });
  }

  render() {
    const { author } = this.props.env;

    return (
      <div className={styles.home_view}>
        <div className={styles.cover}>
          <span className={styles.slogan}>
            &ldquo;Hi {author ? author.first_name : 'stranger'},<br />wanna be code high<br />with me?&rdquo;
          </span>
          {
            author ?
              <Link to='/compete' className={styles.join}>
                COMPETE NOW
              </Link> :
              <a href='#' onClick={this.props.signIn} className={styles.join}>
                SIGN IN
              </a>
          }
        </div>
        <div className={styles.ranking}>
          <div className={styles.title}>
            <span>Rankings</span>
          </div>
          {
            this.state.topics.map(topic => {
              const { top_solutions } = topic;
              return (
                <div className={styles.topic} key={topic._id}>
                  <div className={styles.content}>
                    {topic.content}
                  </div>
                  {
                    top_solutions.map((solution, i) => {
                      const [user] = solution.authors;
                      return (
                        <div className={styles.row} key={i}>
                          <div onClick={() => this.setState({ opened: solution._id })}
                               className={classes(styles.player)}>
                            <div className={styles.picture}
                                 style={{ backgroundImage: `url(http://graph.facebook.com/${user.fb_user_id}/picture?type=square)` }} />
                            <div className={styles.name}>
                              {user.name}
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
                            solution._id === this.state.opened &&
                            <AceEditor
                              className={styles.editor}
                              value={solution.code}
                              mode="javascript"
                              theme="monokai"
                              name="editor"
                              readOnly={true} />
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