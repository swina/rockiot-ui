import Vue from 'vue'
import vueCustomElement from 'vue-custom-element'
import RockiotContainer from '@/components/rockiot.container.vue'
import '@/assets/rockiot.gauge.css'
/* eslint-disable no-new */
Vue.use(vueCustomElement)
Vue.customElement('rockiot-gauge', RockiotContainer)

Vue.config.productionTip = false