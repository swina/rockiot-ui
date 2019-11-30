<template>
  <span>
      {{outputNumber}}
  </span>
</template>

<script>
/* eslint-disable */
import { tween } from 'shifty'

export default {
  name: 'RockiotAnimatedNumber',
  data:()=>({
    oldValue: 0,
    aniValue:0,
    outputNumber:0
  }),
  watch:{
      '$attrs.to'(v){
        this.aniValue = v 
        this.tweenNumber()
      },
  },
  methods:{
    output(v){
      this.outputNumber = parseFloat(v.x).toFixed(parseInt(this.$attrs.precision))
    },
    tweenNumber(){
      if ( this.oldValue != this.aniValue ){
        tween({
                from: { x: parseFloat(this.oldValue) },
                to: { x: parseFloat(this.aniValue) },
                duration: parseInt(this.$attrs.duration),
                easing: 'easeOutQuad',
                step: state => this.output(state)
            }).then(res=>{
                this.oldValue = this.aniValue
                this.$emit('end',this.oldValue)
        })
      }
    }
  },
  beforeMount(){
    this.oldValue = parseFloat(this.$attrs.from)  
    this.aniValue = parseFloat(this.$attrs.to)
    this.tweenNumber()
  }
}
</script>
