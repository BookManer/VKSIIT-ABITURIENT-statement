import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Home from './views/Home.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.use(Vuelidate);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(Home),
}).$mount('#app');
