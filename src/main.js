import Vue from "vue";
import App from "./App.vue";
import store from "./api/store.js"
Vue.config.productionTip = false;

App.store = store;
new Vue({
	render: h => h(App)
}).$mount("#app");
