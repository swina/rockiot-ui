import Vue from 'vue'
import vueCustomElement from 'vue-custom-element'
import RockiotContainer from './components/rockiot.container.vue'
import VueAnimateNumber from 'vue-animate-number'
Vue.use(VueAnimateNumber)
//import 'tui-chart/dist/tui-chart.css'
import './assets/rockiot.ui.css'
import './plugins/rockiot.radial'
/* eslint-disable no-new */
Vue.use(vueCustomElement)
Vue.customElement('rockiot-ui', RockiotContainer)

Vue.config.productionTip = false
