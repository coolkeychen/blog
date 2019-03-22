const a = [1,23,123,354,23,354,112,1,23];

function includesUnique(arr) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        const tmpVal = arr[i]
         if(!res.includes(tmpVal)){
             res.push(tmpVal);
         }       
    }
    return res;
}

console.log(includesUnique(a));