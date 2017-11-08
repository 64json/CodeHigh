import mongoose from 'mongoose';

const { Schema } = mongoose;

const testcaseSchema = new Schema({
  eval: { type: String, required: true },
  public: { type: Boolean, required: true },
});

testcaseSchema.options.toJSON = {
  transform: (doc, ret, options) => {
    delete ret._id;
    return ret;
  }
};

export default testcaseSchema;