import React from 'react';
import { classes } from '/common/util';
import styles from './stylesheet.scss';

class Rating extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      stars: null,
    };
  }

  onMouseEnter(stars) {
    this.setState({ stars });
  }

  onMouseLeave() {
    this.setState({ stars: null });
  }

  render() {
    const { stars: orig_stars, rate } = this.props;
    const { stars: temp_stars } = this.state;

    return (
      <div className={styles.rating}>
        {
          [1, 2, 3, 4, 5].map(stars => {
            const disabled = temp_stars ? stars > temp_stars : orig_stars ? stars > orig_stars : true;
            return (
              <div key={stars}
                 className={classes(styles.star, disabled && styles.disabled)}
                 onMouseEnter={() => this.onMouseEnter(stars)} onMouseLeave={() => this.onMouseLeave()}
                 onClick={() => rate(stars)}>
                <span>⭐️</span>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default Rating;

