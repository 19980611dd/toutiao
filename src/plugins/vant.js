import {
  NavBar,
  Form,
  Field,
  Button,
  Toast,
  CountDown,
  Tabbar,
  TabbarItem,
  Cell,
  Icon,
  Image,
  Grid,
  GridItem,
  Popup,
  Dialog,
  Tab,
  Tabs,
  List,
  PullRefresh,
  Search,
  Tag,
  Loading,
  Divider,
  ImagePreview,
  Picker,
  DatetimePicker
} from 'vant'
const elsments = [
  NavBar,
  Form,
  Field,
  Button,
  Toast,
  CountDown,
  Tabbar,
  TabbarItem,
  Cell,
  Icon,
  Image,
  Grid,
  GridItem,
  Popup,
  Dialog,
  Tab,
  Tabs,
  List,
  PullRefresh,
  Search,
  Tag,
  Loading,
  Divider,
  Picker,
  ImagePreview,
  DatetimePicker
]

export default function (Vue) {
  elsments.forEach((item) => Vue.use(item))
}
