import mongoose from 'mongoose';
import db from '/common/db';
import { authorPlugin } from '/models/plugins';

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const modelName = 'Solution';
const solutionSchema = new Schema({
  topic: { type: ObjectId, ref: 'Topic', required: true },
  time: { type: Number, required: true },
  code: { type: String, required: true },
});

solutionSchema.plugin(authorPlugin, {
  authorsField: true,
  insert: {
    user: true,
  },
  modify: {
    none: true,
  },
  get: {
    guest: true,
  },
  remove: {
    none: true,
  }
});

const Solution = db.model(modelName, solutionSchema);
export default Solution;