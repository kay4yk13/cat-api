<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <span class="mr-2">Denis Klimovich, test</span>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://alexwohlbruck.github.io/cat-facts/docs/"
        target="_blank"
        text
      >
        <span class="mr-2">API Source</span>
        <v-icon>mdi-cat</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>

      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  data: () => ({
    //
  }),
  
});
</script>
