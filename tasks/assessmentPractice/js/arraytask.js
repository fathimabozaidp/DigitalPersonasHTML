//1. array containing different fruits
var fruits = ['Blueberry','Apple','PineApple','Persimmon','JackFruit', 'Mango', 'Melon'];
// console.log(fruits);

//2. adding new fruit chikoo to the end of the array
fruits.push('Chikoo');
// console.log(fruits);

//3. remove the first fruit from the array
fruits.shift();
// console.log(fruits);

//4. print each fruit in array to the console
fruits.forEach((item)=>{
    console.log(item);
});

//5. Write a loop that prints prime numbers from 1 to 10
console.log("Prime numbers from 1 to 10 are: ");
for(var i=2;i<=10;i++){
    for(var j=2;j<i;j++){
        if(i%j == 0){
            break;
        }        
    }
    if(i == j){
        console.log(i + " ");
    }
}

//6. Write a loop that prints even numbers from 1 to 20.
console.log("Even numbers from 1 to 20 are: ");
for(i=1;i<=20;i++){
    if(i%2 == 0){
        console.log(i);
    }
}

//7. Iterate over the fruits array created earlier and print each fruit.
for(i=0;i<fruits.length;i++){
    console.log(fruits[i]);
}

//8. Create an object person with properties name,age, and country
var Person = {
    name : "Fathima",
    age : 29,
    country: "India",
    //Add a method getDetails to the person object that returns a string with all the details.
    getDetails: function(){
        return this.name + " " +this.age + " " + this.country;
    }
};
//9. Update the age property of the person object.
Person.age = 30;

//10. Print the result of calling the getDetails method of the person object. 
console.log(Person.getDetails());
