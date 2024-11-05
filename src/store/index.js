import Vue from 'vue';
import Vuex from 'vuex';
import axiosClient from '../utils/axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state() {
    return {
      branches: []
    }
  },
  getters: {
    getAllBookableBranches(state) {
      return state.branches?.filter((branch) => !!branch.accepts_reservations);
    },
    getAllDisabledBranches(state) {
      return state.branches?.filter((branch) => !branch.accepts_reservations);
    }
  },
  mutations: {
    setBranches(state, payload) {
      state.branches = payload;
    }
  },
  actions: {
    async fetchBranches({ commit }) {
      try {
        const response = await axiosClient.get('/api/branches?include[0]=sections&include[1]=sections.tables');
        commit('setBranches', response.data?.data);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
      }
    },
    // eslint-disable-next-line no-unused-vars
    async updateBranch(_, { id, payload }) {
      try {
        await axiosClient.put(`/api/branches/${id}`, payload);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
      }
    }
  }
});
