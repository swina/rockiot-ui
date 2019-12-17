import Vue from 'vue'
import vueCustomElement from 'vue-custom-element'
import RockiotContainer from './components/rockiot.container.vue'
import RockiotAnimatedNumber from './components/rockiot.animated.number.vue'
import './assets/rockiot.ui.css'
import './assets/rockiot.chart.css'
import './plugins/rockiot.radial'

Vue.use(vueCustomElement)
Vue.customElement('rockiot-ui', RockiotContainer)
Vue.component('rockiot-animated-number',RockiotAnimatedNumber)

Vue.config.productionTip = false
