var margin = {top: 80, right: 100, bottom: 70, left: 60},
    width = 1200 - margin.left - margin.right,
    height = 550 - margin.top - margin.bottom;

var svg = d3.select("#income")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + 150 + "," + margin.top + ")");

// X axis
var x = d3.scaleBand()
  .range([ 0, width ])
  .padding(0.2);
var xAxis = svg.append("g")
  .attr("transform", "translate(0," + height + ")")


// Y axis
var y = d3.scaleLinear()
  .range([ height, 0]);
var yAxis = svg.append("g")
  .attr("class", "myYaxis")

 // Y axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", -50)
      .attr("y", -10 )
      .text("Tertiary Enrollment (gross %)")
      .attr("text-anchor", "start")

// X axis label:
    svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height+50 )
      .text("Year");


function update(selectedVar) {

  d3.csv("https://raw.githubusercontent.com/ahmadaldhalaan/EdStats/master/enrollment_by_income.csv", function(data) {

    // X axis
    x.domain(data.map(function(d) { return d.year; }))
    xAxis.transition().duration(1000).call(d3.axisBottom(x)).selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

    // Y axis
    y.domain([0, 80 ]);
    yAxis.transition().duration(1000).call(d3.axisLeft(y));

    var u = svg.selectAll("rect")
      .data(data)

    u
      .enter()
      .append("rect")
      .merge(u)
      .transition()
      .duration(800)
        .attr("x", function(d) { return x(d.year); })
        .attr("y", function(d) { return y(d[selectedVar]); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d[selectedVar]); })
        .delay(function(d,i){console.log(i) ; return(i*100)})
        .attr("fill", "#69b3a2")

  })

}

// Initialize
update('High income')