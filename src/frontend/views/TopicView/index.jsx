import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import AceEditor from 'react-ace';
import { connect } from 'react-redux';
import 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import styles from './stylesheet.scss';
import { classes, nn } from '/common/util';
import chai from 'chai';
import randomstring from 'randomstring';
import { TopicApi } from '../../apis/index';
import { Player, Testcases } from '/components';

@withRouter
@connect(
  ({ env }) => ({
    env
  })
)
class TopicView extends React.Component {
  constructor(props) {
    super(props);

    const { topic_id } = props.match.params;
    this.state = {
      topic_id,
      errors: null,
      code: null,
      topic: {
        title: '',
        content: '',
        time: 180,
        testcases: [],
      },
    };
  }

  componentDidMount() {
    const { topic_id } = this.state;
    if (topic_id !== 'new') {
      TopicApi.getTopic(topic_id)
        .then(({ topic }) => this.setState({ topic }))
        .catch(console.error);
    }
  }

  onChange(value) {
    this.setState({ code: value });
  }

  run() {
    const { code, topic } = this.state;
    if (code === null || code === '') return;
    const { expect } = chai;
    const errors = topic.testcases.map(testcase => {
      try {
        eval(code + ';' + testcase.eval);
      } catch (err) {
        return err;
      }
    });
    this.setState({ errors });
  }

  updateTopic(change) {
    this.setState({
      topic: {
        ...this.state.topic,
        ...change,
      }
    });
  }

  updateTestcase(testcase_tid, change) {
    const testcases = [...this.state.topic.testcases];
    const index = testcases.findIndex(testcase => testcase._tid === testcase_tid);
    testcases[index] = {
      ...testcases[index],
      ...change,
    };
    this.updateTopic({ testcases });
  }

  removeTestcase(testcase_tid) {
    const testcases = [...this.state.topic.testcases];
    const index = testcases.findIndex(testcase => testcase._tid === testcase_tid);
    testcases.splice(index, 1);
    this.updateTopic({ testcases });
  }

  onMinuteChange(e) {
    const minute = Number(e.target.value) % 100;
    const time = minute * 60 + this.state.topic.time % 60;
    if (isNaN(time)) return;
    this.updateTopic({ time });
  }

  onSecondChange(e) {
    let second = Number(e.target.value) % 100;
    if (second >= 60) second %= 10;
    const time = (this.state.topic.time / 60 | 0) * 60 + second;
    if (isNaN(time)) return;
    this.updateTopic({ time });
  }

  onTitleChange(e) {
    const title = e.target.value;
    this.updateTopic({ title });
  }

  onContentChange(e) {
    const content = e.target.value;
    this.updateTopic({ content });
  }

  addTestcase() {
    this.updateTopic({
      testcases: [
        ...this.state.topic.testcases,
        {
          _tid: randomstring.generate(),
          eval: '',
          public: true,
        }
      ]
    });
  }

  save() {
    const { topic_id, topic } = this.state;
    const promise = topic_id === 'new' ?
      TopicApi.addTopic(topic) :
      TopicApi.updateTopic(topic_id, topic);
    promise
      .then(() => this.setState({ topic_id: null }))
      .catch(console.error);
  }

  remove() {
    const { topic_id } = this.state;
    if (topic_id === 'new') {
      this.setState({ topic_id: null });
    } else {
      TopicApi.deleteTopic(topic_id)
        .then(() => this.setState({ topic_id: null }))
        .catch(console.error);
    }
  }

  render() {
    const { author } = this.props.env;
    const {
      topic_id,
      errors,
      code,
      topic
    } = this.state;

    if (!author || !topic_id) return <Redirect to='/' />;

    const disabled =
      topic.title === '' ||
      topic.content === '' ||
      topic.testcases.length === 0 ||
      topic.testcases.some(testcase => testcase.eval === '');

    return (
      <div className={styles.topic_view}>
        <div className={styles.status}>
          <input className={styles.time} type='text' value={nn(topic.time / 60 | 0)}
                 onChange={e => this.onMinuteChange(e)} />
          :
          <input className={styles.time} type='text' value={nn(topic.time % 60)}
                 onChange={e => this.onSecondChange(e)} />
        </div>
        <div className={styles.problem_panel}>
          <input className={styles.title} type='text' value={topic.title} onChange={e => this.onTitleChange(e)}
                 placeholder='Title' />
          <textarea className={styles.content} onChange={e => this.onContentChange(e)} rows={4}
                    value={topic.content} placeholder='Description' />
          {
            topic.testcases.map(testcase => (
              <div className={styles.sample} key={testcase._tid}>
                <AceEditor
                  className={styles.editor}
                  value={testcase.eval || ''}
                  onChange={value => this.updateTestcase(testcase._tid, { eval: value })}
                  mode="javascript"
                  theme="monokai"
                  name="editor" />
                <div className={styles.control}>
                  <label className={styles.visible}>
                    <input type='checkbox' checked={testcase.public}
                           onChange={e => this.updateTestcase(testcase._tid, { public: e.target.checked })} />
                    <span>Visible</span>
                  </label>
                  <a href='#' className={styles.remove} onClick={() => this.removeTestcase(testcase._tid)}>Remove</a>
                </div>
              </div>
            ))
          }
          <div className={classes(styles.button, styles.add_testcase)} onClick={() => this.addTestcase()}>
            <span>Add a Testcase</span>
          </div>
          <div className={styles.toolbar}>
            <a href='#' className={classes(styles.button, styles.save, disabled && styles.disabled)}
               onClick={() => this.save()}>
              <span>Save</span>
            </a>
            <a href='#' className={classes(styles.button, styles.remove)} onClick={() => this.remove()}>
              <span>Remove</span>
            </a>
          </div>
        </div>
        <div className={styles.status_panel}>
          <span>1. Write the title and description of the problem.</span>
          <span>2. Add testcases using <a href='http://chaijs.com/api/bdd/' target='_blank'>Chai</a>.</span>
          <span>3. (Optional) Write a solution to test the testcases.</span>
          <span>4. Set the timer according to the difficulty of the problem.</span>
          <span>5. Click 'Save' button.</span>
        </div>
        <div className={styles.ide_panel}>
          <Player className={styles.player} player={{ user: author }} />
          <AceEditor
            className={styles.editor}
            value={code || ''}
            onChange={value => this.onChange(value)}
            mode="javascript"
            theme="monokai"
            name="editor" />
          <div className={styles.toolbar}>
            <a href='#' className={classes(styles.button, styles.run)} onClick={() => this.run()}>
              <span>Run</span>
            </a>
          </div>
          {
            errors &&
            <Testcases errors={errors} />
          }
        </div>
      </div>
    );
  }
}

export default TopicView;