const a = [1,23,123,354,23,354,112,1,23];

function indexOfUnique(arr) {
    let res = [];
    for (let i = 0; i < arr.length; i++) {
        if(res.indexOf(arr[i])==-1) {
            res.push(arr[i]);
        }
    }
    return res;
}

console.log(indexOfUnique(a));