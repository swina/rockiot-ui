<template>
    <div :id="'rockiot-wrapper-' + serial"  class="rockiot-wrapper" :ref="'rockiot-ui-' + serial" @click="showControl=!showControl">
      <rockiot-ui-attributes  @attributes="setAttributes" v-bind="_props" v-if="settings && displayAttributes" :display="displayAttributes" @setting="settingsChanged=true"></rockiot-ui-attributes>
      <div v-if="type!='dashboard' && type != 'gauge' || variation === 'level' " class="rockiot-wrapper-title" :style="'color:' + this.textColor">{{name}} {{units}}</div>
      <div v-if="type!='dashboard'" :class="classe + ' rockiot-ui-' + type" :style="'background:' + chartBackground + ';'">

            <rockiot-ui-control
              v-bind="_props"
              :showControl="showControl"
              @startTest="clickGauge=!clickGauge"
              @setting="displayAttributes=!displayAttributes"
              @connect="$emit('connect')"
              @custom="emitAction"
              @fullscreen="fullscreen=!fullscreen,$emit('fullscreen')"></rockiot-ui-control>


            <component 
              v-if="type==='chart'" 
              :is="chartComponent" 
              :component="chartComponent" 
              :type="areaChart" 
              v-bind="_props" 
              :value="updatedValue" />

            <component 
              v-if="type==='gauge'" 
              :is="gaugeComponent" 
              :component="gaugeComponent"
              :setting="settingsChanged"
              @updated="settingsChanged=false"
              v-bind="elementAttributes" 
              :value="updatedValue"/>

            <rockiot-number-box 
              v-if="type==='number-box'" 
              v-bind="elementAttributes" 
              :value="updatedValue"/>
        </div>
        
    </div>
</template>

<script>
/* eslint-disable */
import RockiotUiControl from './rockiot.ui.control.vue'
import RockiotNumberBox from './rockiot.number.box.vue'
import RockiotUiAttributes from './rockiot.ui.attributes.vue'

export default {
    name: 'RockiotUI',
    components: {
        RockiotUiControl,
        RockiotNumberBox,
        RockiotUiAttributes
    },
    data:()=>({
        updatedValue: 0,
        timer:{},
        showChart: false,
        showControl: false,
        clickGauge: false,
        areaChart: false,
        action:'click',
        displayAttributes: false,
        elementAttributes: null,
        settingsChanged: false
    }),
    props: {
      serial              : { type: String, required: false, default: 'rockiot001'},
      type                : { type: String, required: false, default: 'gauge' },
      variation           : { type: String, required: false, default: '' },
      orientation         : { type: String, required: false, default: 'vertical' },
      name                : { type: String, required: false, default: 'Gauge'},
      min                 : { type: String, required: false, default: '0' },
      max                 : { type: String, required: false, default: '100' },
      value               : { type: String, required: false, default: '0' },
      precision           : { type: String, required: false, default: '2'},
      units               : { type: String, required: false, default: '%'},
      animation           : { type: String, required: false, default: '500' },
      svgwidth            : { type: String, required: false, default: '300' },
      svgheight           : { type: String, required: false, default: '300' },
      size                : { type: String, required: false, default: 'lg' },
      startangle          : { type: String, required: false, default: '135' },
      endangle            : { type: String, required: false, default: '45' },
      degree              : { type: String, required: false, default: '180'},
      radius              : { type: String, required: false, default: 'lg'},
      scale               : { type: String, required: false, default: '0' },
      smallscale          : { type: String, required: false, default: '0' },
      ticks               : { type: String, required: false, default: '10'},
      minorTicks          : { type: String, required: false, default: '0'},
      needle              : { type: String, required: false, default: '0'},
      zones               : { type: String, required: false, default: '' },
      'svg-style'         : { type: String, required: false, default: '' },
      'level-css'         : { type: String, required: false, default: 'background:#333;border:1rem solid #888;'},
      'text-color'        :  { type: String, required: false, default: '#777' },
      'bar-color'         : { type: String, required: false, default: '#444' },
      'bar-border-color'  : { type: String, required: false, default: 'transparent' },
      'progress-color'    : { type: String, required: false, default: '#00ff00' },
      'progress-border-color': { type: String, required: false, default: '#00ff00' },
      'value-color'       :   { type: String, required: false, default: '#777' },
      'value-bg'          :   { type: String, required: false, default: 'transparent' } ,
      'value-border'      :   { type: String, required: false, default: '0px solid #fac83c'},
      'value-class'       : { type: String, required: false, default: '' },
      'scale-color'       : { type: String, required: false, default: '#aaa'},
      'scale-text-color'  : { type: String, required: false, default: '#111' },
      'needle-color'      : { type: String, required: false, default: '#777' },
      'needle-stroke'     : { coerce: str => str.toString() , required: false, default: '#000'},
      'number-box-circle' : { coerce: str => parseInt(str) , default: 0 },
      'number-box-width'  : { type: String , coerce: str => str.toString() , default: '120px' },
      'chart-class'       : { type: String, required: false, default: '' },
      'chart-background'  : { type: String, required: false, default: 'none' },
      'chart-area'        : { required: false, default: '.3'},
      'chart-line'        : { required: false, default: '1' },
      'chart-point'       : { required: false, default: '0' },
      'chart-x-labels'    : { coerce: str => parseInt(str) , required:false, default: 1 },
      'chart-x-data'      : { coerce: str => str.toString() , required: false, default: 'count' }, //time,date possible
      'control-color'     : { type: String, required: false, default: '#cecece' },
      'control-bg'        : { type: String, required: false, default: 'none' },
      'control-icons'     : {  required: false, default: '' },
      'auto-color'        : { coerce: str => parseInt(str) , required: false, default: 0 },
      'auto-test'         : { coerce: str => parseInt(str) , default: 1 },
      clickAction         : { required: false, default: ''},
      'test-icon'         : { required: false, coerce: str => str.toString(), default: '1'},
      settings             : { coerce: str => parseInt(str) , required:false , default: 1 }
    },
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
          if ( this.variation === 'level' ){
            return () => import ( /*webpackChunkName: "build/rockiot.gauge.radial" */ './rockiot.level.gauge' )
          }
         
        },
        
        chartComponent(){
          //if ( this.type === 'chart' ){
          //  return () => import ( /*webpackChunkName: "build/rockiot.chart" */ './rockiot.chart.line.svg' )
          //}
          //if ( this.type === 'chartist' ){
            //return RockiotChart
            return () => import ( /*webpackChunkName: "build/rockiot.chart" */ './rockiot.charts.vue' )
          //}
        },
    },

    watch:{
        value(v){
            this.updatedValue = v
        },
        clickGauge(v){
            this.autoTest ? this.clicked() : null
        },
        autoTest(v){
          v ? this.clicked() : null
        }
    },
    
    methods:{
      emitAction(e){
        this.$emit(e)
      },
      setting(e){
        this.$emit(e)
      },
      connect(e){
        this.$emit(e)
      },
      setAttributes(a){
        this.displayAttributes =! this.displayAttributes
      },
      clicked(){
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
      }
    },
    mounted(){
      Number(this.value) < Number(this.min) ? this.updatedValue = Number(this.min) : Number(this.value) > Number(this.max) ? this.updatedValue = Number(this.max) : this.updatedValue = this.value
       if ( this.autoTest === '1' ){
        this.clicked()
      }
      this.elementAttributes = this._props
    }
}
</script>