import * as mutations from './mutation-types.js';

const makeAction = type => {
  return ({ dispatch }, ...args) => dispatch(type, ...args)
};

export const toggle = makeAction(mutations.PLAY_MUTATION);
export const next = makeAction(mutations.NEXT_MUTATION);
export const pre = makeAction(mutations.PRE_MUTATION);
export const choose = makeAction(mutations.CHOOSE_MUTATION);
export const displayPlayer = makeAction(mutations.SHOWPLAYER_MUTATION);
export const loaded = makeAction(mutations.LOADING_MUTATION);
