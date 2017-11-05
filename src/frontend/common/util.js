const classes = (...arr) => arr.filter(v => v).join(' ');

const nn = x => x < 10 ? `0${x}` : x;

const isUser = author => author;
const isSelf = (author, doc) => author && author._id.equals(doc._id);

export {
  classes,
  nn,
  isUser,
  isSelf,
};