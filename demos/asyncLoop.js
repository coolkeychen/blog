function asyncLoop() {
    for (var i = 0; i < 5; i++) {
        setTimeout(function(){
            console.log(i);
        },1000);
        
    }
}

console.log(asyncLoop());

function asyncLoop2() {
    for (var i = 0; i < 5; i++) {
        var tmp = i;
        setTimeout(function(){
            console.log(tmp);
        },1000);
        
    }
}

console.log(asyncLoop2());

function asyncLoop3() {
    for (var i = 0; i < 5; i++) {
        (function (num) { 
            setTimeout(function(){
                console.log(num);
            },1000);
         })(i)
        
        
    }
}

console.log(asyncLoop3());