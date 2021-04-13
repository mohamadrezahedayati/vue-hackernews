import Vue from 'vue'
import App from './App'
import { fetchListData } from './api/api'
import ProgressBar from './components/ProgressBar'

Vue.config.productionTip = false

function getTopItems () {
  return fetchListData('top')
    .then(items => items)
}

const bar = new Vue(ProgressBar).$mount()
Vue.prototype.$bar = bar
document.body.appendChild(bar.$el)

getTopItems().then((items) => {
  window.items = items
  new Vue({
    el: '#app',
    render: h => h(App)
  })
})
