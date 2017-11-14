import React from 'react';
import styles from './stylesheet.scss';

class Testcases extends React.Component {
  render() {
    const { errors } = this.props;

    return (
      <div className={styles.testcases}>
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
    );
  }
}

export default Testcases;

