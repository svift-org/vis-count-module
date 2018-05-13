SVIFT.vis.count = (function (data, container) {
   // Module object
  var module = SVIFT.vis.base(data, container);

  module.d3config = {
    scale:1,
    ease:d3.easeCubicInOut, 
    interpolate: d3.interpolate(0,data.data.data[0].data[0]),
  };


  module.setup = function () {

    module.d3config.count = module.vizContainer.append("text")
      .text(data.data.data[0].data[0])
      .attr('class', 'visFill labelTextFont')
      .attr("text-anchor", "middle")
      .attr("font-size", 13)
      .attr("opacity",0);

  };

  module.resize = function () {

    var ctext = module.d3config.count.text();

    module.d3config.count
      .text(data.data.data[0].data[0])
      .attr('transform', 'scale(1)');

    module.d3config.count
      .attr("transform", function(d){
            var bBox = this.getBBox();
            var ratio = Math.min([module.vizSize.width/bBox.width, module.vizSize.width/bBox.height]);
            module.d3config.scale = ratio*0.9;
            return 'translate(' + (module.vizSize.width / 2) + ', ' + ((module.vizSize.height/2) + (this.getBBox().height*module.d3config.scale * 0.28)) + ') scale('+module.d3config.scale+')';
        });

    module.d3config.count.text(ctext);

     if(module.playHead == module.playTime){
        module.goTo(1);
        module.pause();
    }

  };



  module.animateNumber = function(t){

    var interpolation = Math.round(module.d3config.interpolate(module.d3config.ease(t)));
    module.d3config.count
      .text(interpolation)
      .attr("opacity",1);

  };

  module.timeline = {
    bars: {start:0, end:3000, func:module.animateNumber}
  };

  return module;
});