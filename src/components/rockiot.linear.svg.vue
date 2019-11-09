<template>
        <svg :class="'typeRange rockiot-gauge rockiot-gauge-' + $attrs.size" :height="$attrs.svgheight" :width="$attrs.svgwidth" :view-box="'0 0 ' + $attrs.svgwidth + ' ' + $attrs.svgheight" :ref="$attrs.serial" :id="$attrs.serial">
            <g class="scale" :ref="'scale-' + $attrs.serial" stroke="red"></g>
            <polyline class="outline" :points="outlinePoints" :style="outlineStyle" />
            <polyline class="fill" :points="fillPoints" :style="fillStyle" />
            <polyline v-if="!! parseInt($attrs.needle)" :stroke="$attrs.needleStroke" :fill="$attrs.needleColor" :points="needlePoints" stroke-width="1"/>
        </svg>
</template>

<script>
import { setSVGAttributes } from '@/plugins/rockiot.gauge.js'
/* eslint-disable */
export default {
    name: 'RockiotSvgLinear',
    data:()=>({
        factor: 3.5,
        barHeight: 100,
        svg: null,
        offsetX: 40,
        offsetY: 20,
        scaleX: 60,
        offsetText: 10,
        needlePoints: null
    }),
    computed:{

        outlinePoints(){
            var height = parseInt(this.$attrs.svgheight) - this.offsetX

            switch(this.$attrs.size){
                case 'md':
                    this.offsetX = 40
                    this.scaleX = 80
                    return this.offsetX + ',' + this.offsetY + ' ' + this.offsetX*2 + ',' + this.offsetY + ' ' + this.offsetX*2 + ',' + height + ' ' + this.offsetX + ',' + height
                    //return "40,20 80,20 80,350 40,350"
                case 'sm':
                    this.offsetX = 50
                    this.scaleX = 70
                    return this.offsetX + ',' + this.offsetY + ' ' + 
                    (this.offsetX+this.offsetY) + ',' + this.offsetY + ' ' + 
                    (this.offsetX+this.offsetY) + ',' + height + ' ' +
                    this.offsetX + ',' + height
                    //return "50,20 70,20 70,350 50,350"
                case 'lg':
                    this.offsetX = 30
                    this.scaleX = 90
                    return this.offsetX + ',' + this.offsetY + ' ' +    
                    (this.offsetX*3) + ',' + this.offsetY + ' ' + 
                    (this.offsetX*3) + ',' + height + ' ' +
                    this.offsetX + ',' + height
                    //return "30,20 90,20 90,350 30,350"
                default:
                    this.offsetX = 40
                    this.scaleX = 80
                    return this.offsetX + ',' + this.offsetY + ' ' + this.offsetX*2 + ',' + this.offsetY + ' ' + this.offsetX*2 + ',' + height + ' ' + this.offsetX + ',' + height
                    //return "40,20 80,20 80,350 40,350"
            }
        },
        fillPoints(){
            let svg_h = parseInt(this.$attrs.svgheight)-this.offsetY
            let h = parseInt(svg_h - parseInt(this.$attrs.value) * this.factor)
            return this.offsetX + ',' + svg_h + ' ' + this.scaleX + ',' + svg_h + ' ' + this.scaleX + ',' + h + ' ' + this.offsetX + ',' + h 
        },
      
        outlineStyle(){
            return 'fill:' + this.$attrs.barColor +';stroke:' + this.$attrs.barBorderColor + ';'
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
            this.barHeight = 350-(parseFloat(v)*this.factor)
            let needleCenter = this.barHeight + 10;
            this.needlePoints = this.offsetX + ',' + needleCenter + ' ' + parseInt(this.offsetX+10) + ',' + (needleCenter - 10) + ' ' + this.offsetX + ',' + parseInt(needleCenter-20) + ' ' + this.offsetX + ',' + needleCenter
        },
        
    },
    methods:{
        calcH(){
            return parseInt(this.$attrs.svgheight) - ( this.offsetY * 2 )
        }
    },
    mounted(){
        let id = this.$attrs.serial
        let offset = 20
        let sh = this.calcH() //330 //this.calcHeight()
        var NS = "http://www.w3.org/2000/svg";
        
        this.svg = this.$refs[id]
        this.svg.scale = this.$refs['scale-' + id]
        this.factor = sh / parseInt(this.$attrs.max )
        this.barHeight = sh - (parseFloat(this.$attrs.value)*this.factor)
        if ( !! parseInt(this.$attrs.scale) ){
            var fs = parseInt( sh / this.$attrs.ticks )
            var n = 0;
            for (var sa = 0; sa <= sh; sa += fs) {
                var scaleLine = document.createElementNS(NS, "line");
                var scaleLineObj = {
                    class: "scale",
                    x1: this.offsetX-10,
                    y1: sa+offset,
                    x2: this.scaleX + 10,
                    y2: sa+offset
                };
                setSVGAttributes(scaleLine, scaleLineObj);
                this.svg.scale.appendChild(scaleLine);
                var mg = 0
                if ( n === 0 || n === parseInt(this.$attrs.ticks)){
                    mg = 4
                }
                var scaleText = document.createElementNS(NS, "text");
                var scaleTextObj = {
                    class: "scale",
                    x: this.offsetX + this.scaleX - this.offsetText ,
                    y: sa+offset+3,
                }
                setSVGAttributes(scaleText, scaleTextObj)
                
                var tick = (parseInt(this.$attrs.max)-parseInt(this.$attrs.min))/parseInt(this.$attrs.ticks)
                var txt = parseInt(this.$attrs.max)-(n*tick)
                scaleText.textContent = txt //parseInt(n * (tick)) + (parseInt(this.$attrs.min))
                this.svg.scale.appendChild(scaleText);
                n++
            }
        }

        let needleCenter = this.barHeight + 10;
        this.needlePoints = this.offsetX + ',' + needleCenter + ' ' + parseInt(this.offsetX+10) + ',' + (needleCenter + 10) + ' ' + this.offsetX + ',' + parseInt(needleCenter+20) + ' ' + this.offsetX + ',' + needleCenter

    }
}
</script>