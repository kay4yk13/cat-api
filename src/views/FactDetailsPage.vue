<template>
  <v-container class="grey lighten-5">
    <v-btn color="primary" @click="goBack">
      <v-icon>mdi-undo</v-icon>
      {{$t('goBack')}}
    </v-btn>
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="6"
        md="4">
        <v-card
          class="pa-2"
          outlined
          tile>
          <h3>{{$t('funFact')}}</h3>
          <v-img
            contain
            max-height="500px"
            src="https://cataas.com/cat?width=500"></v-img>
        </v-card>
      </v-col>
      <v-col
        cols="6"
        md="8">
        <v-card
          class="pa-2"
          outlined
          tile>
          <v-banner
            color="primary"
            elevation="22"
            icon="mdi-information-outline">{{ singleFact.text }}</v-banner>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    {{$t('title')}}
                  </th>
                  <th class="text-left">
                    {{$t('value')}}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(value, key) in singleFact"
                  :key="key">
                  <td>{{ $t(`tableHeaders.${key}`) }}</td>
                  <td class="value">{{ value }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'FactDetails',

  data() {
    return {
      singleFact: {},
    }
  },

  props: {
    id: { type: String, required: true }
  },

  mounted() {
    this.getSingleFact()
  },

  methods: {
    getSingleFact() {
      this.singleFact = this.$store.getters['getSingleFact'](this.id)
    },
    goBack() {
      this.$router.go(-1)
    }
  }
})


</script>

<style scoped>
.value {
  text-decoration: solid;
  font-size: medium;
}
</style>