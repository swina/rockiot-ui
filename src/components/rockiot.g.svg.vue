<template>
    <div :ref="$attrs.serial" :id="$attrs.serial" :style="'width:'+$attrs.svgwidth+'px;height:'+$attrs.svgheight+'px;'">

    </div>
</template>

<script>
/* eslint-disable */
//import { DialGauge } from '@/plugins/rockiot.utils.js'
import { setSVGAttributes } from '@/plugins/rockiot.gauge.js' 
export default {
    name: 'RockiotG',
    data:()=>({
        svg: null,
        options:{
                diameter: 300,
                minValue: -20, // Minimum value for target temperature
                maxValue: 50, // Maximum value for target temperature
                numTicks: 150, // Number of tick lines to display around the dial
        },
        properties: {
                tickDegrees: 300, //  Degrees of the dial that should be covered in tick lines
                hvac_states: ['off', 'heating', 'cooling'],
                dragLockAxisDistance: 15
        },
        theta: null,
        tickArray: [],
        tickPoints:[],
        tickPointsLarge:[]
    }),
  
    methods:{
        DialGauge(targetElement,options){
            var self = this;
            
            this.properties.lblAmbientPosition = [this.properties.radius, this.properties.ticksOuterRadius-(this.properties.ticksOuterRadius-this.properties.ticksInnerRadius)/2]
            this.properties.offsetDegrees = 180-(360-this.properties.tickDegrees)/2;
            
            /*
            * Object state
            */
            var state = {
                target_temperature: self.options.minValue,
                ambient_temperature: parseFloat(this.$attrs.value),
                hvac_state: self.properties.hvac_states[0],
                has_leaf: false,
                away: false
            };

            var svg = self.createSVGElement('svg',{
                width: '100%', //options.diameter+'px',
                height: '100%', //options.diameter+'px',
                viewBox: '0 0 '+ self.options.diameter+' '+ self.options.diameter,
                class: 'dial'
            },targetElement);
            this.svg = svg
            // CIRCULAR DIAL
            var circle = self.createSVGElement('circle',{
                cx: self.properties.radius,
                cy: self.properties.radius,
                r: self.properties.radius,
                class: 'dial__shape'
            },svg);

            // EDITABLE INDICATOR
            var editCircle = self.createSVGElement('path',{
                d: self.donutPath(self.properties.radius,self.properties.radius,self.properties.radius-4,self.properties.radius-8),
                class: 'dial__editableIndicator',
            },svg);

            /*
            * Ticks
            */
            var ticks = self.createSVGElement('g',{
                class: 'dial__ticks'	
            },svg);
            self.tickPoints = [
                [self.properties.radius-1, self.properties.ticksOuterRadius],
                [self.properties.radius+1, self.properties.ticksOuterRadius],
                [self.properties.radius+1, self.properties.ticksInnerRadius],
                [self.properties.radius-1, self.properties.ticksInnerRadius]
            ];
            self.tickPointsLarge = [
                [self.properties.radius-1.5, self.properties.ticksOuterRadius],
                [self.properties.radius+1.5, self.properties.ticksOuterRadius],
                [self.properties.radius+1.5, self.properties.ticksInnerRadius],
                [self.properties.radius-1.5, self.properties.ticksInnerRadius]
            ];
            self.theta = self.properties.tickDegrees/self.options.numTicks;
            for (var iTick=0; iTick<self.options.numTicks; iTick++) {
                self.tickArray.push(self.createSVGElement('path',{d:self.pointsToPath(self.tickPoints)},ticks));
            };
            self.renderTicks()
        },
        createSVGElement(tag,attributes,appendTo) {
            var element = document.createElementNS('http://www.w3.org/2000/svg',tag);
            this.attr(element,attributes);
            if (appendTo) {
                appendTo.appendChild(element);
            }
            return element;
        },
        attr(element,attrs) {
            for (var i in attrs) {
                element.setAttribute(i,attrs[i]);
            }
        },
        circleToPath(cx, cy, r) {
            return [
                "M",cx,",",cy,
                "m",0-r,",",0,
                "a",r,",",r,0,1,",",0,r*2,",",0,
                "a",r,",",r,0,1,",",0,0-r*2,",",0,
                "z"
            ].join(' ').replace(/\s,\s/g,",");
        },
	
	    donutPath(cx,cy,rOuter,rInner) {
            return this.circleToPath(cx,cy,rOuter) + " " + this.circleToPath(cx,cy,rInner);
        },
        pointsToPath(points) {
            return points.map(function(point, iPoint) {
                return (iPoint>0?'L':'M') + point[0] + ' ' + point[1];
            }).join(' ')+'Z';
        },
        renderText(){
            var NS = "http://www.w3.org/2000/svg"
            var scaleText = document.createElementNS(NS, "text");
            var scaleTextObj = {
                class: "radial-full",
                x:  150, 
                y: 150,
            }

            setSVGAttributes(scaleText, scaleTextObj)
            scaleText.textContent = parseInt(this.$attrs.value ) //parseInt(n * (tick)) + (parseInt(this.$attrs.min))
            this.svg.appendChild(scaleText);

        },
        renderTicks() {
            var vMin, vMax;
            let self = this
            self.ambient_temperature = parseFloat(this.$attrs.min)
            self.target_temperature = parseFloat(this.$attrs.value)
			if (self.away) {
				vMin = self.ambient_temperature;
				vMax = vMin;
			} else {
				vMin = Math.min(self.ambient_temperature, self.target_temperature);
				vMax = Math.max(self.ambient_temperature, self.target_temperature);
            }
            vMin = this.$attrs.min
            vMax = this.$attrs.value
			var min = this.restrictToRange(Math.round((vMin-self.options.minValue)/self.properties.rangeValue * self.options.numTicks),0,self.options.numTicks-1);
			var max = this.restrictToRange(Math.round((vMax-self.options.minValue)/self.properties.rangeValue * self.options.numTicks),0,self.options.numTicks-1);
			console.log ( vMin , vMax )
			self.tickArray.forEach(function(tick,iTick) {
				var isLarge = iTick ==max //iTick==min || iTick==max;
                var isActive = iTick >= min && iTick <= max;
				self.attr(tick,{
					d: self.pointsToPath(
                        self.rotatePoints(
                            isLarge ? self.tickPointsLarge:self.tickPoints,iTick*self.theta-self.properties.offsetDegrees,[self.properties.radius, self.properties.radius])),
					class: isActive ? 'active' : ''
				});
			});
        },
        rotatePoint(point, angle, origin) {
            var radians = angle * Math.PI/180;
            var x = point[0]-origin[0];
            var y = point[1]-origin[1];
            var x1 = x*Math.cos(radians) - y*Math.sin(radians) + origin[0];
            var y1 = x*Math.sin(radians) + y*Math.cos(radians) + origin[1];
            return [x1,y1];
        },
        rotatePoints(points, angle, origin) {
            let self = this
		    return points.map(function(point) {
			    return self.rotatePoint(point, angle, origin);
		    });
	    },
        restrictToRange(val,min,max) {
    		if (val < min) return min;
	    	if (val > max) return max;
		    return val;
	    },
	
        roundHalf(num) {
            return Math.round(num*2)/2;
        },
        
        setClass(el, className, state) {
            el.classList[state ? 'add' : 'remove'](className);
        },

        renderValue() {
            let value = this.$attrs.value
			var lbl_text = Math.floor(value);
			if (parseFloat(this.$attrs.value)%1!=0) {
				lbl_text += '⁵';
			}
			var peggedValue = this.restrictToRange(value, options.minValue, options.maxValue);
			degs = properties.tickDegrees * (peggedValue-options.minValue)/properties.rangeValue - properties.offsetDegrees;
			if (peggedValue > self.target_temperature) {
				degs += 8;
			} else {
				degs -= 8;
			}
			var pos = rotatePoint(properties.lblAmbientPosition,degs,[properties.radius, properties.radius]);
			attr(lblAmbient,{
				x: pos[0],
				y: pos[1]
			});
		}
	
    },
    watch:{
        '$attrs.value'(v){
            this.renderTicks()
            //this.renderText()
        }
    },
    mounted(){
        this.options.maxValue = this.$attrs.max
        this.options.minValue = this.$attrs.min
        this.properties.rangeValue =  this.options.maxValue - this.options.minValue
        this.properties.radius = this.options.diameter/2
        this.properties.ticksOuterRadius = this.options.diameter / 30
        this.properties.ticksInnerRadius = this.options.diameter / 8
        this.DialGauge(this.$refs[this.$attrs.serial]);
    }
}
</script>
<style scoped>

</style>