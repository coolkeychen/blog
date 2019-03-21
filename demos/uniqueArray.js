function uniqueArray (arr) {
    return arr.filter((value, index, self) => self.indexOf(value) === index)
   }


const arr = [11,342,{},null,{},11,{name:'cat'},undefined,342,{name:'cat'},null];

console.log(uniqueArray(arr));

