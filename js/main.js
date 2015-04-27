'use strict';

var width = self.frameElement ? 960 : innerWidth,
    height = self.frameElement ? 500 : innerHeight;

var data = d3.range(20).map(function() { return [Math.random() * width, Math.random() * height]; });
console.log(data);
var transform = ["", "-webkit-", "-moz-", "-ms-", "-o-"].reduce(function(p, v) { return v + "transform" in document.body.style ? v : p; }) + "transform";

var color = d3.scale.category10();

var radius0 = 32,
    radius1 = 48;

var drag = d3.behavior.drag()
    .origin(function(d) { return {x: d[0], y: d[1]}; })
    .on("dragstart", dragstarted)
    .on("drag", dragged)
    .on("dragend", dragended);

d3.select("body")
    .on("touchstart", nozoom)
    .on("touchmove", nozoom)
  .selectAll("div")
    .data(data)
  .enter().append("div")
    .style(transform, function(d) { return "translate(" + d[0] + "px," + d[1] + "px)"; })
    .style("margin-top", -radius0 + "px")
    .style("margin-left", -radius0 + "px")
    .style("width", radius0 * 2 + "px")
    .style("height", radius0 * 2 + "px")
    .style("border-radius", radius0 + "px")
    .style("background", function(d, i) { return color(i); })
    .call(drag);

function dragstarted() {
  this.parentNode.appendChild(this);

  d3.select(this).transition()
      .ease("elastic")
      .duration(500)
      .style("margin-top", -radius1 + "px")
      .style("margin-left", -radius1 + "px")
      .style("width", radius1 * 2 + "px")
      .style("height", radius1 * 2 + "px")
      .style("border-radius", radius1 + "px")
      .styleTween("box-shadow", function() { return d3.interpolate("0 0px 0px rgba(0,0,0,0)", "0 4px 8px rgba(0,0,0,.3)"); });
}

function dragged(d) {
  d[0] = d3.event.x;
  d[1] = d3.event.y;

  d3.select(this)
      .style(transform, function(d) { return "translate(" + d[0] + "px," + d[1] + "px)"; });
}

function dragended() {
  d3.select(this).transition()
      .ease("elastic")
      .duration(500)
      .style("margin-top", -radius0 + "px")
      .style("margin-left", -radius0 + "px")
      .style("width", radius0 * 2 + "px")
      .style("height", radius0 * 2 + "px")
      .style("border-radius", radius0 + "px")
      .styleTween("box-shadow", function() { return d3.interpolate("0 4px 8px rgba(0,0,0,.3)", "0 0px 0px rgba(0,0,0,0)"); });
}

function nozoom() {
  d3.event.preventDefault();
}