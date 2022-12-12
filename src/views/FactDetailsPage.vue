<template>

  <v-container class="grey lighten-5">
    <v-btn color="primary" @click="goBack">
      <v-icon>mdi-undo</v-icon>
      Go back
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
          <h3>fun fact</h3>
          <v-img
          contain
          max-height="500px"
            src="https://cataas.com/cat?width=600"></v-img>
        </v-card>
      </v-col>
      <v-col
        cols="6"
        md="8">
        <v-card
          class="pa-2"
          outlined
          tile>
          {{ singleFact }}
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
      // factId: 2
    }
  },

  props: {
    id: { required: true }
  },

  mounted() {
    this.getSingleFact(this.id)
  },

  methods: {
    getSingleFact(id: string) {
      this.singleFact = this.$store.getters['getSingleFact'](id)
    },
    goBack() {
      this.$router.go(-1)
    }
  }
})


</script>

<style scoped>

</style>