/* Restaurant Store */

const namespaced = true;

const state = () => ({
  restaurants: [],
  notFound: false,
  error: null,
});

const getters = {
  restaurants: (state) => state.restaurants,
  restaurant: (state) => state.restaurant,
  error: (state) => state.error,
  notFound: (state) => state.notFound,
};

const mutations = {
  setRestaurants: (state, values) => state.restaurants = values,
  setRestaurant: (state, value) => state.restaurant = value,
  error: (state, value) => state.error = value,
  notFound: (state, value) => state.notFound = value,
};

const actions = {
  queryRestaurants: async ({ commit }, payload) => new Promise((resolve, reject) => {
    commit('notFound', false);
    commit('restaurants', []);
    const request = async () => {
      const keys = Object.keys(payload);
      let params = '';

      let parameterCount = 0;

      keys.map((key) => {
        if (payload[key] !== undefined) {
          if (payload[key] === 'false' || payload[key] === 'all') {
            return 0;
          }
          if (parameterCount === 0) {
            params = params.concat(`?${key}=${payload[key]}`);
            parameterCount++;
          } else {
            params = params.concat(`&${key}=${payload[key]}`);
            parameterCount++;
          }
          return 0;
        }
        return 0;
      });

      const apiUrl = `https://d1o8lt9womy1vs.cloudfront.net/restaurants${params}`;

      try {
        const response = await fetch(apiUrl,
          {
            Headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          });
        const json = response.json();
        const result = await json;
        commit('setRestaurants', result.data);
        commit('setCoordinates', result.coordinates, { root: true });
        commit('notFound', !result.data.length);
        return resolve();
      } catch (err) {
        commit('error', err);
        return reject(err);
      }
    };
    request();
  }),
};

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions,
};
