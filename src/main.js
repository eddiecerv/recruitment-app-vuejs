import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router';

import HighchartsVue from 'highcharts-vue';
import App from './App.vue'

import MenuNavigation from './components/MenuNavigation.vue';
import AppFooter from './components/AppFooter.vue';

import { Chart } from 'highcharts-vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/** Routes */

const routes = [
    { path: '/', name: 'Home', component: () => import('./pages/home/HomePage.vue') },
    { path: '/jobs', name: 'Jobs', component: () => import('./pages/jobs/JobsPage.vue') },
    { path: '/about', name: 'About', component: () => import('./pages/about/AboutPage.vue') },
    { path: '/sign-up', name: 'Sign Up', component: () => import('./pages/sign-up/SignUpPage.vue') },
    { path: '/sign-in', name: 'Sign In', component: () => import('./pages/sign-in/SignInPage.vue') },
    { path: '/app', name: 'App', component: () => import('./app/modules/MainModule.vue'), children: [
        { path: '', name: 'Dashboard App', component: () => import('./app/modules/dashboard/DashboardModule.vue') },
        { path: 'jobs', name: 'Jobs App', component: () => import('./app/modules/jobs/JobsModule.vue') },
        { path: 'profile', name: 'Profile App', component: () => import('./app/modules/profile/ProfileModule.vue') },
    ]}
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

const app = createApp(App);
app.use(router);
app.use(HighchartsVue);

app.component('menu-navigation', MenuNavigation);
app.component('app-footer', AppFooter);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component('high-charts', Chart);
app.mount('#app');