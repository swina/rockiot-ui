# rockiot-ui

## v. 0.1.6 release notes (01/02/2020)

- removed double name display for gauges


## Features

**rockiot-ui** is a **webcomponent** (custom HTML element) created using Vue.js, to add awesome gauges, charts and other components in your HTML pages.

Typical usage of **rockiot-ui** elements

- IoT dashboards
- SaaS metric dashboards
- Weather Stations

All elements created with rockiot-ui are based on SVG.

**rockiot-ui doesn't use any canvas**.

For this reason you can customize or even manipulate all elements using standard CSS classes and JS.

### Elements ###

**Gauges**

- radial (adapted JS from [naikus](https://github.com/naikus/svg-gauge))
- linear vertical
- linear horizontal
- level

**Charts** 
- line charts
- area charts
- bar charts

**Other**
- number box



## Demo

A dashboard demo using **rockiot-ui**

Demo [here](https://rockiot-gauge.firebaseapp.com)

**demo** *folder contains all files to run a demo on a web server*


## How to use

Include the main library in your HTML head.

```
<html>
  <head>
  //...
  <script src="https://unpkg.com/rockiot-ui@latest/build/rockiot.ui.min.js"></script>
  //...

```

If you plan to use all the elements 

```
<!-- linear gauge -->
<script src="https://unpkg.com/rockiot-ui@latest/build/rockiot.gauge.linear.js"></script>
<!-- radial, level gauge -->
<script src="https://unpkg.com/rockiot-ui@latest/build/rockiot.gauge.radial.js"></script>
<!-- charts -->
<script src="https://unpkg.com/rockiot-ui@latest/build/rockiot.chart.js"></script>
```

Otherwise include only the element library

- ```https://unpkg.com/rockiot-ui@latest/build/rockiot.gauge.linear.js``` for all linear gauges
- ```https://unpkg.com/rockiot-ui@latest/build/rockiot.gauge.radial.js``` for all radial gauges
- ```https://unpkg.com/rockiot-ui@latest/build/rockiot.chart.js``` for all charts


**Gauges**

*Attributes for gauges*

```type="gauge"``` set a gauge component.

```variation="radial"``` set the gauge variation (radial/linear/level).


radial
```
<rockiot-ui
  type="gauge"
  variation="radial"
  serial="001"
  variation="radial"
  min="0"
  max="100"
  value="22">
</rockiot-ui>
```


**Charts**



```
<rockiot-ui
  type="chart"
  variation="line"
  serial="001"
  min="0"
  max="100"
  value="22">
</rockiot-ui>
```

**Others**

Number Box
A number box is simply a box with an animated number value.

```
<rockiot-ui
  type="number-box"
  serial="nb-1"
  min="0"
  max="100"
  value="22">
</rockiot-ui>
```

## Settings Panel (new)

From this realease if attributes ```settings```  is set to 1, clicking on the settings icon you will access to the element setting panel.

You can change any attribute (not the id or the serial) and then apply to the element without page refresh needed.

The setting panel has also a Code button that will show the HTML element that reflects the current attributes. In this way you can easily configure your element, copy the HTML code and paste in your page.

## Charts (new)

From this release the chart element doesn't have any external dependency and works offline as well. 
The charts library has been completely recoded and extended and is based on chartist.js






## Attributes

As for standard HTML tags, **rockiot-ui** has different attributes in order to control and customize it.


### Common attributes ###

|attribute          |required   |default    | description       |remarks|
|---	            |---	    |---	    |---	            |---	|
| **serial**   	    | yes       | gauge   	| Unique id   	    | You can also add a different id attribute   	|
| **type**  	| no   	    | gauge   	| Component type   	    | gauge / chart / number-box  	|
| **name**  	    | no  	    | Gauge  	| Component title   	| *empty values supported*  	|
| **units**  	    | no  	    |     	    | Component value units | *empty values supported*  	|
| **min**  	        | no  	    | 0  	    | Minimum value   	|   	|
| **max**  	        | no  	    | 100  	    | Maximum value   	|   	|
| **value**         | yes  	    | 0  	    | Initial value   	|   	|
| **precision**     | no  	    | 2  	    | Value precision   | 0 - 5  	|
| **animation**     | no        | 500       | Animation duration (ms)| 0=no animation <br>*keep below value update rating* |
| **text-color**     | no  	    | #777  	    | title and units color |    	|
| **value-color**     | no  	    | #cecece  	    | display value color |    	|
| **value-bg-color**     | no  	    | transparent  	    | display value background color |    	|
| **value-border-color**     | no  	    | 0px solid #eaeaea  	    | display value border color | |
| **control-color**     | no  	    | #000  	    | Control icons color |    	|
| **control-bg**     | no  	    | #fff  	    | Control icons bg color |    	|
| **test-icon**     | no  	    |   	    | Add Autotest icon to the control icons bar | *wrench icon*   	|
| **auto-test**     | no        | 0       | Run autotest automatically |
| **settings**     | no        | 1       | Enable element settings panel (clicking on the settings icon) |

### Gauges attributes ###

|attribute          |required   |default    | description       |remarks|
|---	            |---	    |---	    |---	            |---	|
| **variation**  	| no   	    | radial   	| Gauge type   	    | radial / linear / level 	|
| **orientation**   | no  	    | vertical  | Gauge orientation | horizontal / vertical <br>*applied only for linear gauges*   	|
| **startangle**    | no  	    | 135  	    | Gauge start angle | *applied only for radial gauges*   	|
| **endtangle**     | no  	    | 45  	    | Gauge end angle   | *applied only for radial gauges*   	|
| **radius**        | no  	    | 40  	    | Gauge bar radius  | *applied only for radial gauges*   	|
| **size**          | no  	    | md  	    | Gauge size        | sm=small md=default lg=large   	|
| **scale**         | no  	    | 0  	    | Gauge major scale       | enable gauge scale : 0=disable 1=enable  	|
| **ticks**         | no  	    | 10  	    | Gauge scale ticks | gauge scale divisions   	|
| **smallscale**    | no  	    | 0  	    | Gauge minor scale | display a minor scale 0=disable 1=enable *applied if scale enabled* when enabled add 10 ticsk between each major scale division  	|
| **needle**         | no  	    | 0  	    | Gauge needle      | 0=disable 1=enable   	|
| **bar-color**     | no  	    | #444  	    | Gauge bar color |    	|
| **progress-color**     | no  	    | #ff0000  	    | Gauge progress bar color |    	|
| **scale-color**     | no  	    | #aaa  	    | Gauge scale color |    	|
| **scale-text-color**     | no  	    | #aaa  	    | Gauge scale text color |    	|
| **needle-color**     | no  	    | #777  	    | Gauge needle fill color |    	|
| **needle-stroke-color**     | no  	    | #000  	    | Gauge needle stroke color |    	|
| **auto-color**     | no  	    | 0  	    | Level gauge auto color | < 10%(red) <br> < 25%(orange) <br> < 75%(user) <br> > 75%(green)|    	|
| **zones**     | no  	    | ''  	    | Zones Limits  | String of colors separated by comma<br>*linear gauges only*    	|

### Charts attributes ###
|attribute          |required   |default    | description       |remarks|
|---	            |---	    |---	    |---	            |---	|
| **variation**  	      | no   	    | line     | Chart type   	    | line / area / bar	|
| **chart-background**       | no  	    | #ff0000  | Background color   |    	|
| **chart-area**        | no  	    | .3  | Area opacity <br>*area/bar charts*   |    	|
| **chart-line**        | no  	    | 1   | Line stroke width    |    	|
| **chart-point**       | no  	    | 0   | Line intersection point width   |    	|
| **chart-x-labels**    | no  	    | 0   | 0 = no labels <br> n = display label every n times   |    	|
| **chart-x-data**      | no  	    | count    | count = increment  <br>now = min:secs <br>time = hrs:min:secs<br>date = date   |    	|
| **progress-color**    | no  	    | #ff0000  | Chart line/area color        |    	|
| **scale-color**       | no  	    | #aaa     | Axis color         |    	|
| **scale-text-color**  | no  	    | #aaa  	 | Axis text color    |    	|

### NumberBox attributes ###
|attribute          |required   |default    | description       |remarks|
|---	            |---	    |---	    |---	            |---	|
| **value-color**     | no  	    | #cecece  	    | display value color |    	|
| **value-bg-color**     | no  	    | transparent  	    | display value background color |    	|
| **value-border-color**     | no  	    | 0px solid #eaeaea  	    | display value border color


## Helper CSS Classes

You can even customize **rockiot-ui** changing the default CSS classes

| CSS class                         | description                       | remarks    |  
|---	                            |---	                            |---	    |
| **rockiot-ui**                     | Component main container          | Component HTML Tag  &lt;rockiot-ui/&gt; 	|
| **.rockiot-wrapper**                | Component wrapper           | Component container wrapper 	|
| **.rockiot-wrapper-title**          | Component title/name             |  	|
| **.rockiot-ui-control**             | Component control icons bar             |  	|
| **.rockiot-ui-control-gauge-linear-vertical**             | Component control icons bar for linear vertical gauge           |  	|

## Events

By default **rockiot-ui** emits 2 default events.
- setting
- connect

Each event returns the element attribute ```serial```

How to attach your function to emitted events by ```rockiot-ui```


```
document.getElementById(your_element_id)
  .addEventListener('setting',(serial)=>{
    console.log(serial)
    ....
})
```

To attach a common function to all ```rockiot-ui``` components:

```
document.querSelectorAll('rockiot-ui')
  .addEventListener('setting',(serial){
      console.log ( serial )
      .... //your function
})
```

# Release notes


## v. 0.1.5 fixed readme

## v. 0.1.4 release notes (01/01/2020)

- fixed linear vertical display value with negative min setting

## v. 0.1.3 release notes (12/15/2019)

- charts using built-in library (removed google charts dependency )
- new attributes for charts:
  - chart-area : opacity settings for area charts
  - chart-line : line charts line width
  - chart-point: point width (line intersection)
  - chart-x-labels : set xAxis labels interval ( ex. 3 = display xAxis label every 3 measures)  
  - chart-x-data: xAxis label type ( count = counter , now = current mins:secs , time = hrs:mins:secs , date = current date ) 
- new settings attribute (all): see settings panel below


## Roadmap

- Styling with Tailwindcss

## Versions

### 0.1.3 

- charts using built-in library (removed google charts dependency )
- new attributes for charts:
  - chart-area : opacity settings for area charts
  - chart-line : line charts line width
  - chart-point: point width (line intersection)
  - chart-x-labels : set xAxis labels interval ( ex. 3 = display xAxis label every 3 measures)  
  - chart-x-data: xAxis label type ( count = counter , now = current mins:secs , time = hrs:mins:secs , date = current date ) 
- new settings attribute (all): see settings panel below

### 0.1.2   
Initial release




## VUE Project setup
The source code has been created using Vue.js so you can create your vue project and change it as per you needs.

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production

Using vue-cli (destination folder dist)

```
npm run build

```
Using laravel-mix (destination folder build)

```
npm run prod

```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



### Credits
For radial gauge used and adapted JS library from [naikus](https://github.com/naikus/svg-gauge)

### License
This project is licensed under MIT
