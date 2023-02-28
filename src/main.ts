import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/tailwind-light/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faDice, faHome, faGear, faPlus, faTrophy, faCircleNotch } from '@fortawesome/free-solid-svg-icons'

const app = createApp(App)
const pinia = createPinia()
library.add(faDice, faHome, faGear, faPlus, faTrophy, faCircleNotch)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(pinia)

pinia.use(({ store }) => {
  store.router = markRaw(router)
})


app.use(router)
app.use(PrimeVue, {ripple: true})

app.mount('#app')
