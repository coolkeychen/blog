const AllKeys = [0,1,2,3,4,5,6,7,8,9];
const usedKeys = [2,3,4];


// solution 1
const unusedKeys1 = function getUnUserdKeys(AllKeys,usedKeys) { 
    return AllKeys.reduce((acc,cur)=>{
        if(!usedKeys.includes(cur)) acc.push(cur);
        return acc;
    },[]);
};
console.log(unusedKeys1(AllKeys,usedKeys));


// solution 2
const unusedKeys2 = function getUnUserdKeys(AllKeys,usedKeys) { 
    return AllKeys.filter(item=> !usedKeys.includes(item));
};

console.log(unusedKeys2(AllKeys,usedKeys));