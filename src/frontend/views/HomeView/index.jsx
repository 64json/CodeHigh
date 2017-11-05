import React from 'react';
import styles from './stylesheet.scss';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

@withRouter
@connect(
  ({ env }) => ({
    env
  })
)
class HomeView extends React.Component {

  render() {
    const { author } = this.props.env;

    return (
      <div className={styles.home_view}>
        <div className={styles.cover}>
          <span className={styles.slogan}>
            &ldquo;Hi {author ? author.first_name : 'stranger'},<br />wanna be code high<br />with me?&rdquo;
          </span>
          <Link to='/compete' className={styles.join}>
            COMPETE NOW
          </Link>
        </div>
      </div>
    );
  }
}

export default HomeView;