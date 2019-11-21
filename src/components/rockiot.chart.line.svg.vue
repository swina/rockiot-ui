<template>
  <div :ref="'chart-' + $attrs.serial" :id="'chart-' + $attrs.serial" :style="'width:' + chart.options.width + 'px;height:' + chart.options.height + 'px'" :value="$attrs.value" class="rockiot-chart-wrapper">
    <GChart
      :settings="{ packages: ['corechart'] }"
      type="AreaChart"
      :data="chart.data"
      :options="chart.options"
    />
  </div>
</template>

<script>
import { GChart } from 'vue-google-charts'

export default {
  name: 'rockiot-line-chart',
  components: {
    GChart
  },
  data:()=>({
    n: 0,
    chart: {
      data: [
          ['Time','Data'],
          ['0',0]
      ],
      options: {
        width:350,
        height:230,
        title: 'chart',
        curveType: 'function',
        subtitle: '',
        
        animation:{
          duration: 500,
          easing: 'out',
        },
        colors: ['black','black'],
        backgroundColor: { fill: 'none' }
      }
      
    }
  }),
  watch:{
    '$attrs.value'(v){
      this.n++
      if ( this.n > 20 ){
        this.chart.data.splice(1,1)
      } 
      this.chart.data.push([this.n.toString(),parseFloat(v)]) 
    }
  }, 
  
  mounted(){
    this.chart.options.colors = [this.$attrs.progressColor,this.$attrs.progressColor]
    this.chart.data[0] = ['Time', this.$attrs.name + ' - ' + this.$attrs.units ]
    this.chart.options.title = this.$attrs.name
    this.chart.options.substitle = this.$attrs.units
    this.chart.data.push(['1',this.$attrs.value])
    
  }
}
</script>
