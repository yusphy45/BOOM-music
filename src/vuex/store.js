import Vue from 'vue';
import Vuex from 'vuex';
import * as mutationTypes from './mutation-types.js';

Vue.use(Vuex);

const state = {
  index: 0,
  playing: 0,
  showPlayer: false,
  loading: true
};

const mutations = {
  [mutationTypes['PLAY_MUTATION']](state, status) {
    state.playing = status;
  },
  [mutationTypes['CHOOSE_MUTATION']](state, index){
    state.index = index;
  },
  [mutationTypes['NEXT_MUTATION']](state) {
    state.index += 1;
  },
  [mutationTypes['PRE_MUTATION']](state) {
    state.index -= 1;
  },
  [mutationTypes['SHOWPLAYER_MUTATION']](state, status){
    state.showPlayer = status;
  },
  [mutationTypes['LOADING_MUTATION']](state, status){
    state.loading = status;
  }
};

export default new Vuex.Store({
  state,
  mutations
})