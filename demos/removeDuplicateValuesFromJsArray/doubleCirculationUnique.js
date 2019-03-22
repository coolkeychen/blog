const a = [1,23,123,354,23,354,112,1,23];

function doubleCirculationUnique(arr){
    if(!Array.isArray(arr)) {
        console.log('wrong type!')
        return
    }
    let tmp = [arr[0]];
    for(let i =0; i<arr.length; i++) {
        let flag = true;
        for (let j = 0; j < tmp.length; j++) {
            if(arr[i]===tmp[j]) {
                flag = false;
                break;
            } 
        }
        if(flag ){
            tmp.push(arr[i]);
        }
    }
    return tmp;
}

console.log(doubleCirculationUnique(a));