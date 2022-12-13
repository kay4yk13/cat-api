<template>
  <v-container class="grey lighten-5">

    <v-row align="center">
      <v-col
        cols="12"
        sm="3">
        <v-select
          :items="[1, 2, 3, 4, 5]"
          v-model="numberOfFacts"
          :label="$t('numOfReq')"></v-select>
      </v-col>

      <v-col
        cols="12"
        sm="3">
        <v-btn
          @click="getCatFacts">
          Get Cat Facts
        </v-btn>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-btn
        color="primary"
        dark
        @click.stop="dialog = true">
        Open Dialog
      </v-btn>
    </v-row>

    <!--!!Modal headers selector-->
    <v-dialog
      v-model="dialog"
      max-width="600"
      @click:outside="dialog = false"
      >
      <v-card>
        <v-card-title class="text-h5">
          Select headers of cat facts
        </v-card-title>

        <v-card-text>
          <template>
            <v-data-table
              v-model="selectedHeaders"
              :items="headersSource"
              :headers="headersForHeadersSelectModal"
              :single-select=false
              item-key="text"
              show-select
              hide-default-footer
              :items-per-page="15"
              class="elevation-1">
            </v-data-table>
          </template>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            @click="applyHeadersSelect"
            applyHeadersSelect>
            Save preset
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--!!Facts table-->
    <v-data-table
      v-if="selectedHeaders.length > 1"
      :headers="processedSelectedHeaders"
      :items="facts"
      hide-default-footer
      class="elevation-1">
      <template v-slot:item.details="{ item }">
        <router-link :to="{ name: 'fun fact', params: { id: item._id } }">
          <v-icon
            small
            class="mr-3"
            color="blue">
            mdi-information-outline
          </v-icon>
        </router-link>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
declare interface Header {
  text: string,
  value: string
}

export default Vue.extend({
  name: 'CatFactsTable',

  data() {
    return {
      numberOfFacts: 5,
      facts: [],
      dialog: false,
      headersSource: [
        { text: 'Fact Id', value: '_id' },
        { text: 'User Id', value: 'user' },
        { text: 'Fact text', value: 'text' },
        { text: 'Data Updated At', value: 'createdAt' },
        { text: 'Data Created At', value: 'updatedAt' },
        { text: 'V', value: '__v' },
        { text: 'Source', value: 'source' },
        { text: 'Animal Type', value: 'type' },
        { text: 'Is Deleted', value: 'deleted' },
        { text: 'Is Used', value: 'used' },
        { text: 'Sent Count', value: 'status.sentCount' },
        { text: 'Verified', value: 'status.verified' }] as Header[],
      selectedHeaders: [] as Header[],
      headersForHeadersSelectModal: [
        { text: 'Key by API', value: 'value' },
        { text: "Explanation", value: "text" }
      ] as Header[]
    }
  },

  computed: {
    processedSelectedHeaders(): Header[] {
      let col = [{
        text: 'Details',
        value: 'details',
      }]
      return col.concat(this.selectedHeaders)
    }
  },

  mounted() {
    this.selectedHeaders = this.headersSource
    // this.fetchCats()
  },

  methods: {
    fetchCats() {
      this.$store.dispatch('fetchData')
    },
    getCatFacts() {
      this.facts = this.$store.getters['getCatFacts'](this.numberOfFacts)
    },
    applyHeadersSelect() {
      this.$store.dispatch('saveHeaderPreset', this.selectedHeaders)
    }
  },
})
</script>
