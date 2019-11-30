<template>
    <div>
        <svg :style="$attrs.svgStyle" :class="' rockiot-linear-vertical rockiot-gauge rockiot-gauge-' + $attrs.size" :height="svgheight" :width="svgwidth" :view-box="'0 0 ' + svgwidth + ' ' + svgheight" :ref="$attrs.serial" :id="$attrs.serial">

            <g class="rockiot-scale" :ref="'scale-' + $attrs.serial" stroke="red" :style="scaleStyle"></g>

            <rect class="rockiot-outline " :id="'outline-' + $attrs.serial" :style="fillStyle"
                :x="offsetX"
                :height="svgheight-(offsetY*2)"
                :width="barHeight"
                :y="offsetY">

            </rect>
            <rect class="rockiot-fill " :style="outlineStyle" :id="'fill-' + $attrs.serial"
                :x="offsetX"
                :height="pos"
                :width="barHeight"
                :y="offsetY">

            </rect>
            <rect :id="'needle-' + $attrs.serial" class="rockiot-needle" :style="animate('y')" height="1"
                :y="pos+offsetY"
                :x="offsetX"
                :width="barHeight" :fill="$attrs.needleColor"/>

            <template v-for="(zone,i) in limitzones">
                <rect :key="'zone-' + i" class="rockiot-zones" :id="'zones-' + i + '-' + $attrs.serial"
                :fill="zone" 
                :x="offsetX-6"
                :height="zoneHeight"
                :width="5"
                :y="offsetY+(zoneHeight*i)"/>    
            </template>

        </svg>
        <div class="rockiot-gauge-linear-vertical-output">
          <div class="rockiot-gauge-linear-vertical-name">
            {{this.$attrs.name}} {{this.$attrs.units}}

          </div>
          <h2 :class="'rockiot-gauge-' + $attrs.variation + '-' + $attrs.orientation + '-value'"><animate-number :ref="'num_' + $attrs.serial" :from="oldValue" :to="aniValue" duration="500" :animate-end="animateEnd" :formatter="formatter"></animate-number></h2>
        </div>
      </div>
</template>

<script>
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
        range: 100,
        svg: null,
        scaleX: 90,
        offsetText: 10,
        pos: 0,
        snapObject: null,
        oldValue: 0,
        aniValue: 0,
        limitzones:null
    }),
    computed:{
        scaleStyle(){
            return 'stroke:' + this.$attrs.scaleColor + ';stroke-width:1;'
        },
        scaleTextColor(){
            if ( this.$attrs.scaleTextColor ){
                return 'fill:' + this.$attrs.scaleTextColor + ';font-size:.8rem;'
            }
        },
        outlineStyle(){
            return 'fill:' + this.$attrs.barColor +';stroke:' + this.$attrs.barBorderColor + ';' + this.animate('height')
        },
        fillStyle(){
            return 'fill:' + this.$attrs.progressColor + ';stroke:transparent;'
        },
        zoneHeight(){
            let height = this.svgheight-(this.offsetY*2)
            return (this.svgheight-(this.offsetY*2))/this.limitzones.length
        }
    },
    watch:{
        '$attrs.barColor'(v){
            this.fillStyle()
        },
        '$attrs.value'(v){
            if ( parseFloat(v) > parseInt(this.$attrs.max) ){
              this.pos = this.normalize(parseFloat(this.$attrs.max))*this.posFactor
            } else {
              this.pos = this.normalize(v)*this.posFactor
            }
            this.animateReset(v)

            //this.$refs['num_' + this.$attrs.serial].reset(this.oldValue,v)
            //this.$refs['num_' + this.$attrs.serial].start()
        },

    },
    methods:{
        animateReset(v){
          this.aniValue = parseInt(v)
          this.$refs['num_' + this.$attrs.serial].reset(this.oldValue,v)
          this.$refs['num_' + this.$attrs.serial].start()
        },
        animateEnd(){
          if ( this.oldValue != 0 ){
            this.oldValue = this.$attrs.value
          }
        },
        formatter(num){
          return num.toFixed(this.$attrs.precision)
        },
        normalize(val){
            if ( Number(this.$attrs.min) < 0 ){
                return (Number(this.$attrs.max)-(val + (parseInt(this.$attrs.min)*-1))/(this.range)*100)
            } else {
              if ( Number(this.$attrs.min) > 0 ){
                let n = Number(this.$attrs.max)-(Number(this.$attrs.max)*(((val-Number(this.$attrs.min))/this.range)*100)/100)
                return n
              } else {
                return Number(this.$attrs.max)-(Number(this.$attrs.max)*((val/this.range)*100)/100)
              }
            }

        },
        animate(attr){
            if ( this.$attrs.animation ) {
                return 'transition: ' + attr + ' ' + parseFloat(this.$attrs.animation/1000) + 's linear;'
            }
            return ''
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
        setSVGAttributes(elmt, oAtt) {
            for (var prop in oAtt) {
              elmt.setAttributeNS(null, prop, oAtt[prop]);
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
                    class: "scale rockiot-scale",
                    style: this.scaleStyle,
                    x1: this.scaleX,
                    y1: (n*fs) + this.offsetY,
                    x2: this.scaleX + h,
                    y2: (n*fs) + this.offsetY
                };
                this.setSVGAttributes(scaleLine, scaleLineObj);
                this.svg.scale.appendChild(scaleLine);
                var mg = 0
                if ( n === 0 || n === parseInt(this.$attrs.ticks)){
                    mg = 4
                }
                var scaleText = document.createElementNS(NS, "text");
                var scaleTextObj = {
                    "class": "scaleNumbersLinear",
                    style: this.scaleTextColor,
                    x: this.svgwidth-15,
                    y: (n*fs) + this.offsetY + 5,
                }
                this.setSVGAttributes(scaleText, scaleTextObj)

                var range = parseInt(this.$attrs.max)-parseInt(this.$attrs.min)
                var tick = range/parseInt(this.$attrs.ticks)
                txt = parseInt(this.$attrs.max)-(n*tick)/minor
                if ( n % 10 === 0 || minor === 1){
                    scaleText.textContent = parseInt(txt)
                    this.svg.scale.appendChild(scaleText);
                }
            }
        },
    },
    beforeMount(){
      this.aniValue = parseInt(this.$attrs.value)
    },
    mounted(){
        let id = this.$attrs.serial
        var height = parseInt(this.svgheight) - ( this.offsetY*2 )
        this.svg = this.$refs[id]
        this.svg.scale = this.$refs['scale-' + id]
        this.factor = height / (parseInt(this.$attrs.max )-parseInt(this.$attrs.min))
        this.posFactor = height / Number(this.$attrs.max)
        this.gaugeSize()
        if ( parseInt(this.$attrs.value) > parseInt(this.$attrs.max) ){
            this.$attrs.value = 0
        }
        this.range = Number(this.$attrs.max) - Number(this.$attrs.min)
        this.pos = this.normalize(Number(this.$attrs.value)) * this.posFactor
        if ( !! parseInt(this.$attrs.scale) ){
            this.createScale()
        }
        if ( this.$attrs.zones  ){
            this.limitzones = this.$attrs.zones.split(',')
        }
    }
}
</script>
