<template>
    <div :class="$attrs.gaugeClass" :ref="$attrs.serial" :width="$attrs.svgwidth" :height="$attrs.svgwidth" :id="$attrs.serial" :style="'width:'+$attrs.svgwidth+'px;height:'+$attrs.svgheight+'px;' + $attrs.svgStyle" :value="$attrs.value">

    </div>
</template>
<script>
/* eslint-disable */
export default {
    name: 'RockiotRadialSvg',
    data:()=>({
        svg: {},
        gauge: null,
        progressColor: '',
        customize: null,
        isChanged: false
    }),
    watch:{
        '$attrs.value'(v){
            this.gauge.setValueAnimated(v,Number(this.$attrs.animation)/1000)
        },
        '$attrs.setting'(v){
            console.log ( v )
            this.createGauge()
            this.$emit('updated')
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
                    this.customize.value.style.stroke = color[1]
                    break
                }
            }
        },
        createGauge(){
            let self = this
            let value = parseFloat(this.$attrs.value)
            /* eslint-disable */
            this.$refs[this.$attrs.serial].innerHTML = ''
            this.gauge = Gauge(self.$refs[self.$attrs.serial], {
                dialRadius: self.dialRadius,
                dialStartAngle: parseInt(self.$attrs.startangle),
                dialEndAngle: parseInt(self.$attrs.endangle),
                min: parseInt(self.$attrs.min),
                max: parseInt(self.$attrs.max),
                label: function() {
                    return Math.round(self.$attrs.value)
                },
                ticks: self.$attrs.ticks,
                precision: Number(self.$attrs.precision),
                name: self.$attrs.name,
                titleColor: self.$attrs.textColor,
                units: self.$attrs.units,
                showScale: !! parseInt(self.$attrs.scale),
                showSmallScale: !! parseInt(self.$attrs.smallscale),
                needle: !! parseInt(self.$attrs.needle),
                value: parseFloat(value),
                valueColor: self.$attrs.valueColor,
                valueClass: self.$attrs.valueClass,
                serial: self.$attrs.serial,
                gaugeClass: 'rockiot-svg rockiot-svg-' + self.$attrs.serial + ' gauge-' + self.$attrs.serial,
                dialClass: 'rockiot-dial rockiot-dial-' + self.$attrs.size + ' rockiot-dial-' + self.$attrs.serial ,
                valueDialClass: 'rockiot-value rockiot-value-' + self.$attrs.size + ' rockiot-value-' + self.$attrs.serial,
                svg: self.svg,
                barColor: self.$attrs.barColor,
                progressColor: self.$attrs.progressColor,
                needleColor: self.$attrs.needleColor,
                scaleColor: self.$attrs.scaleColor
            });
            let svg = document.querySelector('.rockiot-svg-' + this.$attrs.serial)
            svg.setAttribute('ref','rockiot-svg-' + this.$attrs.serial)
            this.customize = {
                gauge: document.querySelector('.rockiot-svg-' + this.$attrs.serial ),
                dial: document.querySelector('.rockiot-dial-' + this.$attrs.serial ),
                value: document.querySelector('.rockiot-value-' + this.$attrs.serial )
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
        this.svg = document.querySelector('.gauge-' + this.$attrs.serial)
        this.svg.hasscale = this.$attrs.scale
        this.svg.ticks = this.$attrs.ticks
        this.svg.factor = this.factor
        this.svg.degree = this.$attrs.degree
        this.svg.offset = 10
        this.svg.id = this.$attrs.serial
        this.svg.W = this.$attrs.svgwidth
        this.svg.min = this.$attrs.min
        this.svg.max = this.$attrs.max
    }
}
</script>
