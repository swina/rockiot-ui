<template>
  <div class="rockiot-box-value">
    <h2 :style="'color:' + this.$attrs.valueColor + ';' + style">
       <rockiot-animated-number 
          :ref="'num_' + this.$attrs.serial" 
          :precision="$attrs.precision" 
          :duration="$attrs.animation"
          :from="oldValue" 
          :to="$attrs.value" 
          @end="oldValue=$attrs.value"/>
    </h2> 
  </div>
</template>

<script>
/* eslint-disable */
import RockiotAnimatedNumber from './rockiot.animated.number.vue'
export default {
  name: 'RockiotBoxNumber',
  components: {
    RockiotAnimatedNumber
  },
  data:()=>({
    oldValue: 0,
  }),
  computed:{
    style(){
        return this.$attrs.valueBorder + ';background:' + this.$attrs.valueBg + ';'
    },
  },
}
</script>
