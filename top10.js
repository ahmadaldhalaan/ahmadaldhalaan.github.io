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

australiaLine = svg
      .append("line")
      .attr("x1", x(1992) )
      .attr("x2", x(1992) )
      .attr("y1", y(0))
      .attr("y2", y(140))
      .attr("stroke", function(d) {
            if (selectedGroup == "Australia") {return "black"}
            else 	{australiaLine.remove()}
        ;})
      .attr("stroke-dasharray", "4")
      

     australiaText = svg
    .append("text")
    .attr("x", x(1993))
    .attr("y", y(130))
    .text(function(d) {
            if (selectedGroup == "Australia") {return "Dawkins Revolution"}
            else 	{australiaText.remove() }
        ;})
    .style("font-size", "12px")
      
      greeceLine1 = svg
      .append("line")
      .attr("x1", x(1999) )
      .attr("x2", x(1999) )
      .attr("y1", y(0))
      .attr("y2", y(140))
      .attr("stroke", function(d) {
            if (selectedGroup == "Greece") {return "black"}
            else 	{greeceLine1.remove()}
        ;})
      .attr("stroke-dasharray", "4")
   

     greeceText1 = svg
    .append("text")
    .attr("x", x(1990))
    .attr("y", y(90))
    .text(function(d) {
            if (selectedGroup == "Greece") {return "11.25% UR"}
            else 	{greeceText1.remove() }
        ;})
    .style("font-size", "15px")

greeceLine2 = svg
      .append("line")
      .attr("x1", x(2017) )
      .attr("x2", x(2017) )
      .attr("y1", y(0))
      .attr("y2", y(140))
      .attr("stroke", function(d) {
            if (selectedGroup == "Greece") {return "black"}
            else 	{greeceLine2.remove()}
        ;})
      .attr("stroke-dasharray", "4")
   

     greeceText2 = svg
    .append("text")
    .attr("x", x(2008))
    .attr("y", y(50))
    .text(function(d) {
            if (selectedGroup == "Greece") {return "23.54% UR"}
            else 	{greeceText2.remove() }
        ;})
    .style("font-size", "15px")



saudiLine1 = svg
      .append("line")
      .attr("x1", x(2002) )
      .attr("x2", x(2002) )
      .attr("y1", y(0))
      .attr("y2", y(140))
      .attr("stroke", function(d) {
            if (selectedGroup == "Saudi Arabia") {return "green"}
            else 	{saudiLine1.remove()}
        ;})
      .attr("stroke-dasharray", "4")
      

     saudiText1 = svg
    .append("text")
    .attr("x", x(1992))
    .attr("y", y(100))
    .text(function(d) {
            if (selectedGroup == "Saudi Arabia") {return "21 institutions"}
            else 	{saudiText1.remove() }
        ;})
    .style("font-size", "15px")

saudiLine2 = svg
      .append("line")
      .attr("x1", x(2017) )
      .attr("x2", x(2017) )
      .attr("y1", y(0))
      .attr("y2", y(140))
      .attr("stroke", function(d) {
            if (selectedGroup == "Saudi Arabia") {return "green"}
            else 	{saudiLine2.remove()}
        ;})
      .attr("stroke-dasharray", "4")
      

     saudiText2 = svg
    .append("text")
    .attr("x", x(2007))
    .attr("y", y(120))
    .text(function(d) {
            if (selectedGroup == "Saudi Arabia") {return "55 institutions"}
            else 	{saudiText2.remove() }
        ;})
    .style("font-size", "15px")



    }

    // Button change
    d3.select("#selectButton").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(selectedOption)
    })

})
