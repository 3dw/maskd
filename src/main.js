import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './registerServiceWorker'
import SuiVue from 'semantic-ui-vue'
import infiniteScroll from 'vue-infinite-scroll'

Vue.use(infiniteScroll)

Vue.use(SuiVue)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
