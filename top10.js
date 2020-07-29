var margin = {top: 50, right: 30, bottom: 50, left: 60},
    width = 560 - margin.left - margin.right,
    height = 440 - margin.top - margin.bottom;

var svg = d3.select("#top10")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

d3.csv("https://raw.githubusercontent.com/ahmadaldhalaan/EdStats/master/enrollment_growth.csv", function(data) {

    var allGroup = d3.map(data, function(d){return(d.Country)}).keys()

    d3.select("#selectButton")
      .selectAll('myOptions')
     	.data(allGroup)
      .enter()
    	.append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button

    var myColor = d3.scaleOrdinal()
      .domain(allGroup)
      .range(d3.schemeSet2);

    // X axis
    var x = d3.scaleLinear()
      .domain(d3.extent(data, function(d) { return d.year; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).ticks(7));

    // X axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height+50 )
      .text("Year");

    // Y axis
    var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return +d.value; })])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

// Y axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", -50)
      .attr("y", -20 )
      .text("Tertiary Enrollment (gross %)")
      .attr("text-anchor", "start")

    var line = svg
      .append('g')
      .append("path")
        .datum(data.filter(function(d){return d.Country==allGroup[0]}))
        .attr("d", d3.line()
          .x(function(d) { return x(d.year) })
          .y(function(d) { return y(+d.value) })
        )
        .attr("stroke", function(d){ return myColor("Argentina") })
        .style("stroke-width", 4)
        .style("fill", "none")

    function update(selectedGroup) {

      var dataFilter = data.filter(function(d){return d.Country==selectedGroup})

      line
          .datum(dataFilter)
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) { return x(d.year) })
            .y(function(d) { return y(+d.value) })
          )
          .attr("stroke", function(d){ return myColor(selectedGroup) })

    }

    // Button change
    d3.select("#selectButton").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(selectedOption)
    })

})
