import Vue from 'vue'
import Router from 'vue-router'
import App from "./App";

Vue.use(Router)

export default new Router({
    mode: "history",
    base: "/src/refactor-this",
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: App
        }
    ]


})
