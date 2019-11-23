<template>
  <div style="padding-top:1rem;">
        <svg :style="$attrs.svgStyle" :class="'typeRange rockiot-gauge rockiot-gauge-' + $attrs.size" :height="svgheight" :width="svgwidth" :view-box="'0 0 ' + svgwidth + ' ' + svgheight" :ref="$attrs.serial" :id="$attrs.serial">

            <g class="scale" :ref="'scale-' + $attrs.serial" stroke="red" :style="scaleStyle"></g>

            <rect class="outline" :id="'outline-' + $attrs.serial" :style="outlineStyle"
                :x="offsetX"
                :width="$attrs.max*posFactor"
                :height="barHeight"
                :y="offsetY-barHeight"/>

            <rect class="fill" :style="fillStyle" :id="'fill-' + $attrs.serial"
                :x="offsetX"
                :width="pos"
                :height="barHeight"
                :y="offsetY-barHeight">
            </rect>

            <rect :id="'needle-' + $attrs.serial" class="needle" :style="animate('x')" width="1"
                :x="this.pos + this.offsetX"
                :y="offsetY-barHeight-5"
                :height="barHeight+10" :fill="$attrs.needleColor"/>
        </svg>
        <div class="rockiot-gauge-linear-vertical-output">
          <div class="rockiot-gauge-linear-vertical-name">
            {{this.$attrs.name}} {{this.$attrs.units}}
          </div>
            <h2 :class="'rockiot-gauge-' + $attrs.variation + '-' + $attrs.orientation + '-value'"><animate-number :ref="'num_' + $attrs.serial" :from="oldValue" :to="aniValue" :duration="$attrs.animation" :animate-end="animateEnd" :formatter="formatter"></animate-number></h2>
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
        aniValue:0
    }),
    computed:{
        scaleStyle(){
            return 'stroke:' + this.$attrs.scaleColor + ';'
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
    },
    watch:{
        '$attrs.barColor'(v){
            this.fillStyle()
        },
        '$attrs.value'(v){

            if ( parseFloat(v) > parseInt(this.$attrs.max) ){
              this.pos = this.normalize(parseFloat(this.$attrs.max))*this.posFactor
            } else {
              this.pos = this.normalize(v)*this.posFactor//this.pos = this.normalize(v)*this.posFactor
            }
            this.animateReset(v)
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
                    this.offsetY = 70
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
            var NS = "http://www.w3.org/2000/svg";
            var width = parseInt(this.svgwidth) - this.offsetX - this.offsetX
            var fs =  width / parseInt(this.$attrs.ticks) / 10
            var n = 0;
            var txt = 0
            for (var sa = 0; n <= parseInt(this.$attrs.ticks)*10 ; sa += fs) {
                var scaleLine = document.createElementNS(NS, "line");
                var h = 5
                if ( !! parseInt(this.$attrs.smallscale) ){
                    if ( n % 10 != 0 && n > 0 ){

                        h = 0
                    }
                }
                var scaleLineObj = {
                    class: "scale",
                    style: this.scaleStyle,
                    x1: sa + this.offsetX,
                    y1: this.offsetY ,
                    x2: sa + this.offsetX,
                    y2: this.offsetY -20 - h + this.scaleY
                };
                this.setSVGAttributes(scaleLine, scaleLineObj);
                this.svg.scale.appendChild(scaleLine);

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
                    txt = parseInt(this.$attrs.min)+(n/10*tick)//tick)
                    //console.log ( range , tick , this.factor )

                        scaleText.textContent = parseInt(txt)///10 //parseInt(n * (tick)) + (parseInt(this.$attrs.min))
                        this.svg.scale.appendChild(scaleText);

                }
                n++
            }
        },
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
        this.svg = this.$refs[id]
        this.svg.scale = this.$refs['scale-' + id]
        this.posFactor = width / parseInt(this.$attrs.max )
        this.range = parseInt(this.$attrs.max ) - (parseInt(this.$attrs.min))
        this.factor = width / this.range
        if ( parseInt(this.$attrs.value) > parseInt(this.$attrs.max) ){
            this.$attrs.value = this.$attrs.max
        }
        this.pos = this.normalize(Number(this.$attrs.value))*this.posFactor
        this.gaugeSize()
        if ( !! parseInt(this.$attrs.scale) ){
            this.createScale()
        }
        this.aniPos[1] = this.pos//this.factor
    }
}
</script>
