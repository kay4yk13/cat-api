<template>
  <div>
    <v-select
          :items="[1,2,3,4,5]"
          v-model="numberOfFacts"
          label="Standard"
        ></v-select>
    <v-btn @click="getCatFacts">Get Cat Facts</v-btn>
    <v-data-table
      :headers="headers"
      :items="facts"
      hide-default-footer
      class="elevation-1">
      <template v-slot:item.details="{ item }">
      <v-icon
        small
        class="mr-2"
        color="blue"
        @click="seeDetails(item)"
      >
        mdi-information-outline
      </v-icon>
    </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'CatFactsTable',
  data() {
    return {
      numberOfFacts: 5,
      facts: [],
      headers: [
        {
          text: 'Details',
          align: 'start',
          value: 'details',
        },
        { text: 'Fact Id', value: '_id' },
        { text: 'User Id', value: 'user' },
        { text: 'Fact text', value: 'text' },
        { text: 'Data Updated At', value: 'createdAt' },
        { text: 'Data Created At', value: 'updatedAt' },
        { text: 'V', value: '__v' },
        { text: 'Source', value: 'user' },
        { text: 'Animal Type', value: 'type' },
        { text: 'Is Deleted', value: 'deleted' },
        { text: 'Is Used', value: 'used' },
        { text: 'Status', value: 'status' },
      ],
    }
  },


  components: {
  },

  mounted() {
    this.fetchCats()
  },
  methods: {
    fetchCats() {
      this.$store.dispatch('fetchData')
    },
    getCatFacts() {
      this.facts = this.$store.getters['getCatFacts'](this.numberOfFacts)
    },
    seeDetails(text:string) {
      console.log("🚀 | text", text)
      
    }
  }
})
</script>
