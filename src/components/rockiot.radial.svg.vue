<template>
    <div :ref="$attrs.serial" :width="$attrs.svgwidth" :height="$attrs.svgwidth" :id="$attrs.serial" :style="'width:'+$attrs.svgwidth+'px;height:'+$attrs.svgheight+'px;' + $attrs.svgStyle">

    </div>
</template>
<script>
/* eslint-disable */
//import SvgGauge from 'svg-gauge'
import '@/plugins/rockiot.radial'
export default {
    name: 'RockiotRadialSvg',
    data:()=>({
        svg: {},
        gauge: null,
        progressColor: '',
        customize: null
    }),
    watch:{
        '$attrs.value'(v){
            if ( this.progressColor.length > 1 ){
                this.gauge.setValueAnimated(v,.7)
                this.setColor()
            } else {
                this.gauge.setValueAnimated(v,.7)
            }
            
        }
    },
    computed:{
        dialRadius(){
            if ( this.$attrs.radius === 'md' ){
                return 40
            }
            if ( this.$attrs.radius === 'lg' ){
                return 45
            }
            if ( this.$attrs.radius === 'sm' ){
                return 35
            }
            return 50
        }
    },
    methods:{
        setColor(){
            let self = this
            let v = this.$attrs.value
            for ( var n = 0 ; n < this.progressColor.length ; n++ ){
                let color = self.progressColor[n].split(',')
                if ( parseFloat(v) < parseFloat(color[0]) ){
                    console.log ( 'change color to' , v , color[0] , color[1] )
                    this.customize.value.style.stroke = color[1]
                    break
                }
            }
        },
        createGauge(){
            let self = this
            let value = parseFloat(this.$attrs.value)
            this.gauge = Gauge(self.$refs[self.$attrs.serial], {
                dialRadius: self.dialRadius,
                dialStartAngle: parseInt(self.$attrs.startangle),
                dialEndAngle: parseInt(self.$attrs.endangle),
                max: parseInt(self.$attrs.max),
                // custom label renderer
                label: function(value) {
                    return Math.round(self.$attrs.value)// + "/" + self.$attrs.max;
                },
                title: self.$attrs.title,
                units: self.$attrs.units,
                showScale: !! parseInt(self.$attrs.scale),
                showSmallScale: !! parseInt(self.$attrs.smallscale),
                needle: !! parseInt(self.$attrs.needle),
                value: parseFloat(value),
                valueColor: self.$attrs.valueColor,
                serial: self.$attrs.serial,
                gaugeClass: 'gauge gauge-' + self.$attrs.serial,
                dialClass: 'dial dial-' + self.$attrs.size + ' dial-' + self.$attrs.serial ,
                valueDialClass: 'value value-' + self.$attrs.size + ' value-' + self.$attrs.serial,
                svg: self.svg,
                barColor: self.$attrs.barColor,
                progressColor: self.$attrs.progressColor
            });
            let svg = document.querySelector('.gauge-' + this.$attrs.serial)
            svg.setAttribute('ref','gauge-' + this.$attrs.serial)
            this.customize = {
                gauge: document.querySelector('.gauge-' + this.$attrs.serial ),
                dial: document.querySelector('.dial-' + this.$attrs.serial ),
                value: document.querySelector('.value-' + this.$attrs.serial )
            }
            this.customize.dial.style.stroke = this.$attrs.barColor
            this.customize.value.style.stroke = this.$attrs.progressColor
        }
    },
    mounted(){
        if ( this.$attrs.progressColor.split(';').length > 1 ){
            this.progressColor = this.$attrs.progressColor.split(';')
        }
        
        this.createGauge()
        this.setColor()
        
        //let pippo = document.querySelector('.gauge-' + this.$attrs.serial)
        this.svg = document.querySelector('.gauge-' + this.$attrs.serial)

        this.svg.hasscale = this.$attrs.scale
        this.svg.ticks = this.$attrs.ticks
        this.svg.factor = this.factor
        this.svg.degree = this.$attrs.degree
        this.svg.offset = 10
        this.svg.id = this.$attrs.serial
        let rad = Math.PI / parseInt(this.$attrs.degree )
        this.svg.W = this.$attrs.svgwidth
        this.svg.min = this.$attrs.min
        this.svg.max = this.$attrs.max
        
    }
}
</script>

<style>
.dial-md {
    stroke-width: 8;
}
.value-md {
    stroke-width: 8;
}

.dial-lg {
    stroke-width: 12;
}
.value-lg {
    stroke-width: 12;
}

.dial-sm {
    stroke-width: 4;
}
.value-sm {
    stroke-width: 4;
}
</style>