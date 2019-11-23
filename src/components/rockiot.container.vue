<template>
    <div class="rockiot-wrapper">
      <div class="rockiot-wrapper-title" :style="'color:' + this.textColor">{{name}} {{units}}</div>
      <div :class="classe + ' rockiot-ui-' + type" @click="showControl=!showControl">
            <rockiot-chart-control v-bind="_props" :showControl="showControl" @startTest="clickGauge=!clickGauge" @setting="areaChart=!areaChart"></rockiot-chart-control>
            <component v-if="type==='chart'" :is="chartComponent" :component="chartComponent" :type="areaChart" v-bind="_props" :value="updatedValue" />
            <component v-if="type==='gauge'" :is="gaugeComponent" :component="gaugeComponent" v-bind="_props" :value="updatedValue"/>
            <component v-if="type==='level'" :is="levelComponent" :component="levelComponent" v-bind="_props" :value="updatedValue"/>
            <rockiot-box-value v-if="type==='box'" v-bind="_props" :value="updatedValue"/>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import RockiotChartControl from './rockiot.gauge.control.vue'
import RockiotBoxValue from './rockiot.box.value.vue'

export default {
    name: 'RockiotUI',
    components: {
        RockiotChartControl,
        RockiotBoxValue
    },
    data:()=>({
        updatedValue: 0,
        timer:{},
        showChart: false,
        showControl: false,
        clickGauge: false,
        areaChart: false
    }),
    computed:{
        classe(){
            return this.chartClass + ' rockiot-' + this.type + '-' + this.serial
        },
        componentClass(){
            if ( !this.showChart ){
                return 'rockiot-gauge-' + this.variation + '-' + this.orientation
            } else {
                return 'rockiot-gauge-' + this.variation + '-' + this.orientation
            }
        },

        controlClass(){
            if ( !this.showControl ){
                return 'no-visible'
            } else {
                return ''
            }
        },
        formatDec(){
            let v = parseFloat(this.updatedValue).toFixed(this.precision).toString()
            let num = v.split('.')
            return num[1]
        },
        textStyle(){
            return 'color:' + this.textColor + ';'
        },
        valueStyle(){
            return 'color:' + this.valueColor + ';background:' + this.valueBg + ';border:' + this.valueBorder + ';'
        },
        gaugeComponent(){
          if ( this.variation === 'linear' && this.orientation === 'vertical' ){
            return () => import ( /*webpackChunkName: "build/rockiot.gauge.linear" */ './rockiot.linear.vertical.svg' )
          }
          if ( this.variation === 'linear' && this.orientation === 'horizontal' ){
            return () => import ( /*webpackChunkName: "build/rockiot.gauge.linear" */ './rockiot.linear.horizontal.svg' )
          }
          if ( this.variation === 'radial' ){
            return () => import ( /*webpackChunkName: "build/rockiot.gauge.radial" */ './rockiot.radial.svg' )
          }
        },
        chartComponent(){
            return () => import ( /*webpackChunkName: "build/rockiot.chart" */ './rockiot.chart.line.svg' )
        },
        levelComponent(){
          return () => import ( /*webpackChunkName: "build/rockiot.gauge.radial" */ './rockiot.level.gauge' )
        }
    },
    watch:{
        value(v){
            this.updatedValue = v
        },
        clickGauge(v){
            this.clicked()
        }
    },
    props: {
        serial              : { type: String, required: false, default: 'rockiot001'},
        name               : { type: String, required: false, default: 'Gauge'},
        type                : { type: String, required: false, default: 'gauge' },
        variation           : { type: String, required: false, default: 'radial' },
        degree              : { type: String, required: false, default: '180'},
        startangle          : { type: String, required: false, default: '135' },
        endangle            : { type: String, required: false, default: '45' },
        min                 : { type: String, required: false, default: '0' },
        max                 : { type: String, required: false, default: '100' },
        minmax              : { type: String, required: false, default: '1' },
        value               : { type: String, required: false, default: '0' },
        precision           : { type: String, required: false, default: '2'},
        units               : { type: String, required: false, default: '%'},
        scale               : { type: String, required: false, default: '0' },
        smallscale          : { type: String, required: false, default: '0' },
        ticks               : { type: String, required: false, default: '10'},
        minorTicks          : { type: String, required: false, default: '0'},
        needle              : { type: String, required: false, default: '0'},
        radius              : { type: String, required: false, default: 'lg'},
        size                : { type: String, required: false, default: 'lg' },
        orientation         : { type: String, required: false, default: 'vertical' },
        svgwidth            : { type: String, required: false, default: '300' },
        svgheight           : { type: String, required: false, default: '300' },
        'svg-style'         : { type: String, required: false, default: '' },
        animation           : { type: String, required: false, default: '500' },
        'chart-class'       : { type: String, required: false, default: '' },
        background          : { type: String, required: false, default: 'none' },
        'bar-color'         : { type: String, required: false, default: '#444' },
        'bar-border-color'  : { type: String, required: false, default: 'transparent' },
        'progress-color'    : { type: String, required: false, default: '#00ff00' },
        'progress-border-color': { type: String, required: false, default: '#00ff00' },
        'scale-color'          : { type: String, required: false, default: '#aaa'},
        'scale-text-color'  : { type: String, required: false, default: '#111' },
        'needle-color'      : { type: String, required: false, default: '#777' },
        'needle-stroke'     : { type: String, required: false, default: '#000'},
        'text-color'        :  { type: String, required: false, default: '#777' },
        'value-color'       :   { type: String, required: false, default: '#777' },
        'value-bg'          :   { type: String, required: false, default: 'transparent' } ,
        'value-border'      :   { type: String, required: false, default: '0px solid #fac83c'},
        'value-class'       : { type: String, required: false, default: '' },
        'control-color'     : { type: String, required: false, default: '#333' },
        'control-bg'        : { type: String, required: false, default: '#fff' },
        clickAction         :   { type: String, required: false, default: ''}
    },
    methods:{
        clicked(){
            if ( this.clickAction === 'test' ){
                let self = this

                if ( !this.timer[this.serial]){
                    this.timer[this.serial] = setInterval ( () => {
                        self.updatedValue= (Math.random() * (parseInt(self.max) - (parseInt(self.min))) + 1) + (parseInt(self.min))},1000)
                        if ( parseFloat(self.updatedValue) > self.max ){
                            self.updatedValue = self.max
                        }
                        if ( parseFloat(self.updatedValue) < self.min ){
                            self.updatedValue = self.min
                        }
                } else {
                    clearInterval(this.timer[this.serial])
                    this.timer[this.serial]= null
                }
            } else {
                this.$emit('click')
            }
        },

    },
    mounted(){
        if ( parseInt(this.value) > parseInt(this.max) ){
            this.updatedValue = 0
        } else {
            this.updatedValue = this.value
        }

    }
}
</script>
