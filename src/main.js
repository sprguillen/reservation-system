import Vue from 'vue';
import VueRouter from 'vue-router';
import VueToast from 'vue-toast-notification';
import App from './App.vue';
import store from './store';
import HomePage from './pages/HomePage.vue';
import EditPage from './pages/EditPage.vue';
import './assets/tailwind.css';
import 'vue-toast-notification/dist/theme-bootstrap.css';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueToast);

const routes = [
  {
    path: '/',
    component: HomePage,
    meta: { title: 'Reservation System - Home Page' }
  },
  {
    path: '/edit/:branchId',
    name: 'EditBranch',
    component: EditPage,
    meta: { title: 'Reservation System - Edit Branch' }
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Reservation System';
  next();
});

new Vue({
  store,
  render: h => h(App),
  router,
}).$mount('#app');
