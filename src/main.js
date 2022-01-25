import Vue from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import VueRouter from 'vue-router'

import Painting from './components/Painting.vue';
import Statues from './components/Statues.vue';
import Statue from './components/Statue.vue';

Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
  {
    path: "/",
    component: Painting
  },
  {
    path: "/statues",
    component: Statues
  },
  {
    path: "/statues/:id",
    component: Statue
  }
];

const router = new VueRouter({
  routes
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
