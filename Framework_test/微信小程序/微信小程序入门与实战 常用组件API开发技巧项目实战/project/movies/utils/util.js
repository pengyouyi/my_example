
var convertToStarsArray = function(stars) {
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    }
    else {
      array.push(0);
    }
  }
  return array;
}

var convertToStarsArray2 = function (stars) {
  var star = Math.floor(stars/2);
  var arr=[];
  switch (star){
    case 0: 
      arr = [0,0,0,0,0];
      break;
    case 1:
      arr = [1, 0, 0, 0, 0];
      break;
    case 2:
      arr = [1, 1, 0, 0, 0];
      break;
    case 3:
      arr = [1, 1, 1, 0, 0];
      break;
    case 4:
      arr = [1, 1, 1, 1, 0];
      break;
    case 5:
      arr = [1, 1, 1, 1, 1];
      break;
  }
  return arr;
}

function http(url, callBack) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function (error) {
      console.log(error)
    }
  })
}


function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  convertToStarsArray: convertToStarsArray,
  http: http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos
}