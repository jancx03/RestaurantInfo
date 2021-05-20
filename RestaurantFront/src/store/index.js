/* eslint-disable no-shadow */
import { createStore } from 'vuex';
import restaurantStore from './restaurant.js';

const modules = { restaurantStore };

const state = () => ({
  coordinates: [],
});

const getters = {
  coordinates: (state) => state.coordinates,
};

const actions = {};

const mutations = {
  setCoordinates: (state, coordinates) => state.coordinates = coordinates,
};

export default createStore({
  modules,
  state,
  getters,
  actions,
  mutations,
});
