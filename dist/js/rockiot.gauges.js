(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["rockiot.gauges"],{"1dde":function(t,e,r){var n=r("d039"),o=r("b622"),a=r("60ae"),i=o("species");t.exports=function(t){return a>=51||!n((function(){var e=[],r=e.constructor={};return r[i]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"65f0":function(t,e,r){var n=r("861d"),o=r("e8b5"),a=r("b622"),i=a("species");t.exports=function(t,e){var r;return o(t)&&(r=t.constructor,"function"!=typeof r||r!==Array&&!o(r.prototype)?n(r)&&(r=r[i],null===r&&(r=void 0)):r=void 0),new(void 0===r?Array:r)(0===e?0:e)}},"757f":function(t,e,r){(function(e){t.exports=function(t){function e(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var r={};return e.m=t,e.c=r,e.i=function(t){return t},e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=3)}([function(t,e,r){"use strict";function n(){return window.google&&window.google.charts?Promise.resolve(window.google.charts):(s||(s=new Promise((function(t){var e=document.createElement("script");e.type="text/javascript",e.onload=function(){return t(window.google.charts)},e.src=i,document.body.appendChild(e)}))),s)}function o(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"current",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return n().then((function(r){if("object"!==(void 0===e?"undefined":a(e)))throw new Error("Google Charts loader: settings must be an object");var n=t+"_"+JSON.stringify(e,Object.keys(e).sort());if(c.has(n))return c.get(n);var o=new Promise((function(n){r.load(t,e),r.setOnLoadCallback((function(){return n(window.google)}))}));return c.set(n,o),o}))}e.a=o;var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},i="https://www.gstatic.com/charts/loader.js",s=null,c=new Map},function(t,e,r){var n=r(5)(r(4),r(6),null,null);t.exports=n.exports},function(t,e){t.exports=function(t,e,r){function n(){var u=Date.now()-s;u<e&&u>=0?o=setTimeout(n,e-u):(o=null,r||(c=t.apply(i,a),i=a=null))}var o,a,i,s,c;null==e&&(e=100);var u=function(){i=this,a=arguments,s=Date.now();var u=r&&!o;return o||(o=setTimeout(n,e)),u&&(c=t.apply(i,a),i=a=null),c};return u.clear=function(){o&&(clearTimeout(o),o=null)},u.flush=function(){o&&(c=t.apply(i,a),i=a=null,clearTimeout(o),o=null)},u}},function(t,r,n){"use strict";function o(t){t.component("GChart",s.a)}Object.defineProperty(r,"__esModule",{value:!0}),r.install=o;var a=n(0),i=n(1),s=n.n(i);n.d(r,"loadGoogleCharts",(function(){return a.a})),n.d(r,"GChart",(function(){return s.a}));var c={version:"0.3.2",install:o};r.default=c;var u=null;"undefined"!=typeof window?u=window.Vue:"undefined"!=typeof e&&(u=e.Vue),u&&u.use(c)},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(0),o=r(2),a=r.n(o),i=function(){function t(t,e){var r=[],n=!0,o=!1,a=void 0;try{for(var i,s=t[Symbol.iterator]();!(n=(i=s.next()).done)&&(r.push(i.value),!e||r.length!==e);n=!0);}catch(c){o=!0,a=c}finally{try{!n&&s.return&&s.return()}finally{if(o)throw a}}return r}return function(e,r){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,r);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},c=null;e.default={name:"GChart",props:{type:{type:String},data:{type:[Array,Object],default:function(){return[]}},options:{type:Object,default:function(){return{}}},version:{type:String,default:"current"},settings:{type:Object,default:function(){return{packages:["corechart","table"]}}},events:{type:Object},createChart:{type:Function},resizeDebounce:{type:Number,default:200}},data:function(){return{chartObject:null}},watch:{data:{deep:!0,handler:function(){this.drawChart()}},options:{deep:!0,handler:function(){this.drawChart()}},type:function(t){this.createChartObject(),this.drawChart()}},mounted:function(){var t=this;r.i(n.a)(this.version,this.settings).then((function(e){c=e;var r=t.createChartObject();t.$emit("ready",r,e),t.drawChart()})),this.resizeDebounce>0&&window.addEventListener("resize",a()(this.drawChart,this.resizeDebounce))},beforeDestroy:function(){this.chartObject&&this.chartObject.clearChart()},methods:{drawChart:function(){if(c&&this.chartObject){var t=this.getValidChartData();t&&this.chartObject.draw(t,this.options)}},getValidChartData:function(){return this.data instanceof c.visualization.DataTable?this.data:this.data instanceof c.visualization.DataView?this.data:Array.isArray(this.data)?c.visualization.arrayToDataTable(this.data):null!==this.data&&"object"===s(this.data)?new c.visualization.DataTable(this.data):null},createChartObject:function(){var t=function(t,e,r){if(!r)throw new Error("please, provide chart type property");return new e.visualization[r](t)},e=this.createChart||t;return this.chartObject=e(this.$refs.chart,c,this.type),this.attachListeners(),this.chartObject},attachListeners:function(){var t=this;this.events&&Object.entries(this.events).forEach((function(e){var r=i(e,2),n=r[0],o=r[1];c.visualization.events.addListener(t.chartObject,n,o)}))}}}},function(t,e){t.exports=function(t,e,r,n){var o,a=t=t||{},i=typeof t.default;"object"!==i&&"function"!==i||(o=t,a=t.default);var s="function"==typeof a?a.options:a;if(e&&(s.render=e.render,s.staticRenderFns=e.staticRenderFns),r&&(s._scopeId=r),n){var c=s.computed||(s.computed={});Object.keys(n).forEach((function(t){var e=n[t];c[t]=function(){return e}}))}return{esModule:o,exports:a,options:s}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{ref:"chart"})},staticRenderFns:[]}}])}).call(this,r("c8ba"))},"81d5":function(t,e,r){"use strict";var n=r("7b0b"),o=r("23cb"),a=r("50c4");t.exports=function(t){var e=n(this),r=a(e.length),i=arguments.length,s=o(i>1?arguments[1]:void 0,r),c=i>2?arguments[2]:void 0,u=void 0===c?r:o(c,r);while(u>s)e[s++]=t;return e}},8418:function(t,e,r){"use strict";var n=r("c04e"),o=r("9bf2"),a=r("5c6c");t.exports=function(t,e,r){var i=n(e);i in t?o.f(t,i,a(0,r)):t[i]=r}},a434:function(t,e,r){"use strict";var n=r("23e7"),o=r("23cb"),a=r("a691"),i=r("50c4"),s=r("7b0b"),c=r("65f0"),u=r("8418"),l=r("1dde"),h=Math.max,f=Math.min,d=9007199254740991,p="Maximum allowed length exceeded";n({target:"Array",proto:!0,forced:!l("splice")},{splice:function(t,e){var r,n,l,b,y,v,g=s(this),w=i(g.length),m=o(t,w),x=arguments.length;if(0===x?r=n=0:1===x?(r=0,n=w-m):(r=x-2,n=f(h(a(e),0),w-m)),w+r-n>d)throw TypeError(p);for(l=c(g,n),b=0;b<n;b++)y=m+b,y in g&&u(l,b,g[y]);if(l.length=n,r<n){for(b=m;b<w-n;b++)y=b+n,v=b+r,y in g?g[v]=g[y]:delete g[v];for(b=w;b>w-n+r;b--)delete g[b-1]}else if(r>n)for(b=w-n;b>m;b--)y=b+n-1,v=b+r-1,y in g?g[v]=g[y]:delete g[v];for(b=0;b<r;b++)g[b+m]=arguments[b+2];return g.length=w-n+r,l}})},b0c0:function(t,e,r){var n=r("83ab"),o=r("9bf2").f,a=Function.prototype,i=a.toString,s=/^\s*function ([^ (]*)/,c="name";!n||c in a||o(a,c,{configurable:!0,get:function(){try{return i.call(this).match(s)[1]}catch(t){return""}}})},cb29:function(t,e,r){var n=r("23e7"),o=r("81d5"),a=r("44d2");n({target:"Array",proto:!0},{fill:o}),a("fill")},cb43:function(t,e,r){"use strict";var n=r("757f");r.o(n,"GChart")&&r.d(e,"GChart",(function(){return n["GChart"]}))},d701:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{ref:"chart-"+t.$attrs.serial,staticClass:"rockiot-chart-wrapper",style:"width:"+t.chart.options.width+"px;height:"+t.chart.options.height+"px",attrs:{id:"chart-"+t.$attrs.serial,value:t.$attrs.value}},[r("GChart",{attrs:{settings:{packages:["corechart","line"]},type:t.cType,data:t.chart.data,options:t.chart.options}})],1)},o=[],a=(r("cb29"),r("a434"),r("0d03"),r("b0c0"),r("acd8"),r("e25e"),r("cb43")),i={name:"rockiot-line-chart",components:{GChart:a["GChart"]},data:function(){return{n:1,chart:{data:[["Time","Data"],["0",0]],options:{width:350,height:230,title:"chart",chartArea:{width:"85%",height:"80%"},areaOpacity:.2,curveType:"function",subtitle:"",animation:{duration:500,easing:"out"},colors:["black","black"],backgroundColor:{fill:"none"},titleTextStyle:{color:"#eaeaea"},legend:"none",vAxis:{textStyle:{color:"#ababab"},gridlines:{color:"none"},baseline:{color:"#ababab"}},hAxis:{textStyle:{color:"#ababab"},format:"hh:mm:ss"}}}}},props:{type:{type:Boolean,required:!1,default:!0}},computed:{cType:function(){return this.type?"AreaChart":"LineChart"}},watch:{"$attrs.value":function(t){this.n++,this.n>20&&this.chart.data.splice(1,1);var e=new Date;this.chart.data.push([e.getHours()+":"+e.getMinutes()+":"+e.getSeconds(),parseFloat(t)])}},mounted:function(){this.chart.options.colors=[this.$attrs.progressColor,this.$attrs.progressColor],this.chart.data[0]=["Time",this.$attrs.value],this.chart.options.title=this.$attrs.name+" - "+this.$attrs.units,this.chart.options.substitle=this.$attrs.units,this.chart.data.push(["1",this.$attrs.value]),this.chart.options.width=parseInt(this.$attrs.svgwidth),this.chart.options.height=parseInt(this.$attrs.svgheight),this.chart.options.titleTextStyle.color=this.$attrs.textColor,this.chart.options.vAxis.textStyle.color=this.$attrs.scaleTextColor,this.chart.options.hAxis.textStyle.color=this.$attrs.scaleTextColor,this.chart.options.backgroundColor.fill=this.$attrs.background}},s=i,c=r("2877"),u=Object(c["a"])(s,n,o,!1,null,null,null);e["default"]=u.exports},e8b5:function(t,e,r){var n=r("c6b6");t.exports=Array.isArray||function(t){return"Array"==n(t)}}}]);
//# sourceMappingURL=rockiot.gauges.js.map