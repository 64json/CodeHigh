import mongoose from 'mongoose';
import db from '/common/db';
import { authorPlugin } from '/models/plugins';
import { Testcase } from './nested';

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const modelName = 'Topic';
const topicSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  time: { type: Number, required: true, min: 1, validate: Number.isInteger },
  testcases: { type: [Testcase], default: [] },
  top_solutions: [{ type: ObjectId, ref: 'Solution', required: true }],
  author: { type: ObjectId, ref: 'User' },
});

topicSchema.plugin(authorPlugin, {
  authorField: true,
  set: {
    none: ['top_solutions'],
  },
  insert: {
    user: true,
  },
  modify: {
    owner: true,
  },
  get: {
    guest: true,
  },
  remove: {
    owner: true,
  }
});

const Topic = db.model(modelName, topicSchema);
export default Topic;