// set the dimensions and margins of the graph
var margin = {top: 20, right: 250, bottom: 40, left: 60},
    width = 1200 - margin.left - margin.right,
    height = 470 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + 110 + "," + margin.top + ")");

d3.csv("https://raw.githubusercontent.com/ahmadaldhalaan/EdStats/master/scatter_data_short.csv", function(data) {

  // X axis
  var x = d3.scaleLinear()
    .domain([0, 100000])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(6));

  // X axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width-350)
      .attr("y", height+35 )
      .text("GDP per Capita, PPP($)");

  // Y axis
  var y = d3.scaleLinear()
    .domain([0, 140])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Y axis label:
  svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", -290)
      .attr("y", -30 )
      .text("Tertiary Enrollment (gross %)")
      .attr("text-anchor", "start")
      .attr("transform", "translate(-10,0)rotate(-90)")

  // Bubble size scale
  var z = d3.scaleSqrt()
    .domain([200000, 1310000000])
    .range([ 2, 30]);

  // Bubble color scale
  var myColor = d3.scaleOrdinal()
    .domain(["LCR", "ECA", "SSA", "EAP", "SAR", "MNA", "NAR"])
    .range(d3.schemeCategory10);


  // Create tooltip
  var tooltip = d3.select("#scatter")
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")

  // Show tooltip
  var showTooltip = function(d) {
    tooltip
      .transition()
      .duration(200)
    tooltip
      .style("opacity", 1)
      .html("Country: " + d.Country + " - " + d.Enrollment + "%")
      .style("left", (d3.mouse(this)[0]+30) + "px")
      .style("top", (d3.mouse(this)[1]+30) + "px")
  }
  var moveTooltip = function(d) {
    tooltip
      .style("left", (d3.mouse(this)[0]+30) + "px")
      .style("top", (d3.mouse(this)[1]+30) + "px")
  }
  var hideTooltip = function(d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0)
  }

  // ---------------------------//
  //       HIGHLIGHT GROUP      //
  // ---------------------------//

  // What to do when one group is hovered
  var highlight = function(d){
    // reduce opacity of all groups
    d3.selectAll(".bubbles").style("opacity", 0.05)
    // expect the one that is hovered
    d3.selectAll("."+d).style("opacity", 1)
    svg
    .append("text")
    .attr("x", x(10500))
    .attr("y", y(75))
    .text("Peru")
    .style("font-size", "15px")
    .style("fill", "white")

svg
    .append("text")
    .attr("x", x(45000))
    .attr("y", y(73))
    .text("Saudi")
    .style("font-size", "15px")
    .style("fill", "white")

svg
    .append("text")
    .attr("x", x(35000))
    .attr("y", y(92))
    .text("Spain")
    .style("font-size", "15px")
    .style("fill", "white")

svg
    .append("text")
    .attr("x", x(40000))
    .attr("y", y(67))
    .text("Italy")
    .style("font-size", "15px")
    .style("fill", "white")
  }

  // And when it is not hovered anymore
  var noHighlight = function(d){
    d3.selectAll(".bubbles").style("opacity", 0.8)
    svg
    .append("text")
    .attr("x", x(10500))
    .attr("y", y(75))
    .text("Peru")
    .style("font-size", "15px")
    .style("fill", "#1f77b4")

svg
    .append("text")
    .attr("x", x(45000))
    .attr("y", y(73))
    .text("Saudi")
    .style("font-size", "15px")
    .style("fill", "#8c564b")

svg
    .append("text")
    .attr("x", x(35000))
    .attr("y", y(92))
    .text("Spain")
    .style("font-size", "15px")
    .style("fill", "#ff7f0e")

svg
    .append("text")
    .attr("x", x(40000))
    .attr("y", y(67))
    .text("Italy")
    .style("font-size", "15px")
    .style("fill", "#ff7f0e")

  }


  // Add dots
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("class", function(d) { return "bubbles " + d.Region })
      .attr("cx", function (d) { return x(d.GDPPerCapita); } )
      .attr("cy", function (d) { return y(d.Enrollment); } )
      .attr("r", function (d) { return z(d.Population); } )
      .style("fill", function (d) { return myColor(d.Region); } )


    .on("mouseover", showTooltip )
    .on("mousemove", moveTooltip )
    .on("mouseleave", hideTooltip )



    // Legend
    var valuesToShow = [10000000, 100000000, 1000000000]
    var xCircle = 390
    var xLabel = 440
    svg
      .selectAll("legend")
      .data(valuesToShow)
      .enter()
      .append("circle")
        .attr("cx", xCircle + 625)
        .attr("cy", function(d){ return height - 80 - z(d) } )
        .attr("r", function(d){ return z(d) })
        .style("fill", "none")
        .attr("stroke", "black")

    // Legend
    svg
      .selectAll("legend")
      .data(valuesToShow)
      .enter()
      .append("line")
        .attr('x1', function(d){ return xCircle + 625 + z(d) } )
        .attr('x2', xLabel + 625)
        .attr('y1', function(d){ return height - 80 - z(d) } )
        .attr('y2', function(d){ return height - 80 - z(d) } )
        .attr('stroke', 'black')
        .style('stroke-dasharray', ('2,2'))

    // Legend
    svg
      .selectAll("legend")
      .data(valuesToShow)
      .enter()
      .append("text")
        .attr('x', xLabel + 625)
        .attr('y', function(d){ return height - 80 - z(d) } )
        .text( function(d){ return d/1000000 } )
        .style("font-size", 10)
        .attr('alignment-baseline', 'middle')

    // Legend
    svg.append("text")
      .attr('x', xCircle + 630)
      .attr("y", height - 80 +30)
      .text("Population (M)")
      .attr("text-anchor", "middle")

    // Legend
    var size = 20
    var allgroups = ["LCR", "ECA", "SSA", "EAP", "SAR", "MNA", "NAR"]
    svg.selectAll("myrect")
      .data(allgroups)
      .enter()
      .append("circle")
        .attr("cx", 1000)
        .attr("cy", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 7)
        .style("fill", function(d){ return myColor(d)})
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight)

    // Legend
    svg.selectAll("mylabels")
      .data(allgroups)
      .enter()
      .append("text")
        .attr("x", 1000 + size*.8)
        .attr("y", function(d,i){ return i * (size + 5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d){ return myColor(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .on("mouseover", highlight)
        .on("mouseleave", noHighlight)


svg
    .append("text")
    .attr("x", x(10500))
    .attr("y", y(75))
    .text("Peru")
    .style("font-size", "15px")
    .style("fill", "#1f77b4")

svg
    .append("text")
    .attr("x", x(45000))
    .attr("y", y(73))
    .text("Saudi")
    .style("font-size", "15px")
    .style("fill", "#8c564b")

svg
    .append("text")
    .attr("x", x(35000))
    .attr("y", y(92))
    .text("Spain")
    .style("font-size", "15px")
    .style("fill", "#ff7f0e")

svg
    .append("text")
    .attr("x", x(40000))
    .attr("y", y(67))
    .text("Italy")
    .style("font-size", "15px")
    .style("fill", "#ff7f0e")


  })