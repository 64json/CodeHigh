import React from 'react';
import { connect } from 'react-redux';
import { actions as envActions } from '/reducers/env';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import Cookies from 'js-cookie/src/js.cookie';
import { Login } from 'react-facebook';
import { CompeteView, HomeView, TopicView } from '/views';
import { AuthApi, UserApi } from '/apis';
import styles from './stylesheet.scss';
import { classes } from '/common/util';

@withRouter
@connect(
  ({ env }) => ({
    env
  }), {
    ...envActions
  }
)
class App extends React.Component {
  componentDidMount() {
    if (Cookies.get('token')) {
      UserApi.getUser('me')
        .then(res => this.props.setAuthor(res.user));
    }
  }

  signIn(data) {
    const fb_access_token = data.tokenDetail.accessToken;
    AuthApi.createAuth({ fb_access_token })
      .then(() => UserApi.getUser('me'))
      .then(res => this.props.setAuthor(res.user));
  }

  signOut() {
    AuthApi.destroyAuth()
      .then(() => this.props.setAuthor(null));
  }

  render() {
    const { author } = this.props.env;
    const home = this.props.location.pathname === '/';
    return (
      <div className={classes(styles.app, home && styles.home)}>
        <header className={styles.header}>
          <Link to='/' className={styles.title}>
            <span>CodeHigh</span>
          </Link>
          <div className={styles.space} />
          {
            author ?
              <a href='#' className={styles.sign_in} onClick={() => this.signOut()}>
                Sign Out
              </a> :
              <Login
                onResponse={data => this.signIn(data)}>
                <a href='#' className={styles.sign_in}>
                  Sign In
                </a>
              </Login>
          }
        </header>
        <Switch>
          <Route exact path="/"
                 component={(routeProps) => <HomeView {...routeProps} signIn={data => this.signIn(data)} />} />
          <Route path="/compete" component={CompeteView} />
          <Route path="/topic/:topic_id" component={TopicView} />
        </Switch>
      </div>
    );
  }
}

export default App;

