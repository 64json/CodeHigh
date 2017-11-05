import mongoose from 'mongoose';
import db from '/common/db';
import { authorPlugin } from '/models/plugins';

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const modelName = 'Testcase';
const testcaseSchema = new Schema({
  topic: { type: ObjectId, ref: 'Topic', required: true },
  eval: { type: String, required: true },
  public: { type: Boolean, required: true },
});

testcaseSchema.plugin(authorPlugin, {
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

const Testcase = db.model(modelName, testcaseSchema);
export default Testcase;