// Set up chart
//= ================================
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.

var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load data from data.csv
d3.csv("assets/data/data.csv").then(function(healthData) {
  console.log(healthData);

  // log a list of states
  // var states = healthData.map(data => data.states);
  // console.log("states", states);
  
  // cast the data from the csv as numbers
  healthData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    data.age = +data.age;
    data.smokes = +data.smokes;
    data.abbr = data.abbr;
    // console.log("Poverty:", data.poverty);
    // console.log("Healthcare:", data.healthcare);
    // console.log("Age:", data.age);
    // console.log("Smokers:", data.smokes);
  });


  // create scales
  var xLinearScale = d3.scaleLinear()
    .domain([d3.min(healthData, d => d.poverty), d3.max(healthData, d => d.poverty)])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear() 
    .domain([0, d3.max(healthData, d => d.healthcare)])
    .range([height,0]);


  // Create axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Append Axes to the chart
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);
    
  // Create the scatter chart
  var circlesGroup = chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", "15")
    .attr("fill", "grey")
    .attr("opacity", ".3");

  // Create axes labels
  chartGroup.append("text")
   .attr("transform", "rotate(-90)")
   .attr("y", 0 - margin.left + 40)
   .attr("x", 0 - (height / 2))
   .attr("dy", "1em")
   .attr("class", "axisText")
   .text("Lacks Healthcare (%)");

  chartGroup.append("text")
   .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
   .attr("class", "axisText")
   .text("In Poverty (%)");

  // Add labels on the circles
  // chartGroup.selectAll("tspan")
  //   .data(healthData)
  //   .enter()
  //   .append("tspan")
  //   .attr("x", d => xLinearScale(d.poverty))
  //   .attr("y", d => yLinearScale(d.healthcare))
  //   .text(function(d){return d.abbr})
  //   .attr("font_family", "sans-serif")
  //   .attr("font_size", "11px")
  //   .attr("fill", "darkblue");

  
  chartGroup.append("text")
    .style("font_size", "10px")
    .style("fill", "darkblue")
    .style('text-anchor','middle')
    .selectAll("tspan")
    .data(healthData)
    .enter()
    .append("tspan")
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcare))
    .text(d => d.abbr);


});

  




