import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import en from 'vuetify/src/locale/en'
import ru from 'vuetify/src/locale/ru'

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { en, ru },
    current: 'en',
  },
})


