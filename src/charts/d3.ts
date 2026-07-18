// Narrow d3 surface: only the modules the charts use, so consumers install
// five small d3-* packages instead of the full d3 meta-package.
export { select, pointer } from "d3-selection";
export { scaleBand, scalePoint, scaleLinear, scaleTime } from "d3-scale";
export { axisBottom, axisLeft } from "d3-axis";
export { min, max } from "d3-array";
export { line, area, stack, curveMonotoneX } from "d3-shape";
