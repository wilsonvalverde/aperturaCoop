import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VModal from 'vue-js-modal'
import VueSession from 'vue-session'
import * as VueGoogleMaps from "vue2-google-maps"
Vue.use(VueAxios, axios);
Vue.use(VModal)
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyA7-hEfL1yYS2oN42TxFkqn2ZxSEmOyXvk",
    libraries: "places"
  }
});
Vue.use(VueSession)
// MapBox Styles
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')



