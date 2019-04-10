function Person(num) {
    var age = num;
    this.getAge = function(){
        return age;
    }
    this.addAge = function(){
        age++;
    }
}

var cat = new Person(18);
console.log(cat.age);
cat.addAge();
console.log(cat.getAge());
cat.addAge();
console.log(cat.getAge());

var haha = new Person(23);
console.log(haha.getAge()); // 20