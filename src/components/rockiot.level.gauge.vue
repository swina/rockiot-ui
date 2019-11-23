<template>
  <div :class="$attrs.gaugeClass" :ref="$attrs.serial" :width="$attrs.svgwidth" :height="$attrs.svgwidth" :id="$attrs.serial" :style="'width:'+$attrs.svgwidth+'px;height:'+$attrs.svgheight+'px;' + $attrs.svgStyle" :value="$attrs.value">
    <div class="rockiot-gauge-level-wrapper">
      <div class="rockiot-level" :style="level"></div>
      <div class="rockiot-mask" :style="'height:' + mask + '%'"></div>
      <svg style="position:absolute;top:0;left:0" width="100%" height="100%">
        <circle cx="110" cy="110" r="105" :stroke="levelStroke" fill="none"/>
      </svg>
      <!--<div class="rockiot-level-border"></div>-->
    </div>
    <div class="rockiot-level-value" :style="'color:' + this.$attrs.valueColor"><animate-number :ref="'num_' + $attrs.serial" :from="oldValue" :to="aniValue" :duration="$attrs.animation" :animate-end="animateEnd" :formatter="formatter"></animate-number></div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'RockiotGaugeLevel',
  data:()=>({
    perc:0,
    oldValue: 0,
    aniValue:0,
    range:100
  }),
  watch:{
      '$attrs.value'(v){

          this.animateReset(v)
      },
  },
  computed:{
    mask(){
      let pc = this.normalize(parseFloat(this.$attrs.value))
      console.log ( 'mask=>' , pc )
      return (100-pc)
    },
    level(){
      if ( parseInt(this.$attrs.value) < 30 && parseInt(this.$attrs.value) > 15 ){
        return 'background:#ff8800'
      }
      if ( parseInt(this.$attrs.value) < 15 ){
        return 'background:#ff0000'
      }
      if ( parseInt(this.$attrs.value) > 75 ){
        return 'background:#00ff00'
      }
      return 'background:' + this.$attrs.progressColor
    },
    levelStroke(){
      if ( parseInt(this.$attrs.value) < 15 ){
        return '#ff0000'
      }
      return '#000'
    }
  },
  methods:{
    animateReset(v){
      this.aniValue = parseInt(v)
      this.$refs['num_' + this.$attrs.serial].reset(this.oldValue,v)
      this.$refs['num_' + this.$attrs.serial].start()
    },
    animateEnd(){
      if ( this.oldValue != 0 ){
        this.oldValue = this.$attrs.value
      }
    },
    formatter(num){
      return num.toFixed(this.$attrs.precision)
    },
    normalize(val){
      return (Number(val) + (parseInt(this.$attrs.min)*-1))/(this.range)*100
    }
  },
  beforeMount(){
    this.range = Number(this.$attrs.max) - Number(this.$attrs.min)
    this.aniValue = parseInt(this.$attrs.value)
    this.perc = this.normalize(parseFloat(this.$attrs.value))
    console.log ( 'perc=>' , this.perc )
  },
  mounted(){

  }
}
</script>
