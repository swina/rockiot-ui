<template>
        <svg :class="'typeRange rockiot-gauge rockiot-gauge-' + $attrs.size" height="330" width="330" view-box="0 0 330 330" :ref="$attrs.serial" :id="$attrs.serial">
            <g class="scale" :ref="'scale-' + $attrs.serial" stroke="red"></g>
            <path class="outline" :style="outlineStyle" :ref="'outline-' + $attrs.serial" d="" />
            <path class="fill" :style="fillStyle" :ref="'fill-' + $attrs.serial" :id="'g-fill-' + $attrs.serial" d=""/>
            <polygon class="needle" :style="needleStyle" :ref="'needle-' + $attrs.serial" v-if="!! parseInt($attrs.needle)" points="220,10 300,210 220,250 140,210" />
        </svg>
</template>

<script>
/* eslint-disable*/
import { drawScale , drawNeedle } from '@/plugins/rockiot.gauge.js'
import 'snapsvg-cjs'
export default {
    name: 'RockiotSvgGauge',
    data:()=>({
        rad: Math.PI / 180,
        NS:  'http:\/\/www.w3.org/2000/svg',
        svg : {
            el: null,
            outline: null,
            progress: null,
            needle: null,
            factor: 1,
            W: null,
            offset: 40,
            cx: null,
            cy: 160,
            delta: null,
            r1: null,
            initValue: 50,
            isDragging: false,
            x1: null,

        },
        gauge: null,
        value: 0,
        snapGauge: null
    }),
    computed:{
        outlineStyle(){
            return 'fill:' + this.$attrs.barColor +';stroke:' + this.$attrs.barBorderColor + ';'
        },
        fillStyle(){
            return 'fill:' + this.$attrs.progressColor + ';stroke:' + this.$attrs.progressColor + ';'
        },
        needleStyle(){
            return 'fill:' + this.$attrs.needleColor + ';'
        }    
    },
    watch:{
        '$attrs.value'(v){
            this.createGauge()
        },
        '$attrs.size'(v){
            this.createGauge()
        },
        '$attrs.variation'(a){
            console.log ( a )
        }
    },
    methods:{
        RenderGauge(){
            drawScale ( this.svg )
            this.svg.outline.setAttributeNS(null, 'd', this.DrawOutline() )
            this.svg.progress.setAttributeNS(null, 'd' , this.DrawProgress() )
            drawNeedle ( this.svg )
        },
        DrawOutline(){
            let _ = this.svg
            return "M " + _.x1 + ", " + _.y1 + " A" + _.r1 + "," + _.r1 + " 0 0 0 " + _.x2 + "," + _.y2 + " H" + (_.offset + _.delta) + " A" + _.r2 + "," + _.r2 + " 0 0 1 " + _.x3 + "," + _.y3 + " z";
        },
        DrawProgress(){
            this.value = parseFloat(this.$attrs.value);
            let offset = parseFloat(this.$attrs.value)+(parseInt(this.$attrs.min)*-1)
           
            console.log ( 'offset=>', offset )
            if ( parseInt(offset) >= parseInt(this.$attrs.value) ){
                let progress = parseInt(this.$attrs.max)-(parseInt(this.$attrs.min))
                this.svg.pa = ((offset/progress)*100*1.8) - parseInt(this.$attrs.degree)
            } else {
                this.svg.pa = ((parseFloat(this.$attrs.value)  * this.factor)) - parseInt(this.$attrs.degree)
            }
            this.svg.x = this.svg.cx + this.svg.r1 * Math.cos(this.svg.pa * this.rad)
            this.svg.y = this.svg.cy + this.svg.r1 * Math.sin(this.svg.pa * this.rad)
            var lx = this.svg.cx - this.svg.x
            var ly = this.svg.cy - this.svg.y
            this.svg.a = Math.atan2(ly, lx) / this.rad - parseInt(this.$attrs.degree);
            this.svg.a *= this.rad;
            let r2 = this.svg.r1 - this.svg.delta
            let x4 = this.svg.cx + this.svg.r1 * Math.cos(this.svg.a)
            let y4 = this.svg.cy + this.svg.r1 * Math.sin(this.svg.a)
            let x5 = this.svg.cx + this.svg.r2 * Math.cos(this.svg.a)
            let y5 = this.svg.cy + this.svg.r2 * Math.sin(this.svg.a)
            let _ = this.svg
            this.snapGauge = Snap(this.svg.el)
            return  "M " + x4 + ", " + y4 + " A" + _.r1 + "," + _.r1 + " 0 0 0 " + _.x2 + "," + _.y2 + " H" + (_.offset + _.delta) + " A" + r2 + "," + r2 + " 0 0 1 " + x5 + "," + y5 + " z"
        },
        barSize(){
            switch ( this.$attrs.size ){
                case 'xl':
                    return 2
                    break

                case 'md':
                    return 4
                    break

                case 'lg':
                    return 3
                    break
                
                case 'sm':
                    return 12
                    break

                default:
                    return 4
                    break

            }
        },
        createGauge(){
            this.rad = Math.PI / parseInt(this.$attrs.degree )
            let id = this.$attrs.serial
            this.svg.el = this.$refs[id]
            this.svg.rad = this.rad
            this.svg.min = this.$attrs.min
            this.svg.max = this.$attrs.max
            this.svg.scale = this.$refs['scale-' + id]
            this.svg.outline = this.$refs['outline-' + id]
            this.svg.progress = this.$refs['fill-' + id ]
            this.svg.needle = this.$refs['needle-' + id]
            this.svg.W = parseInt(window.getComputedStyle(this.svg.el, null).getPropertyValue("width"))
            this.svg.cx = ~~(this.svg.W / 2)
            this.svg.r1 = this.svg.cx - this.svg.offset
            this.svg.delta = ~~(this.svg.r1 / this.barSize() )
            this.svg.x1 = this.svg.cx + this.svg.r1
            this.svg.y1 = this.svg.cy
            this.svg.r2 = this.svg.r1 - this.svg.delta
            this.svg.x2 = this.svg.offset
            this.svg.y2 = this.svg.cy
            this.svg.x3 = this.svg.x1 - this.svg.delta
            this.svg.y3 = this.svg.cy
            this.svg.pa = (this.svg.initValue * this.factor) - parseInt(this.$attrs.degree)
            this.svg.x = (this.svg.cx + this.svg.r1) * Math.cos(this.svg.pa * this.rad)
            this.svg.y = this.svg.cy + this.svg.r1 * Math.sin(this.svg.pa * this.rad)
            this.svg.hasscale = this.$attrs.scale
            this.svg.ticks = this.$attrs.ticks
            this.svg.hasneedle = this.$attrs.needle
            this.RenderGauge()
        },
        createLinearGauge(){
            this.svg.x1 = 0
            this.svg.y1 = 300
            this.svg.x2 = 40
            this.svg.y2 = 0
        }
    },
    mounted(){
        this.svg.el = this.$refs[this.$attrs.serial]
        this.factor = parseInt(this.$attrs.degree)/parseInt(this.$attrs.ticks)
        this.rad = Math.PI / parseInt(this.$attrs.degree)
        if ( this.$attrs.variation === 'radial' ){
            this.createGauge()
        }
       
    }
}
</script>
