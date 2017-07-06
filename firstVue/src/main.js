import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App.vue'
import goods from './components/goods/goods.vue'
import ratings from './components/ratings/ratings.vue'
import seller from './components/seller/seller.vue'

import './common/css/index.scss'

Vue.use(VueRouter);
Vue.use(VueResource);

var routes = [
  {path: '/goods', component: goods},
  {path: '/ratings', component: ratings},
  {path: '/seller', component: seller}
];
var router = new VueRouter({
  'linkActiveClass': 'active', // 重命名路由选中目标，默认class
  routes
});
var main = new Vue({
  components: {App},
  router
}).$mount('#app');
router.push('/goods');// 设置默认进入的子路由页面
export default main;
