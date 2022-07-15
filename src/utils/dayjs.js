import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
// 引入相对时间的包
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')
// console.log(dayjs().to(dayjs('2021-01-01')))
// console.log(dayjs().format('YYYY-MM-DD'))
// 过滤器
Vue.filter('relativeTime', (value) => {
  return dayjs().to(dayjs(value))
})
