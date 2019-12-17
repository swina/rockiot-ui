<template>
  <div class="rockiot-box-value">
    <div class="rockiot-number-box-wrapper" :style="'color:' + this.$attrs.valueColor + ';' + style">
       <rockiot-animated-number 
          :ref="'num_' + this.$attrs.serial" 
          :precision="$attrs.precision" 
          :duration="$attrs.animation"
          :from="oldValue" 
          :to="$attrs.value" 
          @end="oldValue=$attrs.value"/>
    </div> 
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
        let borderRadius = ''
        if ( this.$attrs.numberBoxCircle ){
          borderRadius = 'border-radius:99rem;'
        }
        return 'width:' + this.$attrs.numberBoxWidth + ';height:' + this.$attrs.numberBoxWidth + ';border:' + this.$attrs.valueBorder + ';background:' + this.$attrs.valueBg + ';' + borderRadius
    },
  },
}
</script>
<style scoped>
.rockiot-number-box-wrapper {
  display:flex;
  align-items:center;
  justify-content:center;
  margin-top:1.5rem;
}

.rockiot-number-box-wrapper > span {
  font-size:2rem;
}
</style>
