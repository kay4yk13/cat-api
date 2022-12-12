import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import * as api from '@/api';

Vue.use(Vuex)
Vue.use(VueAxios, axios)


export default new Vuex.Store({
  state: {
    facts: [],
    date: null
  },
  getters: {
    getCatFacts: (state) => (num: number) => {
    return state.facts.slice(0, num)
  }
},
  mutations: {
    SET_FETCHED_FACTS:(state, data) => state.facts = data
  },
  actions: {
    fetchData({state, commit}) {
      Vue.axios.get(api.default.cats)
      .then((response) => {
        commit('SET_FETCHED_FACTS', response.data)})
      .catch((e) =>
      console.log(e))
  },},
  modules: {
  }
})
