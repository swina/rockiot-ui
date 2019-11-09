<template>
        <svg :class="'typeRange rockiot-gauge rockiot-gauge-' + $attrs.size" :height="svgheight" :width="svgwidth" :view-box="'0 0 ' + svgwidth + ' ' + svgheight" :ref="$attrs.serial" :id="$attrs.serial">
            
            <g class="scale" :ref="'scale-' + $attrs.serial" stroke="red" :style="scaleStyle"></g>

            <rect class="outline " :id="'outline-' + $attrs.serial" :style="fillStyle" 
                :x="offsetX" 
                :height="svgheight-(offsetY*2)" 
                :width="barHeight" 
                :y="offsetY">
               
            </rect>
            <rect class="fill " :style="outlineStyle" :id="'fill-' + $attrs.serial" 
                :x="offsetX" 
                :height="($attrs.max*factor) - pos" 
                :width="barHeight" 
                :y="offsetY">
                
            </rect>

            <rect :id="'needle-' + $attrs.serial" class="needle" :style="animate('y')" height="1" 
                :y="($attrs.max*factor) - pos + offsetY"
                :x="offsetX" 
                :width="barHeight" :fill="$attrs.needleColor"/>
        </svg> 
</template>

<script>
import { setSVGAttributes } from '@/plugins/rockiot.gauge.js'
//import 'snapsvg-cjs'

/* eslint-disable */
export default {
    name: 'RockiotSvgLinearV',
    data:()=>({
        svgwidth:120,
        svgheight:370,
        offsetX: 20,
        offsetY: 20,
        barHeight: 40,
        scaleY: -20,
        factor: 3.5,
        svg: null,
        scaleX: 90,
        offsetText: 10,
        pos: 0,
        snapObject: null,
        oldValue: 0
    }),
    computed:{
        scaleStyle(){
            return 'stroke:' + this.$attrs.scaleColor + ';'
        },
        scaleTextColor(){
            return 'stroke:' + this.$attrs.scaleTextColor + ';'
        },
        outlineStyle(){
            return 'fill:' + this.$attrs.barColor +';stroke:' + this.$attrs.barBorderColor + ';' + this.animate('height')
        },
        fillStyle(){
            return 'fill:' + this.$attrs.progressColor + ';stroke:transparent;'
        },
    },
    watch:{
        '$attrs.barColor'(v){
            this.fillStyle()
        }, 
        '$attrs.value'(v){
            this.pos = parseInt(v)*this.factor
            //this.updateGauge()
            this.oldValue = v
        },
        
    },
    methods:{
         animate(attr){
            if ( this.$attrs.animation ) {
                return 'transition: ' + attr + ' ' + parseFloat(this.$attrs.animation/1000) + 's linear;'
            }
            return ''
        },
        updateGauge(){
            /*
            this.snapObject.select('#fill-' + this.$attrs.serial).animate({
                x : this.offsetX,
                width : this.barHeight,
                height : (this.$attrs.max*this.factor) - this.pos,
                y : this.offsetY
                } , parseInt(this.$attrs.animation) , mina.linear )
            this.snapObject.select('#needle-' + this.$attrs.serial).animate({
                y : (this.$attrs.max*this.factor) - this.pos + this.offsetY
                }, parseInt(this.$attrs.animation), mina.linear )
            */
            
        },
        gaugeSize(){
            switch(this.$attrs.size){
                case 'md':
                    this.offsetY = 20
                    this.barHeight = 30
                    this.offsetX = (this.svgwidth/2) - (this.barHeight/2)
                    this.scaleY = -25
                    this.scaleX = 70    
                    break
                case 'sm':
                    this.offsetY = 20
                    this.barHeight = 10
                    this.offsetX = (this.svgwidth/2) - (this.barHeight/2)
                    this.scaleY = 0
                    this.scaleX = 60
                    break
                case 'lg':
                    this.offsetY = 20
                    this.barHeight = 40
                    this.offsetX = (this.svgwidth/2) - (this.barHeight/2)
                    this.scaleX = 80
                    break
                default:
                    this.offsetY = 20
                    this.barHeight = 30
                    this.offsetX = (this.svgwidth/2) - (this.barHeight/2)
                    this.scaleY = -25
                    this.scaleX = 30
                    break
            }
        },
        createScale(){
            var NS = "http://www.w3.org/2000/svg";
            var height = parseInt(this.svgheight) - (this.offsetY*2)
            var minor = parseInt(this.$attrs.smallscale) ? 10 : 1
            var fs =  height / parseInt(this.$attrs.ticks) / minor 
            var txt = 0

            for (var n = 0; n <= (parseInt(this.$attrs.ticks)*minor) ; n++) { 
                var scaleLine = document.createElementNS(NS, "line");
                var h = 10
                if ( !! parseInt(this.$attrs.smallscale) ){
                    if ( n % 10 === 0 || n === 0 ){
                        h = 15
                    }
                }
                
                var xPos = (this.svgwidth/2)
                var scaleLineObj = {
                    class: "scale",
                    style: this.scaleStyle,
                    x1: this.scaleX,
                    y1: (n*fs) + this.offsetY,
                    x2: this.scaleX + h,
                    y2: (n*fs) + this.offsetY
                };
                setSVGAttributes(scaleLine, scaleLineObj);
                this.svg.scale.appendChild(scaleLine);
                var mg = 0
                if ( n === 0 || n === parseInt(this.$attrs.ticks)){
                    mg = 4
                }
                var scaleText = document.createElementNS(NS, "text");
                var scaleTextObj = {
                    "class": "scaleNumbersLinear",
                    //style: this.scaleTextColor + ';transform:translate3d(-50px, 4px, 51px);',
                    //x: (this.offsetX+30)+h+20, 
                    //x: this.svgwidth/2 + this.offsetX + 5,
                    x: this.svgwidth-15,// - this.barHeight,//xPos + this.barHeight * 1.2,
                    y: (n*fs) + this.offsetY + 5,
                }
                setSVGAttributes(scaleText, scaleTextObj)
                

                var tick = parseInt(this.$attrs.max)/parseInt(this.$attrs.ticks)
                txt = parseInt(this.$attrs.max)-(n*tick)/minor
                if ( n % 10 === 0 || minor === 1){
                    scaleText.textContent = parseInt(txt) //parseInt(n * (tick)) + (parseInt(this.$attrs.min))
                    this.svg.scale.appendChild(scaleText);
                }    
                //n++
            }
        },
    },
    mounted(){
        let id = this.$attrs.serial
        if ( this.$attrs.variation === 'linear' && this.$attrs.svgwidth < this.$attrs.svgheight ){
            this.svgwidth = this.$attrs.svgwidth
            this.svgheight = this.$attrs.svgheight
        }
        if ( this.$attrs.svgwidth > this.$attrs.svgheight ){
            this.svgwidth = this.$attrs.svgheight
            this.svgheight = this.$attrs.svgwidth
        }
        var height = parseInt(this.svgheight) - ( this.offsetY*2 )
        this.svg = this.$refs[id]
        this.svg.scale = this.$refs['scale-' + id]
        this.factor = height / parseInt(this.$attrs.max )
        this.gaugeSize()
        if ( parseInt(this.$attrs.value) > parseInt(this.$attrs.max) ){
            this.$attrs.value = 0
        }
        
        //this.snapObject = Snap(this.svg)
        this.pos = parseInt(this.$attrs.value) * this.factor
        
        if ( !! parseInt(this.$attrs.scale) ){
            this.createScale()
        }
        this.updateGauge()

    }
}
</script>
