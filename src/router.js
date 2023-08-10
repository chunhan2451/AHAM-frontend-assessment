import { createRouter, createWebHistory } from 'vue-router';
import FundListComponent from './components/Fund/FundList.vue';
import FundDetailsComponent from './components/Fund/FundDetails.vue';

const routes = [
  { path: '/', redirect: '/fund' },
  { path: '/fund', component: FundListComponent },
  { path: '/fund/:id', component: FundDetailsComponent, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;