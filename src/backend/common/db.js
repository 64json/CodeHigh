import mongoose from 'mongoose';
import { mongoUri } from '/environment';
import { codeHighPlugin } from '/models/plugins';

mongoose.Promise = global.Promise;
mongoose.plugin(codeHighPlugin);
const db = mongoose.createConnection(mongoUri);

export default db;
