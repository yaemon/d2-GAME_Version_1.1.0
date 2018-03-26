$.getDaemonNames =function(){
  var daemonNames = [];
  var k = 0;
  for(let d in data) {
    for(let n in data[d].list) {
      daemonNames[k]   =  data[d].list[n].name;
      k++;
    }
  }
  return daemonNames;
};


$.preloadImg=function(){
  for(let d in data) {
    for(let n in data[d].list) {
      new Image().src = data[d].list[n].img
    }
  }
};
