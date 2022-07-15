import Vue from 'vue'
import vant from '@/plugins/vant.js'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入less
import '@/styles/index.less'
// 引入自定义主题
import '@/styles/theme.less'
// 引入vant样式，自定义主题的时候换成less
import 'vant/lib/index.less'
// 动态设置 REM 基准值
import 'amfe-flexible'
// 引入组件
// import request from '@/utils/request'
// 引入自定义组件
import ToutiaoIcon from '@/components/ToutiaoIcon'
// 注册全局组件
// 引入dayjs
import '@/utils/dayjs'
Vue.component('ToutiaoIcon', ToutiaoIcon)
// 引入vant.js
Vue.config.productionTip = false
Vue.use(vant)
// request.get('/v1_0/channels').then((res) => {
//   console.log(res.data.data.channels)
// })
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
