import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import store from './store';
import HomePage from './pages/HomePage.vue';
import EditPage from './pages/EditPage.vue';
import './assets/tailwind.css';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/edit/:branchId',
    name: 'EditBranch',
    component: EditPage
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

new Vue({
  store,
  render: h => h(App),
  router,
}).$mount('#app');
