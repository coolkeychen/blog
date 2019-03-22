const arr = [11,342,{},null,{},11,{name:'cat'},undefined,342,{name:'cat'},null,undefined];
function deepUnique(arr) {
    var hashTable = {};
    return arr.filter(el=>{
        // console.log(el);
        const key = JSON.stringify(el);
        // console.log(typeof key);
        // console.log(hashTable[key]);
        const match =Boolean(hashTable[key]);
        // console.log(hashTable);
        // console.log(match);
        return (match?false:hashTable[key] = true);
    })
}

console.log(deepUnique(arr));

var hashTable = {};

hashTable[1] = true;
hashTable['1'] = true;

console.log(hashTable); // { '1': true }


var hashTable = {};

hashTable[JSON.stringify(1)] = true;
hashTable[JSON.stringify('1')] = true;

console.log(hashTable); // { '1': true, '\'1\'': true }
