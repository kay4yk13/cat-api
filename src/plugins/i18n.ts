import Vue from 'vue';
import VueI18n from 'vue-i18n';

import {ru, en} from 'vuetify/src/locale/'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale:'ru',
  messages: {
    en:{
      numOfReq: "How many facts do you want?"
    },
    ru:{
      numOfReq: "Сколько интересных фактов нужно загрузить?"
    }
  }
})