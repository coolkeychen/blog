const a = [1,23,123,354,23,354,112,1,23];


function setUnique(arr) { 
    return [...new Set(arr)];
}

console.log(setUnique(a));