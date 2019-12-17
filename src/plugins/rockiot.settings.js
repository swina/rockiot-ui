export const settings = {
    attribs: { 
        common: [
          'serial',
          'name',
          'value',
          'units',
          'min',
          'max',
          'precision',
          'animation',
          'svgwidth',
          'svgheight',
          'textColor',
          'valueColor',
          'valueBg',
          'valueBorder',
          'controlColor',
          'controlBg',
          'autoTest'
  
      ],
      radial: [
          'startangle',
          'endangle',
          'radius',
          'size',
          'scale',
          'smallscale',
          'ticks',
          'needle',
          'barColor',
          'progressColor',
          'scaleColor',
          'scaleTextColor',
          'needleColor',
          'needleStroke'
      ],
      level : [
        'progressColor',
        'barColor',
        'barBorderColor',
        'autoColor'
      ],
      linear: [
          'orientation',
          'size',
          'scale',
          'smallscale',
          'ticks',
          'needle',
          'barColor',
          'progressColor',
          'scaleColor',
          'scaleTextColor',
          'needleColor',
          'needleStroke',
          'zones'
      ],

      area: [
        'progressColor',
        'scaleColor',
        'scaleTextColor',
        'chartBackground',
        'chartLine',
        'chartPoint',
        'chartArea',
        'chartXLabels',
        'chartXData'
      ],
      line: [
        'progressColor',
        'scaleColor',
        'scaleTextColor',
        'chartBackground',
        'chartLine',
        'chartPoint',
        'chartXLabels',
        'chartXData'
      ],
      bar: [
        'progressColor',
        'scaleColor',
        'scaleTextColor',
        'chartLine',
        'chartBackground',
        'chartArea',
        'chartXLabels',
        'chartXData'
      ] ,
      number : [
        'numberBoxWidth',
        'numberBoxCircle'
      ]
    },
}
/* eslint-disable */
function fromCamel(str){
    return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

function camelCase(str){
    return str.replace(/\b-([a-z])/g, (_, char) => char.toUpperCase());
}


export function setHTMLAttributes(id,elAttributes) {
    console.log ( id , elAttributes )
    var el = document.getElementById(id)
    Object.keys(elAttributes).forEach( (attr) => {
        el.setAttribute(fromCamel(attr),elAttributes[attr])
    })
}

