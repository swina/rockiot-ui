/* eslint-disable */
export default (function(global, factory) {
    var Gauge = factory(global);
    if(typeof define === "function" && define.amd) {
      // AMD support
      define(function() {return Gauge;});
    }else if(typeof module === "object" && module.exports) {
      // CommonJS support
      module.exports = Gauge;
    }else {
      // We are probably running in the browser
      global.Gauge = Gauge;
    }
  })(typeof window === "undefined" ? this : window, function(global, undefined) {

    var document = global.document,
      slice = Array.prototype.slice,
      requestAnimationFrame = (global.requestAnimationFrame ||
          global.mozRequestAnimationFrame ||
          global.webkitRequestAnimationFrame ||
          global.msRequestAnimationFrame ||
          function(cb) {
            return setTimeout(cb, 1000 / 60);
          });

    // EXPERIMENTAL!!
    /**
     * Simplistic animation function for animating the gauge. That's all!
     * Options are:
     * {
     *  duration: 1,    // In seconds
     *  start: 0,       // The start value
     *  end: 100,       // The end value
     *  step: function, // REQUIRED! The step function that will be passed the value and does something
     *  easing: function // The easing function. Default is easeInOutCubic
     * }
     */
    function Animation(options) {
      var duration = options.duration,
          currentIteration = 1,
          iterations = 60 * duration,
          start = options.start || 0,
          end = options.end,
          change = end - start,
          step = options.step,
          easing = options.easing || function easeInOutCubic(pos) {
            // https://github.com/danro/easing-js/blob/master/easing.js
            if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,3);
            return 0.5 * (Math.pow((pos-2),3) + 2);
          };

      function animate() {
        var progress = currentIteration / iterations,
            value = change * easing(progress) + start;
        step(value, currentIteration);
        currentIteration += 1;

        if(progress < 1) {
          requestAnimationFrame(animate);
        }
      }
      // start!
      requestAnimationFrame(animate);
    }



    var Gauge = (function() {
      var SVG_NS = "http://www.w3.org/2000/svg";

      var GaugeDefaults = {
        centerX: 50,
        centerY: 50
      };

      var defaultOptions = {
        dialRadius: 45,
        offset: 10,
        dialStartAngle: 135,
        dialEndAngle: 45,
        value: 0,
        precision: 0,
        max: 100,
        min: 0,
        valueDialClass: "rockiot-value value",
        valueClass: "rockiot-value-text value-text",
        titleTextClass: "rockiot-title-text",
        unitsTextClass: "rockiot-units-text",
        dialClass: "rockiot-dial dial",
        gaugeClass: "rockiot-svg gauge",
        scaleClass: "rockiot-scale scale",
        needleClass: "rockiot-needle",
        valueColor: '#eee',
        barColor: '#eee',
        progressColor: '#ff0000',
        needleColor: "#777",
        showValue: true,
        showScale: false,
        showSmallScale: false,
        scaleColor: '#aaa',
        gaugeColor: null,
        serial: 'gauge',
        name: 'Gauge',
        units: '',
        ticks: 10,
        needle: false,
        label: function(val) {
          return parseFloat(val).toFixed(precision);
        }
      };

      function shallowCopy(/* source, ...targets*/) {
        var target = arguments[0], sources = slice.call(arguments, 1);
        sources.forEach(function(s) {
          for(var k in s) {
            if(s.hasOwnProperty(k)) {
              target[k] = s[k];
            }
          }
        });
        return target;
      }

      /**
       * A utility function to create SVG dom tree
       * @param {String} name The SVG element name
       * @param {Object} attrs The attributes as they appear in DOM e.g. stroke-width and not strokeWidth
       * @param {Array} children An array of children (can be created by this same function)
       * @return The SVG element
       */
      function svg(name, attrs, children) {
        var elem = document.createElementNS(SVG_NS, name);
        for(var attrName in attrs) {
          elem.setAttribute(attrName, attrs[attrName]);
        }

        if(children) {
          children.forEach(function(c) {
            elem.appendChild(c);
          });
        }
        return elem;
      }

      /**
       * Translates percentage value to angle. e.g. If gauge span angle is 180deg, then 50%
       * will be 90deg
       */
      function getAngle(percentage, gaugeSpanAngle) {
        return percentage * gaugeSpanAngle / 100;
      }

      function normalize(value, min, limit) {

        var val = Number(value);
        if ( Number(value) < 0 ){
          val += min
        }
        //console.log ( 'normalize animated=>',val , min , limit + min)
        if(val > limit) return limit;
        //if(val < min) return min;
        return val;
      }

      function getValueInPercentage(value, min, max) {
        var mFactor = 1
        if ( min <  0 ){
          max -= (min*-1)
        }
        var newMax = max - (min*mFactor), newVal = value - (min*mFactor);
        return 100 * newVal / newMax;
        // var absMin = Math.abs(min);
        // return 100 * (absMin + value) / (max + absMin);
      }

      /**
       * Gets cartesian co-ordinates for a specified radius and angle (in degrees)
       * @param cx {Number} The center x co-oriinate
       * @param cy {Number} The center y co-ordinate
       * @param radius {Number} The radius of the circle
       * @param angle {Number} The angle in degrees
       * @return An object with x,y co-ordinates
       */
      function getCartesian(cx, cy, radius, angle) {
        var rad = angle * Math.PI / 180;
        return {
          x: Math.round((cx + radius * Math.cos(rad)) * 1000) / 1000,
          y: Math.round((cy + radius * Math.sin(rad)) * 1000) / 1000
        };
      }

      // Returns start and end points for dial
      // i.e. starts at 135deg ends at 45deg with large arc flag
      // REMEMBER!! angle=0 starts on X axis and then increases clockwise
      function getDialCoords(radius, startAngle, endAngle) {
        var cx = GaugeDefaults.centerX,
            cy = GaugeDefaults.centerY;
        return {
          end: getCartesian(cx, cy, radius, endAngle),
            start: getCartesian(cx, cy, radius, startAngle)
        };
      }

      /**
       * Creates a Gauge object. This should be called without the 'new' operator. Various options
       * can be passed for the gauge:
       * {
       *    dialStartAngle: The angle to start the dial. MUST be greater than dialEndAngle. Default 135deg
       *    dialEndAngle: The angle to end the dial. Default 45deg
       *    radius: The gauge's radius. Default 400
       *    max: The maximum value of the gauge. Default 100
       *    value: The starting value of the gauge. Default 0
       *    label: The function on how to render the center label (Should return a value)
       * }
       * @param {Element} elem The DOM into which to render the gauge
       * @param {Object} opts The gauge options
       * @return a Gauge object
       */
      return function Gauge(elem, opts) {
        opts = shallowCopy({}, defaultOptions, opts);
        var gaugeContainer = elem,
            limit = opts.max,
            min = opts.min,
            value = opts.value,//normalize(opts.value, opts.min, opts.max),
            precision = opts.precision,
            radius = opts.dialRadius - opts.offset,
            offset = opts.offset,
            displayValue = opts.showValue,
            displayScale = opts.showScale,
            displaySmallScale = opts.showSmallScale,
            startAngle = opts.dialStartAngle,
            endAngle = opts.dialEndAngle,
            valueDialClass = opts.valueDialClass,
            valueTextClass = opts.valueClass,
            valueLabelClass = opts.valueLabelClass,
            valueColor = opts.valueColor,
            titleTextClass = opts.titleTextClass,
            unitsTextClass = opts.titleTextClass,
            dialClass = opts.dialClass,
            gaugeClass = opts.gaugeClass,
            gaugeColor = opts.color,
            gaugeBarColor = opts.barColor,
            gaugeProgressColor = opts.progressColor,
            gaugeValueElem,
            gaugeValuePath,
            gaugeTitleElem,
            gaugeUnitsElem,
            label = opts.label,
            name = opts.name,
            titleColor = opts.titleColor,
            units = opts.units,
            viewBox = opts.viewBox,
            instance,
            gaugeScale,
            needle = opts.needle,
            needleColor = opts.needleColor,
            ticks = opts.ticks,
            scaleClass = opts.scaleClass,
            scaleColor = opts.scaleColor,
            valueCoord = false,
            serial = opts.serial;
        if(startAngle < endAngle) {
          console.log("WARN! startAngle < endAngle, Swapping");
          var tmp = startAngle;
          startAngle = endAngle;
          endAngle = tmp;
        }

        function pathString(radius, startAngle, endAngle, largeArc) {
          var coords = getDialCoords(radius, startAngle, endAngle),
              start = coords.start,
              end = coords.end,
              largeArcFlag = typeof(largeArc) === "undefined" ? 1 : largeArc;

          return [
            "M", start.x, start.y,
            "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y
          ].join(" ");
        }

        function initializeGauge(elem) {
          gaugeValueElem = svg("text", {
            x: 50,
            y: 65,
            fill: valueColor,
            "class": valueTextClass,
            "font-size": '0.' + ( opts.dialRadius + 10 )+ 'rem',
            "font-family": "sans-serif",
            "font-weight": "normal",
            "text-anchor": "middle",
            "alignment-baseline": "middle",
            "dominant-baseline": "central"
          });

          gaugeTitleElem = svg('text',{
            x: 50,
            y: 35,
            fill: titleColor,
            "class" : titleTextClass,
            "text-anchor": "middle",
            "alignment-baseline": "middle",
            "dominant-baseline": "central"
          })

          gaugeTitleElem.append ( name )

          gaugeUnitsElem = svg('text',{
            x: 50,
            y: 38,
            fill: titleColor,
            "class" : titleTextClass,
            "text-anchor": "middle",
            "alignment-baseline": "middle",
            "dominant-baseline": "central"
          })

          gaugeUnitsElem.append ( units )


          gaugeValuePath = svg("path", {
            "class": valueDialClass,
            fill: "none",
            stroke: gaugeBarColor,
            "stroke-width": 2.5,
            d: pathString(radius, startAngle, startAngle) // value of 0
          });



          var angle = getAngle(100, 360 - Math.abs(startAngle - endAngle))
          var flag = angle <= 180 ? 0 : 1;

          var gaugeDialEl = svg("path", {
            "class": dialClass,
            fill: "none",
            stroke: gaugeProgressColor,
            "stroke-width": 2,
            d: pathString(radius, startAngle, endAngle, flag)
          })


          var gaugeNeedle =  svg('circle',{
            "class" : "rockiot-scale scale rockiot-needle-circle needle-circle",
            cx: 50,
            cy: 50,
            r: 2,
          })

          var gaugeElement = svg("svg", {"viewBox": viewBox || "0 0 100 100", "class": gaugeClass},
            [
              gaugeDialEl,
              gaugeValuePath,
              gaugeValueElem,
              gaugeTitleElem,
              gaugeUnitsElem,
            ]
          );


          elem.appendChild(gaugeElement);

          if ( needle ){
            gaugeElement.appendChild(gaugeNeedle)
          }

          if ( displayScale ){

            gaugeScale = svg("g",{
              "class": scaleClass,
              stroke: "#eee"
            });
            var tickEl, tickText, textPath

            var startTick = startAngle+90
            var factor = (360-(startAngle-endAngle))/(ticks*10)
            var scaleOffsetNumber = min
            if ( opts.min < 0 ){
              limit = Math.abs(opts.min)+limit
              scaleOffsetNumber = opts.min
              min = 0
            }
            if ( opts.min > 0 ){
              scaleOffsetNumber = opts.min
              limit -= Math.abs(min)
            }
            for ( var n=0 ; n < (ticks*10)+1 ; n++ ){
                
                var yT = 50-opts.dialRadius+(opts.dialRadius/10)
                
                if ( opts.dialRadius > 40 ){
                  yT -= 2
                }
                var dT = 2
                if ( n % 10 === 0 ){
                  yT -= 3
                  dT = 5

                }
                if ( n % 10 === 0 || displaySmallScale ){
                  tickEl = svg('line' , {
                    "class": scaleClass,
                    x1: 50,
                    y1: yT,
                    x2: 50,
                    y2: yT+dT,
                    "stroke": scaleColor,
                    "stroke-width":.4,
                    transform :'rotate(' + ( (n* factor) + startTick) + ' 50 50)'
                  })

                  var numberOffset = 0
                  if ( n % 10 === 0 ){

                    if ( n === 0 && (startAngle - endAngle) === 1 ){
                      numberOffset = 2
                    }
                    if ( n === ((ticks*10)) && ( startAngle - endAngle ) === 1 ){
                      numberOffset = -2
                    }
                    var tickNr = svg('text',{
                      x: 50 + numberOffset,
                      y: yT-1,
                      "class" : "scaleNumbers",
                      fill: scaleColor,
                      transform :'rotate(' + ( (n* factor) + startTick) + ' 50 50)'
                    })

                    tickNr.append( parseFloat(n*(limit/ticks/10)+parseInt(scaleOffsetNumber)).toFixed(0))
                    gaugeScale.appendChild(tickNr)
                  }

                  gaugeScale.appendChild(tickEl)
                  gaugeElement.appendChild(gaugeScale)
                }

            }
          }
        }

        function drawNeedle(){
          var needleCoord = document.querySelector('.rockiot-value-' + serial).getAttribute('d').split(' ')
          if ( document.querySelector('.rockiot-needle-' + serial) ){
            document.querySelector('.rockiot-needle-' + serial).remove()
          }
          document.querySelector('.rockiot-svg-' + serial).appendChild(
            svg('line', {
              "class": "rockiot-scale rockiot-needle rockiot-needle-" + serial,
              fill: 'unset',
              "stroke-width": .4,
              stroke: needleColor,
              x1: 50,
              y1: 50,
              x2: needleCoord[needleCoord.length-2],
              y2: needleCoord[needleCoord.length-1]
            }),
          )
        }


        function drawNumbers(){
          var rad = getAngle(100, 360 - Math.abs(startAngle - endAngle));
          var fs = (360-((startAngle+endAngle)/2))/100
          var dg = startAngle + endAngle
          var tick = dg/(limit/ticks*10)
          for (var i = 0; i <= 66; i++) {
            if ( i % 10 === 0 ){
              var s = startAngle+(i*tick)
              var angle = Math.PI/33*(i+tick)
              //var angle = (Math.PI/(360/fs/2)) * i
              //console.log ( 'x=>' , radius * Math.cos(angle) )
              //console.log ( Math.PI , angle , radius )
              var txtNumber = svg('text',{
                x : ((radius+offset) * Math.cos(angle)) + 50,
                y : ((radius+offset) * Math.sin(angle)) + 50,
              "class" : "scaleNumbers"
              })
              txtNumber.append ( i - 50  )
              gaugeScale.appendChild(txtNumber)
            }
          }
        }

        function updateGauge(theValue, frame) {
          var lm = limit
          var mn = min

          //if ( opts.min < 0 ){
          //  theValue += Math.abs(opts.min)

          //}
          if ( opts.min > 0 ){
            mn = opts.min
            lm += opts.min
          }
          if ( opts.min < 0 ){
            mn = opts.min
          }

          var val = getValueInPercentage(theValue, mn, lm),
              // angle = getAngle(val, 360 - Math.abs(endAngle - startAngle)),
              angle = getAngle(val, 360 - Math.abs(startAngle - endAngle)),
              // this is because we are using arc greater than 180deg
              flag = angle <= 180 ? 0 : 1;
          gaugeValuePath.setAttribute("d", pathString(radius, startAngle, angle + startAngle, flag));
          var parent = document.querySelector('.gauge-' + serial)
          if ( needle ){
            drawNeedle()
          }
          if(displayValue) {
            gaugeValueElem.textContent = parseFloat(theValue).toFixed(precision)// label.call(opts,parseFloat(theValue).toFixed(precision));
          }
        }

        
        function setGaugeColor(value, duration) {
          var c = gaugeColor(value),
              dur = duration * 1000,
              pathTransition = "stroke " + dur + "ms ease";
              // textTransition = "fill " + dur + "ms ease";

          gaugeValuePath.style.stroke = c;
          gaugeValuePath.style["-webkit-transition"] = pathTransition;
          gaugeValuePath.style["-moz-transition"] = pathTransition;
          gaugeValuePath.style.transition = pathTransition;
          /*
          gaugeValueElem.style = [
            "fill: " + c,
            "-webkit-transition: " + textTransition,
            "-moz-transition: " + textTransition,
            "transition: " + textTransition,
          ].join(";");
          */
        }

        instance = {
          setOptions : function(options) {
            console.log ( options )
          },
          setMaxValue: function(max) {
            limit = max;
          },
          setValue: function(val) {


            value = val
            /*if ( min > 0 ){
              var lm = opts.max-min

              value = (lm*val)/100
              console.log ('set value of % =>' , val, min , lm , ' = ' , value )
            }
            */
            if ( value < 0 ){
              value += min
            }

            //console.log ( 'set value=> ', value , min , limit )
            //value = normalize(val, min, limit);
            if(gaugeColor) {
              setGaugeColor(value, 0)
            }
            updateGauge(value);
          },
          setValueAnimated: function(val, duration) {
            var oldVal = value;
            value = val
            //if ( value < 0 ){
            //  value += min
            //}

            value = normalize(val, min, limit)//limit);
            if(oldVal === value) {
              return;
            }

            if(gaugeColor) {
              setGaugeColor(value, duration);
            }
            Animation({
              start: oldVal || 0,
              end: parseFloat(value).toFixed(precision),
              duration: duration || 1,
              step: function(val, frame) {
                updateGauge(val, frame);
              }
            });
          },
          getValue: function() {
            return value;
          }
        };

        initializeGauge(gaugeContainer);
        instance.setValue(value);
        if ( needle ){
          drawNeedle()

        }
        return instance;
      };
    })();

    return Gauge;
  });

export function setSVGAttributes(elmt, oAtt) {
    for (var prop in oAtt) {
      elmt.setAttributeNS(null, prop, oAtt[prop]);
    }
}
