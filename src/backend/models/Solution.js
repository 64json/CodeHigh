import mongoose from 'mongoose';
import db from '/common/db';
import { authorPlugin } from '/models/plugins';
import Topic from './Topic';
import Rating from './Rating';

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const modelName = 'Solution';
const solutionSchema = new Schema({
  topic: { type: ObjectId, ref: 'Topic', required: true },
  time: { type: Number, required: true },
  code: { type: String, required: true },
  average_stars: { type: Number },
  author: { type: ObjectId, ref: 'User' },
});

solutionSchema.plugin(authorPlugin, {
  authorField: true,
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

solutionSchema.methods.rate = function (stars, author) {
  const solution = this;
  const { topic } = solution;
  const query = { solution, author };
  const body = { solution, stars, author };
  return Rating.findOneAndUpdate(query, body, { upsert: true })
    .then(() => Rating.aggregate([{
      $match: { solution: new mongoose.Types.ObjectId(solution._id) }
    }, {
      $group: { _id: null, average_stars: { $avg: '$stars' } }
    }]))
    .then(([{ average_stars }]) => {
      solution.average_stars = average_stars;
      return solution.force().save();
    })
    .then(() => Solution.find({ topic }).sort({ average_stars: -1 }).limit(10))
    .then(top_solutions => Topic.findByIdAndUpdate(topic, { $set: { top_solutions } }))
    .then(() => solution);
};

const Solution = db.model(modelName, solutionSchema);
export default Solution;