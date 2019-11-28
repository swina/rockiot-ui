<template>
    <svg :width="$attrs.svgwidth" :height="$attrs.svgheight">
        <g style="transform: translate(0, 10px)">
            <path :d="line" />
        </g>
    </svg>
</template>

<script>
/* eslint-disable */
export default {
    name: 'RockiotD3AreaChart',
    data() {
        return {
        data: [99, 71, 78, 25, 36, 92],
        line: '',
        };
    },
    mounted() {
        this.calculatePath();
    },
    methods: {
        getScales() {
            const x = d3.scaleTime().range([0, 430]);
            const y = d3.scaleLinear().range([210, 0]);
            d3.axisLeft().scale(x);
            d3.axisBottom().scale(y);
            x.domain(d3.extent(this.data, (d, i) => i));
            y.domain([0, d3.max(this.data, d => d)]);
            
            return { x, y };
        },
        calculatePath() {
            const scale = this.getScales();
            console.log ( scale )
            const path = d3.line()
                .x((d, i) => scale.x(i))
                .y(d => scale.y(d));
            this.line = path(this.data);
        },
    },
    
}
</script>

<style scoped>
svg {
  margin: 1rem;
}
path {
  fill: none;
  stroke: #76BF8A;
  stroke-width: 3px;
}
</style>