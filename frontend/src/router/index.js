import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import MessageSent from '../views/MessageSent.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  }, {
    path: '/message_sent',
    name: 'MessageSent',
    component: MessageSent, 
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
