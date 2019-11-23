# rockiot-ui


**rockiot-ui** is a **webcomponent** (custom HTML element) created using Vue.js, to add awesome gauges in your HTML pages.

All elements created with rockiot-ui are based on SVG.
**rockiot-ui doesn't use any canvas**.

For this reason you can customize or even manipulate all elements using standard CSS classes and JS.

### Elements ###

**Gauges**

- radial (adapted JS from [naikus](https://github.com/naikus/svg-gauge))
- linear vertical
- linear horizontal
- level

**Charts** *using google charts*
- line charts
- area charts

**Other**
- number box



## Demo

Demo [here](https://rockiot-ui.firebaseapp.com)

## How to use

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

linear vertical
```
<rockiot-ui
   type="gauge"
   variation="linear"
   serial="001"
   min="0"
   max="100"
   value="22">
</rockiot-ui>
```

linear horizontal
```
<rockiot-ui
  type="gauge"
  variation="linear"
  orientation="horizontal"
  serial="001"
  min="0"
  max="100"
  value="22">
</rockiot-ui>
```

level
```
<rockiot-ui
  type="gauge"
  variation="level"
  serial="001"
  min="0"
  max="100"
  value="22">
</rockiot-ui>
```

**Charts**

*In order to use charts elements you need an active internet connection*

line chart
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






## Attributes

As for standard HTML tags, **rockiot-ui** has different attributes in order to control and customize it.


### Common attributes ###

|attribute          |required   |default    | description       |remarks|
|---	            |---	    |---	    |---	            |---	|
| **serial**   	    | yes       | gauge   	| Unique id   	    | You can also add a different id attribute   	|
| **type**  	| no   	    | gauge   	| Component type   	    | gauge / chart / number-box  	|
| **name**  	    | no  	    | component title  	|    	|   	|
| **units**  	    | no  	    |     	    | Gauge value units |   	|
| **min**  	        | no  	    | 0  	    | Minimum value   	|   	|
| **max**  	        | no  	    | 100  	    | Maximum value   	|   	|
| **value**         | yes  	    | 0  	    | Initial value   	|   	|
| **precision**     | no  	    | 2  	    | Value precision   | 0 - 5  	|
| **animation**     | no        | 500       | Animation duration (ms)| 0=no animation *keep below value update rating* |
| **text-color**     | no  	    | #777  	    | title and units color |    	|
| **value-color**     | no  	    | #cecece  	    | display value color |    	|
| **value-bg-color**     | no  	    | transparent  	    | display value background color |    	|
| **value-border-color**     | no  	    | 0px solid #eaeaea  	    | display value border color
| **control-color**     | no  	    | #000  	    | Control icons color |    	|
| **control-bg**     | no  	    | #fff  	    | Control icons bg color |    	|
| **test-icon**     | no  	    |   	    | Add Autotest icon to the control icons bar |    	|

### Gauges attributes ###

|attribute          |required   |default    | description       |remarks|
|---	            |---	    |---	    |---	            |---	|
| **variation**  	| no   	    | radial   	| Gauge type   	    | radial / linear / level 	|
| **orientation**   | no  	    | vertical  | Gauge orientation | *applied only for linear gauges*   	|
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

### Charts attributes ###
|attribute          |required   |default    | description       |remarks|
|---	            |---	    |---	    |---	            |---	|
| **variation**  	      | no   	    | line     | Chart type   	    | line / area 	|
| **backgrorund**       | no  	    | #ff0000  | Background color   |    	|
| **progress-color**    | no  	    | #ff0000  | Chart color        |    	|
| **scale-color**       | no  	    | #aaa     | Axis color         |    	|
| **scale-text-color**  | no  	    | #aaa  	 | Axis text color    |    	|

### NumberBox attributes ###
|attribute          |required   |default    | description       |remarks|
|---	            |---	    |---	    |---	            |---	|
| **variation**  	| no   	    | line   	| Chart type   	    | line / area 	|
| **value-color**     | no  	    | #cecece  	    | display value color |    	|
| **value-bg-color**     | no  	    | transparent  	    | display value background color |    	|
| **value-border-color**     | no  	    | 0px solid #eaeaea  	    | display value border color


## Helper CSS Classes

You can even customize **rockiot-ui** changing the default CSS classes

| CSS class                         | description                       | remarks    |  
|---	                            |---	                            |---	    |
| **rockiot-ui**                     | Component main container          | Component HTML Tag  &lt;rockiot-ui/&gt; 	|
| **.rockiot-dashboard**             | Flex box settings to create a dashboard  | flex-direction=row <br>flex-wrap=wrap    	|
| **.rockiot-panel**                 | Flex box settings to create a panel      | flex-direction=column   	|
| **.rockiot-element**                | Component class           | You can add directly with<br> &lt;rockiot-ui class="rockiot-element"&gt;  	|
| **.rockiot-wrapper**                | Component wrapper           | Component container wrapper 	|
| **.rockiot-wrapper-title**          | Component title/name             |  	|
| **.rockiot-ui-control**             | Component control icons bar             |  	|
| **.rockiot-ui-control-gauge-linear-vertical**             | Component control icons bar for linear vertical gauge           |  	|

| **.rockiot-ui-gauge**               | Gauge linear vertical wrapper     |    	|
| **.rockiot-linear-horizontal**     | Gauge linear horizontal wrapper   |    	|
| **.rockiot-svg**                   | Gauge SVG element                 |    	|
| **.rockiot-dial**                  | Gauge radial dial path            | Gauge bar    	        |
| **.rockiot-value**                 | Gauge radial value path           | Gauge progress bar   	|
| **.rockiot-title-text**            | Gauge radial title                |    	|
| **.rockiot-scale**                 | Gauge scale                       | Gauge scale elements  |
| **.rockiot-output-radial**         | Gauge radial output wrapper       |    	|
| **.rockiot-output-dec**            | Gauge radial decimals value       | 	    |





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
```
npm run build
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
