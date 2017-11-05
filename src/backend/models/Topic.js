import mongoose from 'mongoose';
import db from '/common/db';
import { authorPlugin } from '/models/plugins';

const { Schema } = mongoose;

const modelName = 'Topic';
const topicSchema = new Schema({
  content: { type: String, required: true },
  time: { type: Number, required: true, min: 1, validate: Number.isInteger },
});

topicSchema.plugin(authorPlugin, {
  set: {
    none: true,
  },
  get: {
    guest: true,
  },
  remove: {
    none: true,
  }
});

const Topic = db.model(modelName, topicSchema);
export default Topic;