# rockiot-gauge

**rockiot-gauge** is a **webcomponent** (custom HTML element) created sing Vue.js to add awesome gauges in your HTML pages.

All elements created with rockiot-gauge are based on SVG.
**rockiot-gauge doesn't use any canvas**. 

For this reason you can customize or even manipulate all elements using standard CSS classes and JS.

### Gauges ###

- radial
- linear vertical
- linear horizontal

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




## Features



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
