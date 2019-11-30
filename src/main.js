import Vue from 'vue'
import vueCustomElement from 'vue-custom-element'
import RockiotContainer from './components/rockiot.container.vue'
import RockiotAnimatedNumber from './components/rockiot.animated.number.vue'
//import VueAnimateNumber from 'vue-animate-number'
import './assets/rockiot.ui.css'
import './plugins/rockiot.radial'

//Vue.use(VueAnimateNumber)
Vue.use('rockiot-animated-number',RockiotAnimatedNumber)
//import 'tui-chart/dist/tui-chart.css'

/* eslint-disable no-new */
Vue.use(vueCustomElement)
Vue.customElement('rockiot-ui', RockiotContainer)

Vue.config.productionTip = false
