const x = {
    body: {
        name: "cat",
        age: 29
    }
}

let y = JSON.parse(JSON.stringify(x));
let z = Object.create(x);
y.body.name ='go';
console.log(x.body.name); // 'cat'
console.log(y.body.name); //'go'
console.log(x===y); //false
console.log(x===z); //false
console.log(y.body.name===x.body.name);  //false


var cloneObj = function(obj) {
    let str, newObj = obj.constructor === Array?[]:{};
    if (typeof obj !== 'object') {
        return;
    } else {
        for(var i in obj) {
            newObj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i]; 
        }
    }
    return newObj;
}

var b = cloneObj(x);
console.log(b);
console.log(x===b); 

function deepClone(initalObj, finalObj) {    
    var obj = finalObj || {};    
    for (var i in initalObj) {        
      var prop = initalObj[i];        // 避免相互引用对象导致死循环，如initalObj.a = initalObj的情况
      if(prop === obj) {            
        continue;
      }        
      if (typeof prop === 'object') {
        obj[i] = (prop.constructor === Array) ? [] : {};            
        arguments.callee(prop, obj[i]);
      } else {
        obj[i] = prop;
      }
    }    
    return obj;
  }

  var c = cloneObj(x);
  console.log(c);
  console.log(x===c); 