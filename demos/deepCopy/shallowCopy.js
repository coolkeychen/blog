var x = {
    a: 1,
    b: { f: { g: 1 } },
    c: [ 1, 2, 3 ]
  };
  var y = Object.assign({}, x);
  console.log(y.b.f === x.b.f);     // true

var z= {...x};

console.log(z.b.f === x.b.f); 

function shallowClone(copyObj) {
    var obj = {};
    for ( var i in copyObj) {
      obj[i] = copyObj[i];
    }
    return obj;
  }

  var m = shallowClone(x);
  console.log(m.b.f === x.b.f);  