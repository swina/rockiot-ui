<template>
  <div style="padding-top:1rem;">
        <svg :style="$attrs.svgStyle" :class="'typeRange rockiot-gauge rockiot-gauge-' + $attrs.size" :height="svgheight" :width="svgwidth" :view-box="'0 0 ' + svgwidth + ' ' + svgheight" :ref="$attrs.serial" :id="$attrs.serial">

            <g class="scale" :ref="'scale-' + $attrs.serial" stroke="red" :style="scaleStyle"></g>

            <rect class="outline" :id="'outline-' + $attrs.serial" :style="outlineStyle"
                :x="offsetX"
                :width="svgwidth-offsetX*2"
                :height="barHeight"
                :y="offsetY-barHeight"/>

            <rect class="fill" :style="fillStyle" :id="'fill-' + $attrs.serial"
                :x="offsetX"
                :width="pos"
                :height="barHeight"
                :y="offsetY-barHeight">
            </rect>

            <rect v-if="$attrs.needle==='1'" :id="'needle-' + $attrs.serial" class="needle" :style="animate('x')" width="1"
                :x="this.pos + this.offsetX"
                :y="offsetY-barHeight-5"
                :height="barHeight+10" :fill="$attrs.needleColor"/>

            <template v-for="(zone,i) in limitzones">
                
                <rect v-if="zone" :key="'zone-' + i" class="rockiot-zones" :id="'zones-' + i + '-' + $attrs.serial"
                :fill="zone"
                 :x="offsetX + (zoneWidth*i)"
                :width="zoneWidth"
                height="3"
                :y="offsetY+1"/>
            </template>    
        </svg>
        <div class="rockiot-gauge-linear-vertical-output">
          <div class="rockiot-gauge-linear-vertical-name">
            {{this.$attrs.name}} {{this.$attrs.units}}
          </div>
            <div :class="'rockiot-gauge-value rockiot-gauge-' + $attrs.variation + '-' + $attrs.orientation + '-value'">
                <rockiot-animated-number 
                    :ref="'num_' + this.$attrs.serial" 
                    :precision="$attrs.precision" 
                    :duration="$attrs.animation"
                    :from="oldValue" 
                    :to="$attrs.value" 
                    @end="oldValue=$attrs.value"/>
            </div>
        </div>
      </div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'RockiotSvgLinearH',
    data:()=>({
        svgwidth:370,
        svgheight:90,
        offsetX: 20,
        offsetY: 60,
        barHeight: 20,
        scaleY: 0,
        range:100,
        factor: 3.5,
        posFactor: 3.5,
        svg: null,
        scaleX: 90,
        offsetText: 10,
        pos: 0,
        snapObject: null,
        aniPos:[0,0],
        oldValue: 0,
        aniValue:0,
        limitzones:null,
        showScale: true
    }),
    computed:{
        scaleStyle(){
            return this.showScale ? 'stroke:' + this.$attrs.scaleColor + ';' : 'display:none;stroke:' + this.$attrs.scaleColor + ';' 
        },
        scaleTextColor(){
            return 'fill:' + this.$attrs.scaleTextColor + ';'
        },
        outlineStyle(){
            return 'fill:' + this.$attrs.barColor +';stroke:' + this.$attrs.barBorderColor + ';'
        },
        fillStyle(){
            return 'fill:' + this.$attrs.progressColor + ';stroke:transparent;' + this.animate('width')
        },
        zoneWidth(){
            return (this.svgwidth-this.offsetX*2)/this.limitzones.length
        }
    },
    watch:{
        
        '$attrs.value'(v){
            if ( Number(v) > Number(this.$attrs.max) ){
              v = Number(this.$attrs.max)  
            }
            this.pos = (this.svgwidth-this.offsetX*2)*this.normalize(Number(v))/100
        },
        '$attrs'(v){
            
            if ( v.scale === '0' ){
                this.showScale = false
            } else {
                this.showScale = true
            }          
            this.createGauge()

        }
    },
    methods:{
        calcWidth(v){
            if ( Number(v) > Number(this.$attrs.max) ){
              v = Number(this.$attrs.max)  
            }
            this.pos = (this.svgwidth-this.offsetX*2)*this.normalize(Number(v))/100
        },
        normalize(val){
            return (val + (parseInt(this.$attrs.min)*-1))/(this.range)*100
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
                    this.offsetX = 20
                    this.offsetY = 70
                    this.barHeight = 25
                    this.scaleY = -15
                    break
                case 'sm':
                    this.offsetX = 20
                    this.offsetY = 70
                    this.barHeight = 10
                    this.scaleY = 0
                    break
                case 'lg':
                    this.offsetX = 20
                    this.offsetY = 85
                    this.barHeight = 40
                    this.scaleY = -30
                    break
                default:
                    this.offsetX = 20
                    this.offsetY = 70
                    this.barHeight = 25
                    this.scaleY = -15
                    break
            }

        },
        setSVGAttributes(elmt, oAtt) {
            for (var prop in oAtt) {
              elmt.setAttributeNS(null, prop, oAtt[prop]);
            }
        },
        createScale(){
            if ( this.showScale ){
               
                this.svg.scale = this.$refs['scale-' + this.$attrs.serial]
                this.svg.scale.children.length ? this.svg.scale.innerHTML = '' : null
                var data = this.$attrs
                var NS = "http://www.w3.org/2000/svg";
                var width = parseInt(this.svgwidth) - this.offsetX - this.offsetX
                var fs =  width / parseInt(this.$attrs.ticks) / 10
                var n = 0;
                var txt = 0
                for (var sa = 0; n <= parseInt(this.$attrs.ticks)*10 ; sa += fs) {
                    var scaleLine = document.createElementNS(NS, "line");
                    var h = 5
                    var classe = 'scale scale-major-ticks'

                    if ( !! parseInt(this.$attrs.smallscale) ){
                        if ( n % 10 != 0 && n > 0 ){
                            classe = 'scale scale-minor-ticks'    
                            h = 0
                            var scaleLineObj = {
                                class: classe,
                                style: this.scaleStyle,
                                x1: sa + this.offsetX,
                                y1: this.offsetY ,
                                x2: sa + this.offsetX,
                                y2: this.offsetY -20 - h + this.scaleY
                            }
                            this.setSVGAttributes(scaleLine, scaleLineObj);
                            this.svg.scale.appendChild(scaleLine);
                        } 
                    } 
                    if ( n % 10 === 0 || n === 0 ){
                        var scaleLineObj = {
                                class: classe,
                                style: this.scaleStyle,
                                x1: sa + this.offsetX,
                                y1: this.offsetY ,
                                x2: sa + this.offsetX,
                                y2: this.offsetY -20 - h + this.scaleY
                            }
                            this.setSVGAttributes(scaleLine, scaleLineObj);
                            this.svg.scale.appendChild(scaleLine);
                    }
                   

                    if ( n % 10 === 0 || n === 0 ){

                        var mg = 0
                        if ( n === 0 || n === parseInt(this.$attrs.ticks)){
                            mg = 4
                        }
                        var scaleText = document.createElementNS(NS, "text");
                        var scaleTextObj = {
                            "class": "scaleNumbersLinear",
                            stroke: 'transparent',
                            style: this.scaleTextColor,
                            x: sa + this.offsetX,
                            y: this.offsetY - 30 + this.scaleY,
                        }
                        this.setSVGAttributes(scaleText, scaleTextObj)
                        //var range = parseInt(this.$attrs.max)-(parseInt(this.$attrs.min))

                        var tick = this.range/(parseInt(this.$attrs.ticks))
                        txt = parseInt(this.$attrs.min)+(n/10*tick)

                            scaleText.textContent = parseInt(txt)
                            this.svg.scale.appendChild(scaleText);

                    }
                    n++
                }
            }
        },
        createGauge(){
            let id = this.$attrs.serial
            this.aniValue = parseInt(this.$attrs.value)
            if ( this.$attrs.variation === 'linear' && this.$attrs.svgwidth > this.$attrs.svgheight ){
                this.svgwidth = this.$attrs.svgwidth
                this.svgheight = this.$attrs.svgheight
            }
            if ( this.$attrs.svgwidth > this.$attrs.svgheight ){
                this.svgwidth = this.$attrs.svgheight
                this.svgheight = this.$attrs.svgwidth
            }
            var width = parseInt(this.svgwidth) - ( this.offsetX*2 )
            
            //this.svgwidth = document.getElementById(this.$attrs.serial).clientWidth - this.offsetX*2
            //width = this.svgwidth
            this.svg = this.$refs[id]
            this.svg.scale = this.$refs['scale-' + id]
            this.posFactor = width / parseInt(this.$attrs.max )
            this.range = parseInt(this.$attrs.max ) - (parseInt(this.$attrs.min))
            this.factor = width / this.range
            if ( parseInt(this.$attrs.value) > parseInt(this.$attrs.max) ){
                this.$attrs.value = this.$attrs.max
            }
            //this.pos = this.normalize(Number(this.$attrs.value))*this.posFactor
            //this.pos = this.svgwidth*this.normalize(Number(this.$attrs.value))/100 - this.offsetX
            this.gaugeSize()
            if ( !! parseInt(this.$attrs.scale) ){
                this.createScale()
            }
            if ( this.$attrs.zones.split(',') ){
                this.limitzones = this.$attrs.zones.split(',')
            }

            this.aniPos[1] = this.pos//this.factor
            this.calcWidth(this.$attrs.value)
        }
    },
    beforeMount(){
      this.aniValue = parseInt(this.$attrs.value)

    },
    mounted(){
        let id = this.$attrs.serial
        this.aniValue = parseInt(this.$attrs.value)
       if ( this.$attrs.variation === 'linear' && this.$attrs.svgwidth > this.$attrs.svgheight ){
            this.svgwidth = this.$attrs.svgwidth
            this.svgheight = this.$attrs.svgheight
        }
        if ( this.$attrs.svgwidth > this.$attrs.svgheight ){
            this.svgwidth = this.$attrs.svgheight
            this.svgheight = this.$attrs.svgwidth
        }
        var width = parseInt(this.svgwidth) - ( this.offsetX*2 )
        
        //this.svgwidth = document.getElementById(this.$attrs.serial).clientWidth - this.offsetX*2
        //width = this.svgwidth
        this.svg = this.$refs[id]
        
        this.posFactor = width / parseInt(this.$attrs.max )
        this.range = parseInt(this.$attrs.max ) - (parseInt(this.$attrs.min))
        this.factor = width / this.range
        if ( parseInt(this.$attrs.value) > parseInt(this.$attrs.max) ){
            this.$attrs.value = this.$attrs.max
        }
        //this.pos = this.normalize(Number(this.$attrs.value))*this.posFactor
        //this.pos = this.svgwidth*this.normalize(Number(this.$attrs.value))/100 - this.offsetX
        this.gaugeSize()
        if ( !! parseInt(this.$attrs.scale) ){
            this.createScale()
        }
        if ( this.$attrs.zones.split(',') ){
            this.limitzones = this.$attrs.zones.split(',')
        }

        this.aniPos[1] = this.pos//this.factor
        this.calcWidth(this.$attrs.value)
    }
}
</script>
