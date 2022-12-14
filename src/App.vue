<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark>
      <v-btn
        text
        @click="setLocale('en')">
        <span class="mr-2">
          EN
        </span>
      </v-btn>
      <span class="mr-2">
        /
      </span>
      <v-btn
        text
        @click="setLocale('ru')">
        <span class="mr-2">
          RU
        </span>
      </v-btn>
      <v-spacer />
      <div class="d-flex align-center">
        <span class="mr-3">{{$t('header')}}</span>
      </div>
      <v-spacer />

      <v-btn
        href="https://alexwohlbruck.github.io/cat-facts/docs/"
        target="_blank"
        text>
        <span class="mr-2">API Source</span>
        <v-icon>mdi-cat</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>

      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  methods: {
    setLocale(locale: string) {
      this.$i18n.locale = locale
      this.$vuetify.lang.current = locale
    }
  }
});
</script>
