import Vue from 'vue'
import App from './App'

//
import './assets/css/main.css';
import 'vue-loading-overlay/dist/vue-loading.css';

new Vue({
    el: '#app',
    render: h => h(App)
})
