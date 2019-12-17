<template>
    <div :class="'rockiot-chartist rockiot-chartist-' + $attrs.serial" :style="'background:' + $attrs.chartBackground">

    </div>
</template>

<script>

import '../plugins/rockiot.chart'
/* eslint-disable */
export default {
    name: 'RockiotCharts',
    data:()=>({
        chart:null,
        n: 1,
        data:[],
        labels:[],
        chartData:{
            data: [],
            labels: [],
            options: {
                width: '600px',
                height: '300px',
                low: 0,
                high: 100,
                fullWidth: true,
                axisY: {
                    onlyInteger: true,
                    offset: 10
                },
                divisor: 4,
                chartPadding: {
                    right: 20,
                    left: 40
                },
                showArea: false,
                showLine: true,
                showPoint: true,
            }
        }
    }),
    methods:{
        xLabel(){
            let d = new Date()
            let label 
            if ( this.$attrs.chartXData === 'count' ) {
                label = this.n++
            }
            this.$attrs.chartXData === 'now'  ? label = this.timeNow() :
            this.$attrs.chartXData === 'time' ?  label = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() :
            this.$attrs.chartXData === 'date' ?  label = d.getUTCMonth() + '/' + d.getUTCDay() : null
            return label  
                
        },
        timeNow(){
            let d = new Date()
            return d.getMinutes() + ':' + d.getSeconds()
        },
        createChart(){
           let self = this
           let options = {

           }
           if ( this.$attrs.variation != 'bar' ){
 
                this.chart = new Rockiotchart.Line('.rockiot-chartist-' + this.$attrs.serial, 
                {
                    labels: self.chartData.labels,
                    series: [
                        self.chartData.data ,
                    ]
                }, 
                self.chartData.options 
                ).on('draw',function (data) {
                    data.type === 'grid' ? data.element._node.setAttribute('style','stroke:' + self.$attrs.scaleColor ) : null
                    data.type === 'label' ? data.element._node.children[0].setAttribute('style','color:' + self.$attrs.scaleTextColor + ';fill:' + self.$attrs.scaleTextColor + ';') : null
                    data.type === 'line' ? data.element._node.setAttribute('style','stroke-width:' + self.$attrs.chartLine + ';stroke:' + self.$attrs.progressColor) : null
                    data.type === 'point' ? data.element._node.setAttribute('style','stroke-width:' +  self.$attrs.chartPoint + ';stroke:' + self.$attrs.progressColor) : null
                    data.type === 'area' ? data.element._node.setAttribute('style','fill-opacity:' + self.$attrs.chartArea + ';fill:' + self.$attrs.progressColor ) : null
                })
            }
            if ( this.$attrs.variation === 'bar' ){
                 this.chart = new Rockiotchart.Bar('.rockiot-chartist-' + this.$attrs.serial, 
                {
                    labels: self.chartData.labels,
                    series: [
                        self.chartData.data ,
                    ]
                }, 
                self.chartData.options 
                ).on('draw',function (data) {
                    data.type === 'grid' ? data.element._node.setAttribute('style','stroke:' + self.$attrs.scaleColor ) : null
                    data.type === 'label' ? data.element._node.children[0].setAttribute('style','color:' + self.$attrs.scaleTextColor + ';fill:' + self.$attrs.scaleTextColor + ';') : null
                    data.type === 'bar' ? data.element._node.setAttribute('style','stroke-width:' + self.$attrs.chartLine + ';stroke:' + self.$attrs.progressColor) : null
                    data.type === 'point' ? data.element._node.setAttribute('style','stroke-width:' +  self.$attrs.chartPoint + ';stroke:' + self.$attrs.progressColor) : null
                    data.type === 'area' ? data.element._node.setAttribute('style','fill-opacity:' + self.$attrs.chartArea + ';fill:' + self.$attrs.progressColor ) : null
                })

            }
           
        }
    },
    computed:{
        isArea(){
            return this.$attrs.variation === 'area' ? true : false 
        },
        
    },
    watch:{
        '$attrs.value'(v){
            this.n++
            let label
            if ( this.n > Number(this.$attrs.ticks) ){
                this.chartData.data.splice(0,1)
                this.chartData.labels.splice(0,1)
            }
            this.chartData.data.push(Number(v))
            if ( this.$attrs.chartXLabels ){
                this.$attrs.chartXLabels > 1 ? 
                    this.n % this.$attrs.chartXLabels === 0 ? 
                    label = this.xLabel() 
                    : label = '' : 
                    label = this.xLabel()
                
                this.chartData.labels.push(label)

            } else {
                this.chartData.labels.push(' ')
            }   
            this.chart.update( { labels: this.chartData.labels , series: [ this.chartData.data ] })
 
        }
    },
    mounted(){
        this.$attrs.variation === 'area' ? this.chartData.options.showArea = true : null
        //this.$attrs.chartLine === '1' ? this.chartData.options.showLine = true : this.chartData.options.showLine = false
        this.chartData.data.push(Number(this.$attrs.value))
        this.chartData.labels.push(this.n)
        this.chartData.options.low = Number(this.$attrs.min)
        this.chartData.options.high = Number(this.$attrs.max)
        this.$attrs.precision != '0' ? this.chartData.options.axisY.onlyInteger = false : null
        this.createChart()
        
    }
}
</script>
