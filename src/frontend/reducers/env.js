import { createAction, handleActions } from 'redux-actions';

const prefix = 'ENVIRONMENT';

const setAuthor = createAction(`${prefix}/SET_AUTHOR`, author => ({ author }));

export const actions = {
  setAuthor,
};

const immutables = {};

const mutables = {
  author: null,
};

export default handleActions({
  [setAuthor]: (state, { payload }) => ({
    ...state,
    ...payload,
  }),
}, {
  ...immutables,
  ...mutables,
});
