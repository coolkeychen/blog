const a = [1,23,123,354,23,354,112,1,23];

function sortUnique(arr) {
    let res = [];
    const tmparr = arr.sort();
    for (let i = 0; i < tmparr.length; i++) {
        if (tmparr[i] != tmparr[i-1]) {
            res.push(tmparr[i]);
        }
    }
    return res;
}

console.log(sortUnique(a));
