<template>
  <div class="rockiot-box-value">
    <h2 :style="'color:' + this.$attrs.valueColor"><animate-number :ref="'num_' + $attrs.serial" :from="oldValue" :to="aniValue" :duration="$attrs.animation" :animate-end="animateEnd" :formatter="formatter"></animate-number></h2>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'RockiotBoxNumber',
  data:()=>({
    oldValue: 0,
    aniValue:0
  }),
  watch:{
      '$attrs.value'(v){
        console.log ( v )
          this.animateReset(v)
      },
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
  },
  beforeMount(){
    this.aniValue = parseInt(this.$attrs.value)
  },
  mounted(){
    console.log ( this.$attrs.value )
  }
}
</script>
