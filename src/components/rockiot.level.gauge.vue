<template>
  <div :class="$attrs.gaugeClass" :ref="$attrs.serial" :width="$attrs.svgwidth" :height="$attrs.svgwidth" :id="$attrs.serial" :style="'width:'+$attrs.svgwidth+'px;height:'+$attrs.svgheight+'px;' + $attrs.svgStyle" :value="$attrs.value">
    <div class="rockiot-gauge-level-wrapper" :style="'background:' + $attrs.barColor">
      <svg :ref="'rockiot-gauge-level-' + $attrs.serial" width="100%" height="100%">
        <linearGradient :id="'lg-'+$attrs.serial" x1="0.5" y1="1" x2="0.5" y2="0">
            <stop offset="0%" stop-opacity="1" :stop-color="level"/>
            <stop :offset="mask +'%'" stop-opacity="1" :stop-color="level">
              <animate attributeName="offset" values="0;1;0" repeatCount="1" dur="1s" begin="0s"/>
            </stop>
            <stop :offset="mask +'%'" stop-opacity="0" :stop-color="level">
              <animate attributeName="offset" values="0;1;0" repeatCount="1" dur="1s"  begin="0s"/>
            </stop>
            <stop offset="100%" stop-opacity="0" :stop-color="level"/>
        </linearGradient>
        <circle cx="50%" cy="50%" r="48%" :fill="'url(#lg-' + $attrs.serial + ')'" :stroke="$attrs.barBorderColor" stroke-width="8"/>
      </svg>
    </div>
    <div class="rockiot-level-value" :style="'color:' + this.$attrs.valueColor">
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
  name: 'RockiotGaugeLevel',
  components: {
    RockiotAnimatedNumber
  },
  data:()=>({
    perc:0,
    oldValue: 0,
    maskV:0,
    aniValue:0,
    range:100,
    border:'',
    colors:null,
    ranges:null
  }),
  computed:{
    mask(){
      let pc = this.normalize(parseFloat(this.$attrs.value))
      if ( pc < 10 ){
        this.border = 'border-bottom-left-radius:2rem;border-bottom-right-radius:2rem;'
      } else {
        this.border = ''
      }
      return (pc)
    },
    container(){
      return this.$attrs.levelCss
    },
    level(){
      if ( this.$attrs.autoColor ){
        if ( parseInt(this.$attrs.value) < 25 && parseInt(this.$attrs.value) > 10 ){
          return '#ff8800'
        }
        if ( parseInt(this.$attrs.value) < 10 ){
          return '#ff0000'
        }
        if ( parseInt(this.$attrs.value) > 75 ){
          return '#00ff00'
        }
      }
      return this.$attrs.progressColor
    },
    levelStroke(){
      if ( parseInt(this.$attrs.value) < 15 ){
        return '#ff0000'
      }
      return '#000'
    }
  },
  methods:{
    normalize(val){
      return (Number(val) + (parseInt(this.$attrs.min)*-1))/(this.range)*100
    }
  },
  beforeMount(){
    this.range = Number(this.$attrs.max) - Number(this.$attrs.min)
    this.aniValue = parseInt(this.$attrs.value)
    this.perc = this.normalize(parseFloat(this.$attrs.value))
    if ( this.$attrs.progressColor.split(';').length > 1 ){
      this.colors = this.$attrs.progressColor.split(';')[1]
      this.ranges = this.$attrs.progressColor.split(';')[0]
    } else {
      this.colors = this.$attrs.progressColor
    }
  }
}
</script>
