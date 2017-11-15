import React from 'react';
import { classes } from '/common/util';
import styles from './stylesheet.scss';

class Player extends React.Component {
  render() {
    const { player, onClick, className } = this.props;

    return (
      <div onClick={onClick}
           className={classes(styles.player, player.given_up_at && styles.given_up, player.submitted_at && styles.submitted, className)}
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
          player.average_stars &&
          <div className={styles.rating}>
            <span className={styles.symbol}>⭐</span>
            <span className={styles.number}>{player.average_stars.toFixed(1)}</span>
          </div>
        }
      </div>
    );
  }
}

export default Player;

