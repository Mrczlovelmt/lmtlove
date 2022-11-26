import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入重置样式
import "@/assets/styles/reset.css"
// 引入UI框架的 按需加载
import { Dialog ,Button, Icon, Tab, Tabs,Sidebar,Popup , SidebarItem,NoticeBar,Tag,Rate,Card,Overlay,Divider} from 'vant';
// 引入UI框架的 css
import 'vant/lib/index.css';

Vue.use(Button).use(Icon).use(Tab).use(Tabs).use(Sidebar).use(SidebarItem).use(NoticeBar).use(Tag).use(Rate).use(Card).use(Overlay ).use(Divider ).use(Popup ).use(Dialog);

// 关闭vue的通用报错
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
