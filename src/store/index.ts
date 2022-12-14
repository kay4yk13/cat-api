import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import * as api from '@/api';

Vue.use(Vuex)
Vue.use(VueAxios, axios)

declare interface Facts {
  [propName: string]: any
}

export default new Vuex.Store({
  state: {
    // In next code polish iteration we can save last successful response
    // But now having some backup hardcoded values will provide stability on API failure case
    backupHardcodedFacts: [
      {
        "status": {
          "verified": true,
          "sentCount": 1
        },
        "_id": "58e008800aac31001185ed07",
        "user": "58e007480aac31001185ecef",
        "text": "Wikipedia has a recording of a cat meowing, because why not?",
        "__v": 0,
        "source": "user",
        "updatedAt": "2020-08-23T20:20:01.611Z",
        "type": "cat",
        "createdAt": "2018-03-06T21:20:03.505Z",
        "deleted": false,
        "used": false
      },
      {
        "status": {
          "verified": true,
          "sentCount": 1
        },
        "_id": "58e008630aac31001185ed01",
        "user": "58e007480aac31001185ecef",
        "text": "When cats grimace, they are usually \"taste-scenting.\" They have an extra organ that, with some breathing control, allows the cats to taste-sense the air.",
        "__v": 0,
        "source": "user",
        "updatedAt": "2020-08-23T20:20:01.611Z",
        "type": "cat",
        "createdAt": "2018-02-07T21:20:02.903Z",
        "deleted": false,
        "used": false
      },
      {
        "status": {
          "verified": true,
          "sentCount": 1
        },
        "_id": "58e00a090aac31001185ed16",
        "user": "58e007480aac31001185ecef",
        "text": "Cats make more than 100 different sounds whereas dogs make around 10.",
        "__v": 0,
        "source": "user",
        "updatedAt": "2020-08-23T20:20:01.611Z",
        "type": "cat",
        "createdAt": "2018-02-11T21:20:03.745Z",
        "deleted": false,
        "used": false
      },
      {
        "status": {
          "verified": true,
          "sentCount": 1
        },
        "_id": "58e009390aac31001185ed10",
        "user": "58e007480aac31001185ecef",
        "text": "Most cats are lactose intolerant, and milk can cause painful stomach cramps and diarrhea. It's best to forego the milk and just give your cat the standard: clean, cool drinking water.",
        "__v": 0,
        "source": "user",
        "updatedAt": "2020-08-23T20:20:01.611Z",
        "type": "cat",
        "createdAt": "2018-03-04T21:20:02.979Z",
        "deleted": false,
        "used": false
      },
      {
        "status": {
          "verified": true,
          "sentCount": 1
        },
        "_id": "58e008780aac31001185ed05",
        "user": "58e007480aac31001185ecef",
        "text": "Owning a cat can reduce the risk of stroke and heart attack by a third.",
        "__v": 0,
        "source": "user",
        "updatedAt": "2020-08-23T20:20:01.611Z",
        "type": "cat",
        "createdAt": "2018-03-29T20:20:03.844Z",
        "deleted": false,
        "used": false
      }
    ],
    facts: [] as Facts[],
    headers: [
      { text: 'status.verified', value: 'status.verified' },
      { text: 'status.sentCount', value: 'status.sentCount' },
      { text: '_id', value: '_id' },
      { text: 'user', value: 'user' },
      { text: 'text', value: 'text' },
      { text: '__v', value: '__v' },
      { text: 'source', value: 'source' },
      { text: 'type', value: 'type' },
      { text: 'createdAt', value: 'createdAt' },
      { text: 'updatedAt', value: 'updatedAt' },
      { text: 'deleted', value: 'deleted' },
      { text: 'used', value: 'used' }],

    selectedHeaders: [],
    factsQty:5
  },
  getters: {
    //In case of changing structure of API response
    // getHeaders: (state) => {
    //   let arr: string[] = []
    //   Object.entries(state.facts[0]).forEach(
    //     ([key, value]) => {
    //       if (typeof value != 'object') {
    //         arr.push(key)
    //       }
    //       else {
    //         Object.entries(value).forEach(e => {
    //           arr.push(`${key}.${e[0]}`)
    //         })
    //       }
    //     }
    //   )
    //   return arr
    // },

    getHeaders: (state) => {
      return state.headers
    },
    getSelectedHeaders: (state) => {
      return state.selectedHeaders
    },
    getFactsQty: (state) => {
      return state.factsQty
    },
    getCatFactsList: (state) => {
      return state.facts
    },
    getCatFactsItem: (state) => (id: string) => {
      return state.facts.find(fact => fact._id === id)
    },
  },

  mutations: {
    SET_FETCHED_FACTS: (state, data) => state.facts = data,
    SET_SELECTED_HEADERS: (state, arr) => state.selectedHeaders = arr,
    SET_FACTS_QUANTITY:(state, qty) => state.factsQty = qty,
    SET_BACKUP_FACTS: (state) => state.facts = state.backupHardcodedFacts,
  },

  actions: {
    setSelectedHeaders({ commit }, arr) {
      commit('SET_SELECTED_HEADERS', arr)
    },
    setFactsQty({ commit }, qty) {
      commit('SET_FACTS_QUANTITY', qty)
    },
    fetchData({ commit }, qty: number) {
      return new Promise((resolve, reject) => {
        Vue.axios.get(qty !=5 ? api.default.getCatsFactsLimited(qty) : api.default.getCatsFacts)
          .then((response) => {
            resolve(response);
            commit('SET_FETCHED_FACTS', response.data)
          })
          .catch((e) => {
            commit('SET_BACKUP_FACTS')
            reject(e)
          }
          )
      })
    },
  },
})
