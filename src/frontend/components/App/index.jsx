import React from 'react';
import { connect } from 'react-redux';
import { actions as envActions } from '/reducers/env';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import Cookies from 'js-cookie/src/js.cookie';
import { CompeteView, HomeView } from '/views';
import './stylesheet.scss';
import { AuthApi, UserApi } from '/apis';
import styles from './stylesheet.scss';

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

  signIn() {
    FB.login(response => {
      if (response.authResponse) {
        const fb_access_token = response.authResponse.accessToken;
        AuthApi.createAuth({ fb_access_token })
          .then(() => UserApi.getUser('me'))
          .then(res => this.props.setAuthor(res.user));
      }
    });
  }

  signOut() {
    AuthApi.destroyAuth()
      .then(() => this.props.setAuthor(null));
  }

  render() {
    const { author } = this.props.env;
    return (
      <div className={styles.app}>
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
              <a href='#' className={styles.sign_in} onClick={() => this.signIn()}>
                Sign In
              </a>
          }
        </header>
        <Switch>
          <Route exact path="/" component={HomeView} />
          <Route path="/compete" component={CompeteView} />
        </Switch>
      </div>
    );
  }
}

export default App;

