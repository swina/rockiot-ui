<template>
    <div class="rockiot-wrapper">
        <div :class="classe" :style="'width:' + svgwidth + ';height:' + svgheight" @mouseover="showControl=!showControl" @mouseout="showControl=!showControl">
            
            <component :class="componentClass" :is="component" :component="component" :id="serial" :value="updatedValue" v-bind="_props" v-if="type==='gauge'"></component>
            
            <div v-if="variation!='radial' && type==='gauge'" :class="'rockiot-output-' + variation + ' rockiot-gauge-title'" :style="textStyle">{{name}} <div class="rockiot-gauge-limits" v-if="!! parseInt(minmax)">{{min}}:{{max}}</div></div>
            
            <div v-if="variation!='radial' && type==='gauge'" :class="'rockiot-output-' + variation + ' rockiot-gauge-units'" :style="textStyle">{{units}}</div>
            
            <div v-if="type==='gauge'" :id="'value-' + serial" :class="'rockiot-output-' + variation + ' rockiot-gauge-output'" :style="valueStyle">
                <div>{{parseInt(updatedValue)}}<small class="rockiot-output-dec" v-if="precision!='0'">.{{formatDec}}</small></div>
            </div>

            <rockiot-gauge-control v-bind="_props" :showControl="showControl" @startTest="clickGauge=!clickGauge" @viewChart="showChart=!showChart"></rockiot-gauge-control>
            
        </div>
        <div :class="chartClass + ' gauge-chart ' + variation + '-gauge-chart'" @click="showChart=!showChart">
            <component :is="chartComponent" :component="chartComponent" v-bind="_props" :value="updatedValue" />
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import RockiotGaugeControl from '@/components/rockiot.gauge.control.vue'

export default {
    name: 'RockiotGauge',
    components: {
        RockiotGaugeControl
    },
    data:()=>({
        updatedValue: 0,
        timer:{},
        showChart: false,
        showControl: false,
        clickGauge: false,
    }),
    computed:{
        classe(){
            if ( this.variation != 'linear' ){
                return 'rockiot-' + this.variation + ' rockiot-' + this.variation + '-' + this.orientation + ' rockiot-' + this.variation + '-' + this.serial
            } else {
                return this.gaugeClass + ' rockiot-' + this.variation + ' rockiot-' + this.variation + '-' + this.orientation + ' rockiot-' + this.variation + '-' + this.serial
            }
        },
        componentClass(){
            if ( !this.showChart ){ 
                return 'rockiot-gauge-' + this.variation + '-' + this.orientation
            } else {
                return 'rockiot-gauge-' + this.variation + '-' + this.orientation
            }
        },
        chartClass(){
            if ( !this.showChart && this.type != 'chart' ){
                return 'hide'
            } else {
                return ''
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
        component(){

            if ( this.variation === 'radial' ){
                return () => import ( /*webpackChunkName: "rockiot.gauges" */ '@/components/rockiot.radial.svg' )
            }

            if ( this.orientation === 'vertical' && this.variation === 'linear' ){
                return () => import ( /*webpackChunkName: "rockiot.gauges" */ '@/components/rockiot.linear.vertical.svg' )
            }
            if ( this.orientation === 'horizontal' && this.variation === 'linear' ){
                return () => import ( /*webpackChunkName: "rockiot.gauges" */ '@/components/rockiot.linear.horizontal.svg' )
            }
        },
        chartComponent(){
            return () => import ( /*webpackChunkName: "rockiot.gauges" */ '@/components/rockiot.chart.line.svg' )
        },
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
        'gauge-class'       : { type: String, required: false, default: '' },
        'bar-color'         : { type: String, required: false, default: '#444' },
        'bar-border-color'  : { type: String, required: false, default: 'transparent' },
        'progress-color'    : { type: String, required: false, default: '#00ff00' },
        'progress-border-color': { type: String, required: false, default: '#00ff00' },
        'scale-color'          : { type: String, required: false, default: '#aaa'},
        'scale-text-color'      : { type: String, required: false, default: '' },
        'needle-color'      : { type: String, required: false, default: '#777' },
        'needle-stroke'     : { type: String, required: false, default: '#000'},
        'text-color'        :  { type: String, required: false, default: '#777' },
        'value-color'       :   { type: String, required: false, default: '#777' },
        'value-bg'          :   { type: String, required: false, default: 'transparent' } ,
        'value-border'      :   { type: String, required: false, default: '0px solid #fac83c'},
        clickAction         :   { type: String, required: false, default: ''}
    },
    methods:{
        clicked(){
            console.log ( 'clicked')
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
        }
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
