<template>
  <div>
    {{singleFact}}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'FactDetails',

  data() {
    return {
      singleFact: {}
    }
  },

  props: {
    factId: {}
  },

  mounted() {
    this.getSingleFact(this.factId)
  },
  
  methods: {
    getSingleFact(id: string) {
      this.singleFact = this.$store.getters['getSingleFact'](id)
    }
  }
})


</script>

<style scoped>

</style>