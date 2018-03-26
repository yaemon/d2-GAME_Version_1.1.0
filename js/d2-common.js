$.getDaemonNames =function(){
  var daemonNames = [];
  var k = 0;
  var d = 0;
  var n = 0;
  for(var d in data) {
    for(var n in data[d].list) {
      daemonNames[k]   =  data[d].list[n].name;
      k++;
    }
  }
  return daemonNames;
};


$.preloadImg=function(){
  var d = 0;
  var n = 0;
  for(var d in data) {
    for(var n in data[d].list) {
      new Image().src = data[d].list[n].img
    }
  }
};
