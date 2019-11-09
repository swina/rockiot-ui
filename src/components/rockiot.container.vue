<template>
    <div :class="variation + ' ' + orientation">
        <!--<rockiot-svg-gauge :value="value" v-bind="_props" :id="serial" v-if="variation==='radial'"></rockiot-svg-gauge>
        <rockiot-svg-linear :value="value" v-bind="_props" :id="serial" v-if="variation==='linear'"></rockiot-svg-linear>-->
        <component :is="component" :component="component" :id="serial" :value="value" v-bind="_props"></component>
        <!--<component :is="component" :component="component" :id="serial" :value="value" v-bind="_props"></component>-->
        <div v-if="variation!='radial_pro'" class="rockiot-gauge-title" :style="textStyle">{{title}} <div class="rockiot-gauge-limits" v-if="!! parseInt(minmax)">{{min}}:{{max}}</div></div>
        <div v-if="variation!='radial_pro'" class="rockiot-gauge-units" :style="textStyle">{{units}}</div>
        <div v-if="variation!='radial_pro'" class="rockiot-gauge-output" :style="valueStyle">
            {{parseInt(updatedValue)}}<small><sup>.{{formatDec}}</sup></small>
        </div>
    </div>
</template>

<script>
//import RockiotSvgGauge from '@/components/rockiot.gauge.svg'
import RockiotSvgLinearV from '@/components/rockiot.linear.vertical.svg'
import RockiotSvgLinearH from '@/components/rockiot.linear.horizontal.svg'
//import RockiotSvgRadial from '@/components/rockiot.g.svg'
import RockiotRadialSvg from '@/components/rockiot.radial.svg'

/* eslint-disable */
export default {
    name: 'RockiotGauge',
    components: {
        //RockiotSvgGauge,
        RockiotSvgLinearV,
        RockiotSvgLinearH,
        //RockiotSvgRadial,
        RockiotRadialSvg
    },
    data:()=>({
        updatedValue: 0
    }),
    computed:{
        formatDec(){
            let v = parseFloat(this.value).toFixed(this.precision).toString()
            let num = v.split('.')
            return num[1]
        },
        textStyle(){
            return 'color:' + this.textColor + ';'
        },
        valueStyle(){
            return 'color:' + this.valueColor + ';background:' + this.valueBg + ';border:' + this.valueBorder + ';'
        },
        test(){
            return RockiotTest
        },
        component(){
            if ( this.variation === 'radial' ){
                //return RockiotSvgGauge
                //return () => import ( /*webpackChunkName: "rockiotRadial" */ '@/components/rockiot.gauge.svg' )
            }
            if ( this.variation === 'radial_pro' ){
                return RockiotRadialSvg
                //return () => import ( /*webpackChunkName: "rockiotRadial" */ '@/components/rockiot.gauge.svg' )
            }   

            if ( this.orientation === 'vertical' && this.variation === 'linear' ){
                return RockiotSvgLinearV
                //return () => import ( /*webpackChunkName: "rockiotLinearV" */ '@/components/rockiot.linear.svg' )
            }
            if ( this.orientation === 'horizontal' && this.variation === 'linear' ){
                return RockiotSvgLinearH
                //return () => import ( /*webpackChunkName: "rockiotLinearH" */ '@/components/rockiot.linear.horizontal.svg' )
            }
            if ( this.variation === 'radial_full' ){
                //return RockiotSvgRadial
                //return () => import ( /*webpackChunkName: "rockiotLinearH" */ '@/components/rockiot.linear.horizontal.svg' )
            }
        }
    },
    watch:{
        value(v){
            this.updatedValue = v
        }
    },
    props: {
        serial          : { type: String, required: false, default: 'rockiot001'},
        title           : { type: String, required: false, default: 'Gauge'},
        type            : { type: String, required: false, default: 'gauge' },
        variation       : { type: String, required: false, default: 'radial' },
        degree          : { type: String, required: false, default: '180'},
        startangle      : { type: String, required: false, default: '135' },
        endangle        : { type: String, required: false, default: '45' },
        min             : { type: String, required: false, default: '0' },
        max             : { type: String, required: false, default: '100' },
        minmax          : { type: String, required: false, default: '1' },
        value           : { type: String, required: false, default: '0' },
        precision       : { type: String, required: false, default: '2'},
        units           : { type: String, required: false, default: '%'},
        scale           : { type: String, required: false, default: '0' },
        smallscale      : { type: String, required: false, default: '0' },
        ticks           : { type: String, required: false, default: '10'},
        minorTicks      : { type: String, required: false, default: '0'},
        needle          : { type: String, required: false, default: '0'},
        radius          : { type: String, required: false, default: 'lg'},
        size            : { type: String, required: false, default: 'lg' },
        orientation     : { type: String, required: false, default: 'vertical' },
        svgwidth           : { type: String, required: false, default: '300' },
        svgheight          : { type: String, required: false, default: '300' },
        'svg-style'        : { type: String, required: false, default: '' }, 
        animation          : { type: String, required: false, default: '500' },
        'bar-color'        : { type: String, required: false, default: '#444' },
        'bar-border-color' : { type: String, required: false, default: 'transparent' },
        'progress-color'   : { type: String, required: false, default: '#00ff00' },
        'progress-border-color': { type: String, required: false, default: '#00ff00' },
        'scale-color'          : { type: String, required: false, default: '#aaa'},
        'scale-text-color'      : { type: String, required: false, default: '#aaa' },
        'needle-color'     : { type: String, required: false, default: '#777' },
        'needle-stroke'    : { type: String, required: false, default: '#000'},
        'text-color'    :  { type: String, required: false, default: '#777' },
        'value-color'   :   { type: String, required: false, default: '#cecece' },
        'value-bg'      :   { type: String, required: false, default: 'transparent' } ,
        'value-border'  :   { type: String, required: false, default: '0px solid #fac83c'}
    },
    mounted(){
        if ( parseInt(this.value) > parseInt(this.max) ){
            this.updatedValue = this.max
        } else {
            this.updatedValue = this.value
        }
    }
}
</script>