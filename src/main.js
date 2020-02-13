import Vue from 'vue'
import App from './App.vue'
import Toasted from 'vue-toasted';
import * as VueGoogleMaps from 'vue2-google-maps';
import Vuetify from 'vuetify/lib';

Vue.use(Toasted, {
  position: 'bottom-right',
  duration: 3000,
});

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD2lZOI3utqwni0qO22gsKlEj0biVlREFg',
    libraries: 'places',
  },
});

Vue.config.productionTip = false

Vue.use(Vuetify)

new Vue({
  vuetify: new Vuetify({
    theme: { dark: true },
  }),
  data: () => ({
    drawer: null,
  }),
  render: h => h(App)
}).$mount('#app')
