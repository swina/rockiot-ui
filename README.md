# rockiot-gauge

**rockiot-gauge** is a **webcomponent** (custom HTML element) created sing Vue.js to add awesome gauges in your HTML pages.

All elements created with rockiot-gauge are based on SVG.
**rockiot-gauge doesn't use any canvas**. 

For this reason you can customize or even manipulate all elements using standard CSS classes and JS.

### Gauges ###

- radial
- linear vertical
- linear horizontal


## Demo 

Demo [here](https://swina.github.io/rockiot-gauge) (*click on each gauge to check random values and animation*)

## Basic example

radial
```
<rockiot-gauge serial="001" variation="radial" min="0" max="100" value="22"></rockiot-gauge>
```

linear vertical
```
<rockiot-gauge serial="001" variation="linear" min="0" max="100" value="22"></rockiot-gauge>
```

linear horizontal
```
<rockiot-gauge serial="001" variation="linear" orientation="horizontal" min="0" max="100" value="22"></rockiot-gauge>
```




## Attributes

As for standard HTML tags, **rockiot-gauge** has different attributes in order to control and customize it.



|attribute          |required   |default    | description       |remarks|
|---	            |---	    |---	    |---	            |---	|
| **serial**   	    | yes       | gauge   	| Unique id   	    | You can also add a different id attribute   	|
| **variation**  	| no   	    | radial   	| Gauge type   	    | radial / linear  	|
| **orientation**   | no  	    | vertical  | Gauge orientation | *applied only for linear gauges*   	|
| **startangle**    | no  	    | 135  	    | Gauge start angle | *applied only for radial gauges*   	|
| **endtangle**     | no  	    | 45  	    | Gauge end angle   | *applied only for radial gauges*   	|
| **radius**        | no  	    | 40  	    | Gauge bar radius  | *applied only for radial gauges*   	|
| **title**  	    | no  	    | Gauge  	| Gauge title   	|   	|
| **units**  	    | no  	    |     	    | Gauge value units |   	|
| **min**  	        | no  	    | 0  	    | Minimum value   	|   	|
| **max**  	        | no  	    | 100  	    | Maximum value   	|   	|
| **value**         | yes  	    | 0  	    | Initial value   	|   	|
| **precision**     | no  	    | 2  	    | Value precision   | 0 - 5  	|
| **size**          | no  	    | md  	    | Gauge size        | sm=small md=default lg=large   	|
| **scale**         | no  	    | 0  	    | Gauge major scale       | enable gauge scale : 0=disable 1=enable  	|
| **ticks**         | no  	    | 10  	    | Gauge scale ticks | gauge scale divisions   	|
| **smallscale**    | no  	    | 0  	    | Gauge minor scale | display a minor scale 0=disable 1=enable *applied if scale enabled* when enabled add 10 ticsk between each major scale division  	|
| **needle**         | no  	    | 0  	    | Gauge needle      | 0=disable 1=enable   	|
| **animation**     | no        | 500       | Animation duration (ms)| 0=no animation *keep below value update rating* |
| **bar-color**     | no  	    | #444  	    | Gauge bar color |    	|
| **bar-border-color**     | no  	    | #444  	    | Gauge bar border color |    	|
| **progress-color**     | no  	    | #ff0000  	    | Gauge progress bar color |    	|
| **progress-border-color**     | no  	    | #ff0000  	    | Gauge progress bar border color |    	|
| **scale-color**     | no  	    | #aaa  	    | Gauge scale color |    	|
| **scale-text-color**     | no  	    | #aaa  	    | Gauge scale text color |    	|
| **needle-color**     | no  	    | #777  	    | Gauge needle fill color |    	|
| **needle-stroke-color**     | no  	    | #000  	    | Gauge needle stroke color |    	|
| **text-color**     | no  	    | #777  	    | Gauge title and units color |    	|
| **value-color**     | no  	    | #cecece  	    | Gauge display value color |    	|
| **value-bg-color**     | no  	    | transparent  	    | Gauge display value background color |    	|
| **value-border-color**     | no  	    | 0px solid #eaeaea  	    | Gauge display value border color |    	|


## CSS Classes 

You can even customize **rockiot-gauge** changing the default CSS classes 

| CSS class                         | description                       | remarks    |  
|---	                            |---	                            |---	    |	
| **rockiot-gauge**                 | Gauge main container              | Main HTML Tag   	|
| **.rockiot-radial**                | Gauge radial container            |    	| 
| **.rockiot-linear**                | Gauge linear wrapper              | Gauge progress bar   	|
| **.rockiot-linear-vertical**       | Gauge linear vertical wrapper     |    	|
| **.rockiot-linear-horizontal**     | Gauge linear horizontal wrapper   |    	|
| **.rockiot-svg**                   | Gauge SVG element                 |    	|
| **.rockiot-dial**                  | Gauge radial dial path            | Gauge bar    	        |
| **.rockiot-value**                 | Gauge radial value path           | Gauge progress bar   	|
| **.rockiot-title-text**            | Gauge radial title                |    	|
| **.rockiot-scale**                 | Gauge scale                       | Gauge scale elements  |
| **.rockiot-output-radial**         | Gauge radial output wrapper       |    	|
| **.rockiot-output-dec**            | Gauge radial decimals value       | 	    |





## Project setup
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
