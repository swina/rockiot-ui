# rockiot-gauge

**rockiot-gauge** is a **webcomponent** (custom HTML element) to create awesome gauges that you can insert in your HTML page as a normal HTML tag.

**rockiot-gauge has no dependencis** (no external library, just pure javascript).

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
