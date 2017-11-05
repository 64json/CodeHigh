import mongoose from 'mongoose';
import db from '/common/db';
import { authorPlugin } from '/models/plugins';

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const modelName = 'Rating';
const ratingSchema = new Schema({
  solution: { type: ObjectId, ref: 'Solution', required: true },
  stars: { type: Number, required: true, min: 1, max: 5, validate: Number.isInteger },
});
ratingSchema.index({ solution: 1, authors: 1 });

ratingSchema.plugin(authorPlugin, {
  authorsField: true,
  set: {
    owner: true,
  },
  get: {
    guest: true,
  },
  remove: {
    owner: true,
  }
});

const Rating = db.model(modelName, ratingSchema);
export default Rating;