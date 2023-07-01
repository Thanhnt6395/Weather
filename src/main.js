import { createApp } from 'vue'
import './style.css'
import router  from './router'
import store from './store'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass, faWind, faDroplet, faHouseTsunami, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faHouseTsunami, faMagnifyingGlass, faWind, faDroplet, faCaretDown, faCaretUp)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(router)
.use(store)
.mount('#app')
