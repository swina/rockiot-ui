<template>
  <div :ref="'chart-' + $attrs.serial" :id="'chart-' + $attrs.serial" :style="'width:' + chart.options.width + 'px;height:' + chart.options.height + 'px'" :value="$attrs.value" class="rockiot-chart-wrapper">
    <GChart
      :settings="{ packages: ['corechart','line'] }"
      :type="cType"
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
    n: 1,
    chart: {
      data: [
          ['Time','Data'],
          ['0',0]
      ],
      options: {
        width:350,
        height:230,
        title: 'chart',
        chartArea: {width: '88%', height: '75%'},
        areaOpacity: .2,
        curveType: 'function',
        subtitle: '',

        animation:{
          duration: 500,
          easing: 'out',
        },
        colors: ['black','black'],
        backgroundColor: { fill: 'none' },
        titleTextStyle : { color: '#eaeaea'},
        legend: 'none',
        vAxis : {
          textStyle: { color: '#ababab' },
          gridlines: { color: 'none' },
          baseline: { color: '#ababab'},
        },
        hAxis : {
          textStyle: { color: '#ababab'},
          format: 'hh:mm:ss'
        }
      }

    }
  }),
  computed:{
    cType(){
      if ( this.$attrs.variation === 'area' ){
        return 'AreaChart'
      }
      return 'LineChart'
    }
  },
  watch:{
    '$attrs.value'(v){
      this.n++
      if ( this.n > 20 ){
        this.chart.data.splice(1,1)
      }
      let d = new Date()
      this.chart.data.push([d.getHours()+':'+d.getMinutes()+':'+d.getSeconds(),parseFloat(v)])
    }
  },

  mounted(){
    this.chart.options.colors = [this.$attrs.progressColor,this.$attrs.progressColor]
    this.chart.data[0] = ['Time', this.$attrs.value ]
    this.chart.options.title = ''//this.$attrs.name + ' - ' + this.$attrs.units
    this.chart.options.substitle = this.$attrs.units
    //this.chart.data[0].push(['1',this.$attrs.value])
    this.chart.options.width = parseInt(this.$attrs.svgwidth)
    this.chart.options.height = parseInt(this.$attrs.svgheight)
    this.chart.options.titleTextStyle.color = this.$attrs.textColor
    this.chart.options.vAxis.textStyle.color = this.$attrs.scaleTextColor
    this.chart.options.hAxis.textStyle.color = this.$attrs.scaleTextColor
    this.chart.options.backgroundColor.fill = this.$attrs.background
  }
}
</script>
