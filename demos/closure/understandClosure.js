var later;
function outerFn() { 
    function innerFn() { 
        console.log(lateVal);
    }
    later = innerFn;  
}

console.log(lateVal);
var lateVal = 'cat';
outerFn();
later();