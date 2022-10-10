import { createApp } from 'vue'
import { createRouter, createWebHistory } from  'vue-router'
import App from './App.vue'

import SheepGame from './components/connect-sheep'
import Cascade from './components/cascade'
import NetCloundMusic from './components/netcloud-music'
import HelloWorldVue from './components/HelloWorld.vue'

const routes = [
  { path: '/', component: HelloWorldVue },
  { path: '/cascade', component: Cascade },
  { path: '/netcloud', component: NetCloundMusic },
  { path: '/sheep', component: SheepGame }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

app.use(router)
app.mount('#app')
