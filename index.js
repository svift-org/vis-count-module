SVIFT.vis.count = (function (data, container) {
   // Module object
  var module = SVIFT.vis.base(data, container);

  module.d3config = {
    ease:d3.easeCubicInOut, 
    interpolate: d3.interpolate(0,data.data.data[0].data[0]),
  };


  module.setup = function () {

    module.d3config.count = module.g.append("text")
      .text(data.data.data[0].data[0])
      .attr("fill", data.style.color.main)
      .attr("text-anchor", "middle")
      .attr("font-size", 1) //use any font-size
      .attr("opacity",0)
      .attr("font-family", data.style.font)

  };

  module.resize = function () {

    var windowWidth = module.container.node().offsetWidth - module.config.margin.left - module.config.margin.right;
    var windowHeight = module.container.node().offsetHeight - module.config.margin.top - module.config.margin.bottom;
    var countSpaceHeight = windowHeight  - module.config.topTextHeight -module.config.bottomTextHeight;
    var minSpace = Math.min(countSpaceHeight,windowWidth)

    module.d3config.count
      .attr("x", windowWidth / 2)
      .attr("font-size", function(d){
            var bBox = this.getBBox();
            var maxSpace = Math.max(bBox.width,bBox.height);
            var currentFontSize = d3.select(this).attr("font-size");
            module.d3config.fatNumberNewSize = currentFontSize * (minSpace/maxSpace) 
            return module.d3config.fatNumberNewSize ;
        })
      .attr("y", function(){
        //bottom of number
         //140,35,35
        return (windowHeight/2) + (this.getBBox().height * 0.34)
      })
 
  };

  module.animateNumber = function(t){

    var interpolation = Math.round(module.d3config.interpolate(module.d3config.ease(t)));
    module.d3config.count
      .text(interpolation)
      .attr("opacity",1)

  };

  module.timeline = {
    bars: {start:0, end:3000, func:module.animateNumber}
  };

  return module;
});