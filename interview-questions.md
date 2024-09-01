### Interview Questions
    
    1. What is a potential pitfall with using typeof bar === "object" to determine if bar is an object? How can this pitfall be avoided?

    Potential pitfalls depend on any restrictions/specifications as to what we want to qualify as a valid object.

    Null, functions, arrays are all technically objects so if we were to check type of for these, the result would be true. If we want to expect certain scenarios to be false we would need to add conditional logic.

    2. What will the code below output to the console and why?

    ```javascript
    (function(){
    var a = b = 3;
    })();

    console.log("a defined? " + (typeof a !== 'undefined'));
    console.log("b defined? " + (typeof b !== 'undefined'));
    ```  

    var a = b = 3, is shorthand for:
    b=3;
    var a =b

    Because we are not using "use strict" b is assigned as a global variable because it isn't preceded by 'var, let, const' keywords for declaring variables. A is assigned the value of b but, in our console.log we are trying to access variable 'a' outside of the scope of the function which means a is undefined. So our result would be: false, true.

    If we use strict, we will get a reference error stating b is undefined because because b isn't defined with let, const, or var. At this point our code stops executing and no variables are defined within the scope of the function.

   

    3. What will the code below output to the console and why?

    ```javascript
    var myObject = {
        foo: "bar",
        func: function() {
            var self = this;
            console.log("outer func:  this.foo = " + this.foo);
            console.log("outer func:  self.foo = " + self.foo);
            (function() {
                console.log("inner func:  this.foo = " + this.foo);
                console.log("inner func:  self.foo = " + self.foo);
            }());
        }
    };
    myObject.func();
    ```
Here we have an example of the use of closure and a self invoking anonymous function.
When we execute myObject.func(), the func function is called in which 'this' refers to myObject because it is a method of the object. So output to the console for the outer function would be :
outer func: this.foo = bar
outher func: self.foo = bar

The inner function output would be:
inner func: this.foo = undefined (in this case this refers to the window global object that doesn't have 'foo' assigned. In strict mode, 'this'would also be undefined because we aren't using let, var, or const to declare the variable).
inner func: self.foo = bar (the inner function has access to the scope of the outer function)     



    4. What is the significance of, and reason for, wrapping the entire content of a JavaScript source file in a function block?     

    Wrapping the entire content of a JavaScript source files in a function block is a common pattern know as IIFE (Immediately invoked function expression) This approach creates closure which provides a way to control scope. Instead of adding everything to the global object ('window') local scope is created. When the function is invoked we won't be able to rename/ manipulate varialbes defined within the function block. Libraries like node use this.



    5. What is the significance, and what are the benefits, of including 'use strict' at the beginning of a JavaScript source file? 

    Use strict specifies that any variable that is declared without let, var, const, will be undefined.
    A reference to a null or undefined value of 'this' will throw an error
    Duplicate names for function arguments will throw an error

    *Prevents accidental globals
    *Eliminates 'this' coercion
    *Disallows duplicate parameter values

    **RESEARCH THESE!!!!****
    *Makes eval() safer
    *Throws error on invalid usage of delete



    6. Consider the two functions below. Will they both return the same thing? Why or why not?

    ```javascript
    function foo1()
    {
    return {
        bar: "hello"
    };
    }

    function foo2()
    {
    return
    {
        bar: "hello"
    };
    }
    ```

    These 2 functions will not return the same thing.
    foo1() returns an object : {bar:hello}
    foo2() will return 'undefined' because of one of the javascript automatic semicolon insertion rules that automatically inserts a semicolon when there is a return statement on its own line. So in this example when we call foo2(), one we hit the return statement, anything after it will not run.

    7. What will the code below output? Explain your answer.

    ```javascript
    console.log(0.1 + 0.2);
    console.log(0.1 + 0.2 == 0.3); 
    ```
    The output is 0.30000000000000004
    false

    When converting from base 10 (what our number system uses) to base 2 (what computers use), there is rounding that occurs which can lead to unexpected results.

    Certain decimal numbers can't be exactly represented in binary form (base2) which is why we see rounding like in this example.
    
    Number.EPSILON can be used to check whether floating point numbers are equal or not.
   
    8. In what order will the numbers 1-4 be logged to the console when the code below is executed? Why?

    ```javascript
    (function() {
        console.log(1); 
        setTimeout(function(){console.log(2)}, 1000); 
        setTimeout(function(){console.log(3)}, 0); 
        console.log(4);
    })();
    ```
When setTimeout is set to zero, javascript doesn't automatically run the code. It is passed to the browser which then places the function to run in the callbackqueue(because of this there will be a delay even though we have set the timer to zero) . So it will run after the current script has been executed.
So we will see:
1,4,3,2


    9. Write a simple function (less than 160 characters) that returns a boolean indicating whether or not a string is a palindrome.

    ```javascript
    function isPalindrome(str){
        let reversedString = '';
        for(let i=str.length-1; i >=0; i--){
            reversedString += str[i]
        }
        if (str.toLowerCase() === reversedString.toLowercase()){
            return true;
        }
        return false;

    
    }

    function isPalindrome2(str){
        let left =0;
        let right = str.length-1;

        while (left <= right){
            if (str[left] !== str[right]) return false;
            left++;
            right--;
        }
        return true;
    }

    function isPalindrome3(str){
        return str.toLowerCase().split("").reverse().join("") === str.toLowerCase();
    }





    ```


    10. Write a sum method which will work properly when invoked using 
    either syntax below.

    ```javascript
    console.log(sum(2,3));   // Outputs 5
    console.log(sum(2)(3));  // Outputs 5
    ```
    11. Consider the following code snippet:

    ```javascript
    for (var i = 0; i < 5; i++) {
        var btn = document.createElement('button');
        btn.appendChild(document.createTextNode('Button ' + i));
        btn.addEventListener('click', function(){ console.log(i); });
        document.body.appendChild(btn);
}
    ```

    (a) What gets logged to the console when the user clicks on “Button 4” and why?
    5 gets logged to the console when the user clicks on any button because the use of var gives 
    the variable 'i' function scope. So when the event listener calls it's anonymous callback function,
    the value of 'i' is 5 because once we reach the end of the loop, i = =5.
    
    (b) Provide one or more alternate implementations that will work as expected.
    An alternate implementation is to use the 'let' keyword instead of 'var' which gives the variable
    'i' block scope. So as we iterate through the loop, each iteration is assigned it's own value of 'i'.
    (Each iteration of the loop gets a new binding of 'i')
    So when we click the button, we will see the value of 'i' as it is when the button was created.

    
    12. Assuming d is an “empty” object in scope, say: 
```javascript 
var d = {};
```

…what is accomplished using the following code?

```javascript
[ 'zebra', 'horse' ].forEach(function(k) {
	d[k] = undefined;
});
```

Each animal is put into an object and the value of each animal in the key value pair is set to undefined.

(useful strategy for ensuring an object has a given set of properties)


    13. What will the code below output to the console and why?

The output to the console will be :
 arr1: length =5 last= j,o,n,e,s
 arr2: length =5 last= j,o,n,e,s

 The output is the same because arr2 is a reference to array1. So whatever we do to array2 will affect
 array 1. 
 When we push an array onto another array, the array that is pushed is pushed as a single element, it is not concatenated. So when we execute arr1.slice(-1) we are accessing the last element on the array which is 'j,o,n,e,s'

```javascript
var arr1 = "john".split('');
var arr2 = arr1.reverse();
var arr3 = "jones".split('');
arr2.push(arr3);
console.log("array 1: length=" + arr1.length + " last=" + arr1.slice(-1));
console.log("array 2: length=" + arr2.length + " last=" + arr2.slice(-1));
```
    14. What will the code below output to the console and why?
```javascript
console.log(1 +  "2" + "2");
console.log(1 +  +"2" + "2");
console.log(1 +  -"1" + "2");
console.log(+"1" +  "1" + "2");
console.log( "A" - "B" + "2");
console.log( "A" - "B" + 2);
```

Ex.1 Here the first operation performed is 1 + "2", since "2" is a string, JS assumes string concatenation needs to be performed converts 1 to the string "1"  giving us "12" then "12" + "2" is string concatenation again which gives us "122"  

Ex.2 Here the first operation the +"2" which is unary operator which converts the string "2" into the number 2, so we have 1 + 2 which equals 3. Then we have 3 + "2" where JS assumes string concatenation and converts the number 3 to the string "3" so then we have the string "32" as a result.  

Ex.3 Here the first operation is the unary operator which converts the string of "1" into the number -1.
Then we add 1 + -1 which equals zero. Then we have 0 + "2" where JS assumes string concatenation  and converts the number 0 to the string "0" so then we have the string "02" as a result. 

Ex.4 Here the first operation is the unary operator which converts the string "1" to the number 1 then we add "1" where JS assumes string concatenation so the number 1 is converted back to a string "1" and we have "11" then we add another string "2" which JS assumes string concatenation so we end up with the string "112"


Ex.5 Here the first operation is "A" - "B". The problem with this is that subtraction cannot be used with strings, so the result is NaN (which has type of number). Next we add "2" to NaN which JS assumes string concatenation so we end up with the string "NaN2".

Ex.6. Here the first operation is "A" -"B" which is NaN. Next we take the number NaN and attempt to add the number 2 which results in the number NaN. 


    15. The following recursive code will cause a stack overflow if the array list is too large. How can you fix this and still retain the recursive pattern?
```javascript
var list = readHugeList();

var nextListItem = function() {
    var item = list.pop();

    if (item) {
        // process the list item...
        nextListItem();
    }
};
```

To fix this and retain the recursive pattern, we can add a setTimeout to each call to the nextListItem after the initial call. This will cause the initial call of nextListItem to return first which will result in a clear call stack before the browser gets the next takes from the event queue and pushes that onto the call stack for execution.

----
With recursive function calls, each call adds a new frame to the call stack. If we don't set an interval or delay, there is a potential for the call stack memory to be exhausted if we're dealing with something like a large array which causes a stack overflow error. 

To prevent this, using setTimeout breaks up the synchronous execution of the nextListItem function by adding an asynchronous element. With the use of setTimeout, each nextListItem function will run after the previous one has been completed and the call stack has been cleared.

----
``` javascript
let list = readHugeList();

let nextListItem = function(){
    let item = list.pop();

    if(item){
        setTimeout(nextListItem, 0);
    }
};
``` 

    16. What is a “closure” in JavaScript? Provide an example.

A closure is a function within a function. The inner function has access to the outher outer function's scope.
In addition, the inner function has access to its own scope and the global scope as well.

```javascript

function getNum(num1){
    return function addNums(num2){
        return num1 + num2;
    }
}


```

    17. What would the following lines of code output to the console?
```javascript
console.log("0 || 1 = "+(0 || 1)); 
console.log("1 || 2 = "+(1 || 2));
console.log("0 && 1 = "+(0 && 1));
console.log("1 && 2 = "+(1 && 2));
```

The first console prints out the string: 0 || 1 = 1 
( 1 is the first truthy value encounter from left to right)

The second console prints out the string: 1 || 2 = 1
(1 is the first thruthy value encountered from left to right)

The third console prints out the string 0 && 1 = 0
(0 is the first falsy value encountered from left to right)

The fourth console prints out the string 1 && 2 = 2
(both values are truthy so the last value of the operand is returned)


    18. What will be the output when the following code is executed? Explain.
```javascript
console.log(false == '0')
console.log(false === '0')
```

The first console prints out true because of type coercion when using the loose equality operator (==) in javascript.
So, when comparing a boolean to a non boolean, the boolean is converted to a number. So we end up with :
0 == '0' (string)
Next if one operand is a string and the other is a number, we convert the string to a number.
So we end up with 0 == 0 which evaluates to true.

The second console prints out false because when we use (===) we are comparing the exact type and value of each operand.

    19. What is the output out of the following code? Explain your answer.
```javascript
var a={},
    b={key:'b'},
    c={key:'c'};

a[b]=123;
a[c]=456;

console.log(a[b]);
```
The output is 456 because a key must be either a number, string, or symbol. Because the both b and c are objects, when we try to assign the key of  an object to an object, javascript converts it to the string '[object Object]'. Both keys are pointing to the same value 'object Object' which is why a[c] value of 456 overrides 123.

    20. What will the following code output to the console:
```javascript
console.log((function f(n){return ((n > 1) ? n * f(n-1) : n)})(10));
```
    21. Consider the code snippet below. What will the console output be and why?
```javascript
(function(x) {
    return (function(y) {
        console.log(x);
    })(2)
})(1);
```
    22. What will the following code output to the console and why:
```javascript
var hero = {
    _name: 'John Doe',
    getSecretIdentity: function (){
        return this._name;
    }
};

var stoleSecretIdentity = hero.getSecretIdentity;

console.log(stoleSecretIdentity());
console.log(hero.getSecretIdentity());
```
What is the issue with this code and how can it be fixed.
    23. Create a function that, given a DOM Element on the page, will visit the element itself and all of its descendents (not just its immediate children). For each element visited, the function should pass that element to a provided callback function.
    
    The arguments to the function should be:
    
    a DOM element
    a callback function (that takes a DOM element as its argument)
    24. Testing your this knowledge in JavaScript: What is the output of the following code?
```javascript
var length = 10;
function fn() {
	console.log(this.length);
}

var obj = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[0]();
  }
};

obj.method(fn, 1);
```
    25. Consider the following code. What will the output be, and why?
```javascript
(function () {
    try {
        throw new Error();
    } catch (x) {
        var x = 1, y = 2;
        console.log(x);
    }
    console.log(x);
    console.log(y);
})();
```
    26. What will be the output of this code?
```javascript
var x = 21;
var girl = function () {
    console.log(x);
    var x = 20;
};
girl ();
```
    27. What will this code print?
```javascript
for (let i = 0; i < 5; i++) {
  setTimeout(function() { console.log(i); }, i * 1000 );
}
```
    28. What do the following lines output, and why?
```javascript
console.log(1 < 2 < 3);
console.log(3 > 2 > 1);
```
    29. How do you add an element at the begining of an array? How do you add one at the end?
    30. Imagine you have this code:
```javascript
var a = [1, 2, 3];
```
a. Will this result in a crash?
```javascript
a[10] = 99;
```
b. What will this output?
```javascript
console.log(a[6]);
```
    31. What is the value of typeof undefined == typeof NULL?
    32. What would following code return?
```javascript
console.log(typeof typeof 1);
```
    33. What will be the output of the following code:
Explain your answer. How could the use of closures help here?
```javascript
for (var i = 0; i < 5; i++) {
	setTimeout(function() { console.log(i); }, i * 1000 );
}
```
    34. What is NaN? What is its type? How can you reliably test if a value is equal to NaN?
    35. What will the following code output and why?
```javascript
var b = 1;
function outer(){
   	var b = 2
    function inner(){
        b++;
        var b = 3;
        console.log(b)
    }
    inner();
}
outer();
```
    36. Discuss possible ways to write a function isInteger(x) that determines if x is an integer.



    37. How do you clone an object?