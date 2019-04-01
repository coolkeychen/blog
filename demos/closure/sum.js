var late_sum = function(arr){
    var sum = function(){
        return arr.reduce(function(x,y){
            return x+y;
        })
    }
    return sum;
}

var f = late_sum([1,2,3,4,5]);
var f1 = late_sum();
console.log(typeof f); // function
console.log(f === f1); // false
console.log(f());

function count() {
    var arr = [];
    for (var i = 1; i < 4; i++) {
        arr.push(function(){
            return i*i;
        })
        
    }
    return arr;
}

var result = count();

console.log(result); // [ [Function], [Function], [Function] ]
var f1 = result[0];
var f2 = result[1];
var f3 = result[2];
console.log(f1());
console.log(f2());
console.log(f3());

for(var i = 0; i < 3; i++) {
    (function(i) {
    setTimeout(function(){
      console.log(i);
    }, 1000)})(i);
  }

  for(var i = 0; i < 3; i++) {
    try {
        console.log(i);
    } catch (error) {
        console.log(error);
        setTimeout(function(){
            console.log(i);
          }, 1000) 
    }

  }

  for(var i = 0; i < 3; i++) {
    setTimeout((i)=>{
        console.log(i);
      }, 1000,i);
  }