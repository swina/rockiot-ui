/* eslint-disable */
var NS = "http://www.w3.org/2000/svg";
var rad = Math.PI / 180;

function clearRect(node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
}

export function setSVGAttributes(elmt, oAtt) {
    for (var prop in oAtt) {
      elmt.setAttributeNS(null, prop, oAtt[prop]);
    }
}

function updateGauge(svg){
    svg.x = svg.cx + svg.r1 * Math.cos(svg.pa * rad);
    svg.y = svg.cy + svg.r1 * Math.sin(svg.pa * rad);
    drawNeedle(svg.cx,svg.cy,svg.r1)
}

export function drawNeedle(svg) {
    let a = Math.atan2(svg.cy-svg.y, svg.cx-svg.x) / rad - 180
    if ( !! parseInt(svg.hasneedle) ){
        var nx1 = svg.cx + 5 * Math.cos((a - 90) * rad);
        var ny1 = svg.cy + 5 * Math.sin((a - 90) * rad);
    
        var nx2 = svg.cx + (svg.r1 + 15) * Math.cos(a * rad);
        var ny2 = svg.cy + (svg.r1 + 15) * Math.sin(a * rad);
    
        var nx3 = svg.cx + 5 * Math.cos((a + 90) * rad);
        var ny3 = svg.cy + 5 * Math.sin((a + 90) * rad);
    
        var points = nx1 + "," + ny1 + " " + nx2 + "," + ny2 + " " + nx3 + "," + ny3;
        svg.needle.setAttributeNS(null, "points", points);
    }
}
export function drawScale(svg) {
    
    if ( !! parseInt(svg.hasscale) ){
        let sr1 = svg.r1 + 5;
        let sr2 = svg.r2 - 5;
        let srT = svg.r1 + 20;
        //var scale = document.querySelector(".scale-" + svg.id);
        clearRect(svg.scale)//svg.scale)
        var fs = parseInt(180/svg.ticks)
        var n = 0;
        for (var sa = -180; sa <= 0; sa += fs) {
            var sx1 = svg.cx + sr1 * Math.cos(sa * rad);
            var sy1 = svg.cy + sr1 * Math.sin(sa * rad);
            var sx2 = svg.cx + sr2 * Math.cos(sa * rad);
            var sy2 = svg.cy + sr2 * Math.sin(sa * rad);
            var sxT = svg.cx + srT * Math.cos(sa * rad);
            var syT = svg.cy + srT * Math.sin(sa * rad);
        
            var scaleLine = document.createElementNS(NS, "line");
            var scaleLineObj = {
                class: "scale",
                x1: sx1,
                y1: sy1,
                x2: sx2,
                y2: sy2
            };
            setSVGAttributes(scaleLine, scaleLineObj);
        
            svg.scale.appendChild(scaleLine);
            var mg = 0
            if ( n === 0 || n === 10){
                mg = 4
            }
            var scaleText = document.createElementNS(NS, "text");
            var scaleTextObj = {
                class: "scale",
                x: sxT,
                y: syT,
            };
            setSVGAttributes(scaleText, scaleTextObj);
            var tick = (parseInt(svg.max)-parseInt(svg.min))/svg.ticks;
            scaleText.textContent = parseInt(n * (tick)) + (parseInt(svg.min));
            svg.scale.appendChild(scaleText);
            n++
        }
    }
  }

  export function Animation(options) {
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
      // console.log(progress + ", " + value);
      step(value, currentIteration);
      currentIteration += 1;

      if(progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    // start!
    requestAnimationFrame(animate);
  }

 