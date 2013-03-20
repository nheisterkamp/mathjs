![math.js](https://raw.github.com/josdejong/mathjs/master/img/mathjs.png)

[http://mathjs.org](http://mathjs.org)

Math.js is an extensive math library for JavaScript and Node.js.
It features real and complex numbers, units, matrices, a large set of
mathematical functions, and a flexible expression parser.
Powerful and easy to use.


## Features

- Supports numbers, complex numbers, units, strings, arrays, and matrices\*.
- Contains a large set of built-in functions and constants.
- Contains a flexible expression parser.
- Compatible with JavaScript’s built-in Math library.
- No dependencies. Runs on any JavaScript engine.
- Easily extensible.

\* Note: matrices are to be implemented.


## Install

Math.js can be installed using [npm](https://npmjs.org/):

    npm install mathjs

Alternatively, the latest stable version of math.js can be downloaded from github:

- [math.js](https://raw.github.com/josdejong/mathjs/master/math.js) (development version: uncompressed, with comments)
- [math.min.js](https://raw.github.com/josdejong/mathjs/master/math.min.js) (production version: minified)


## Load

### Node.js

Math.js can be loaded in node.js using `require`, and similarly in the browser
using [require.js](http://requirejs.org/).

```js
var math = require('mathjs');

math.sqrt(-4); // 2i
```

### Browser

Math.js can be loaded as a regular javascript file in the browser:

```html
<!DOCTYPE HTML>
<html>
<head>
    <script src="math.js" type="text/javascript"></script>
</head>
<body>
    <script type="text/javascript">
        math.sqrt(-4); // 2i
    </script>
</body>
</html>
```

<!-- TODO: Describe how to load using require.js -->


## Use

Math.js can be used similar to Javascript's built-in Math library.

```js
var math = require('mathjs'),
    Complex = math.Complex,
    Unit = math.Unit;

// use methods and types available in the math object
var a = math.sin(math.pi / 4);  // 0.7071067811865476
var b = math.pow(a, 2);         // 0.5

var c = new Complex(3, -4);     // 3 - 4i
math.sqrt(c);                   // 2 - i

math.sqrt(-4);                  // 2i

var f = new Unit(60, 'deg');    // 60 deg
var g = math.cos(f);            // 0.5
```


## Parser

Math.js contains a flexible and easy to use expression parser.
The parser supports all data types, methods and constants available in math.js.
It has a method `eval` to evaluate expressions,
and `parse` to parse expressions and build a node tree from it.
The parser supports variable and function definitions.
Variables and functions can be manipulated using the methods `get` and `set`.

The following example code shows how to create and use a parser.

```js
// load math.js
var math = require('mathjs');

// create a new parser
var parser = new math.parser.Parser();

// evaluate expressions
var a = parser.eval('sqrt(3^2 + 4^2)'); // a = 5
var b = parser.eval('sqrt(-4)');        // b = 2i
var c = parser.eval('2 inch in cm');    // c = 5.08 cm
var d = parser.eval('cos(45 deg)');     // d = 0.7071067811865476

// define variables and functions
parser.eval('x = 7 / 2');               // 3.5
parser.eval('x + 3');                   // 6.5
parser.eval('function f(x, y) = x^y');  // f(x, y)
parser.eval('f(2, 3)');                 // 8

// get and set variables and functions
var x = parser.get('x');                // x = 7
var f = parser.get('f');                // f = function
var g = f(3, 3);                        // g = 27
parser.set('h', 500);
parser.eval('h / 2');                   // 250
parser.set('hello', function (name) {
    return 'hello, ' + name + '!';
});
parser.eval('hello("user")');           // "hello, user!"

// clear defined functions and variables
parser.clear();
```

Available methods:

    var result = parser.eval(expr);    // evaluate an expression
    var value = parser.get(name);      // retrieve a variable from the parser
    parser.set(name, value);           // set a variable in the parser

    var node = parser.parse(expr);     // parse an expression into a node tree
    var result = node.eval();          // evaluate a node


## Workspace

Math.js features a workspace, which manages a set of expressions.
Expressions can be added, replace, deleted, and inserted in the workspace.
The workspace keeps track on the dependencies between the expressions,
and automatically updates results of depending expressions when variables
or function definitions are changed in the workspace.

```js
// load math.js
var math = require('mathjs');

// create a new workspace
var workspace = new math.parser.Workspace();

// add expressions to the workspace
var id0 = workspace.append('a = 3/4');
var id1 = workspace.append('a + 2');
workspace.getResult(id1); // 2.75

// replace expressions in the workspace
workspace.replace('a=5/2', id0);
workspace.getResult(id1); // 4.5
```

Available methods:

    var id = workspace.append(expr);
    var id = workspace.insertBefore(expr, beforeId);
    var id = workspace.insertAfter(expr, afterId);
    workspace.replace(expr, id);
    workspace.remove(id);
    workspace.clear();
    var expr    = workspace.getExpr(id);
    var result  = workspace.getResult(id);
    var deps    = workspace.getDependencies(id);
    var changes = workspace.getChanges(updateSeq);


## Data types

Math.js supports both native data types like Number, String, and Array,
as well as advanced data types like Complex and Unit.

### Number

The built-in type Number can be used in all methods.

```js
var math = require('mathjs');

math.subtract(7.1, 2.3);        // 4.8
math.round(math.pi, 3);         // 3.142
math.sqrt(new Number(4.41e2));  // 21
```

### String

The built-in type String can be used in applicable methods.

```js
var math = require('math.js');

math.add('hello ', 'world');    // 'hello world'
math.max('A', 'D', 'C');        // 'D'
```

### Complex

Math.js supports complex numbers.

```js
var math = require('math.js'),
    Complex = math.Complex;

var a = new Complex(2, 3);      // 2 + 3i
var b = new Complex('4 - 2i');  // 4 - 2i
math.add(a, b);                 // 6 + i
math.sqrt(-4);                  // 2i
```

### Unit

Math.js supports units.

```js
var math = require('math.js'),
    Unit = math.Unit;

var a = new Unit(55, 'cm');     // 550 mm
var b = new Unit(0.1, 'm');     // 100 mm
math.add(a, b);                 // 0.65 m

var parser = new math.parser.Parser();
parser.eval('2 inch in cm');    // 5.08 cm
```

### Array

Math.js supports n-dimensional arrays. Arrays can be created via JavaScript or
using the Parser.

```js
var math = require('math.js'),
    parser = new math.parser.Parser();

math.sqrt([1, 4, 9, 16, 25]);           // [1, 2, 3, 4, 5]

var a = [[1, 2], [3, 4]];               // [1, 2; 3, 4]
var b = parser.eval('[5, 6; 7, 8]');    // [5, 6; 7, 8]
var c = math.multiply(a, b);
math.format(c);                         // [19, 22; 43, 50]

```


## Constants

Math.js has the following built-in constants.

- math.E, math.e
- math.I, math.i
- math.LN2
- math.LN10
- math.LOG2E
- math.LOG10E
- math.PI, math.pi
- math.SQRT1_2
- math.SQRT2


## Methods

Math.js contains the following methods. The methods support all available data
types (Number, Complex, Unit, String, and Array) where applicable.

### Arithmetic

- math.abs(x)
- math.add(x, y)
- math.ceil(x)
- math.cube(x)
- math.divide(x, y)
- math.equal(x)
- math.exp(x)
- math.fix(x)
- math.floor(x)
- math.larger(x, y)
- math.largereq(x, y)
- math.log(x [, base])
- math.log10(x)
- math.mod(x, y)
- math.multiply(x, y)
- math.pow(x, y)
- math.round(x [, n])
- math.sign()
- math.smaller(x, y)
- math.smallereq(x, y)
- math.subtract(x, y)
- math.sqrt(x)
- math.square(x)
- math.unaryminus(x)
- math.unequal(x)

### Complex

- math.re(x)
- math.im(x)
- math.arg(x)
- math.conj(x)

### Probability

- math.factorial(x)
- math.random()

### Statistics

- math.max(a, b, c, ...)
- math.min(a, b, c, ...)

### Trigonometry

- math.acos(x)
- math.asin(x)
- math.atan(x)
- math.atan2(y, x)
- math.cos(x)
- math.cot(x)
- math.csc(x)
- math.sec(x)
- math.sin(x)
- math.tan(x)

### Units

- math.in(x, unit)

### Utils

- math.format([template, ] values)
- math.help(fn)
- math.import(filename | object, override)
- math.typeof(x)


## Extend

The library can easily be extended with functions and variables using the
`import` method. The method `import` accepts a filename or an object with
functions and variables.

```js
var math = require('mathjs');

// define new functions and variables
math.import({
    myvalue: 42,
    hello: function (name) {
        return 'hello, ' + name + '!';
    });
});

// defined methods can be used in both JavaScript as well as the parser
math.myvalue * 2;               // 84
math.hello('user');             // 'hello, user!'

var parser = new math.parser.Parser();
parser.eval('myvalue + 10');    // 52
parser.eval('hello("user")');   // 'hello, user!'
```

To import functions from a math library like
[numbers.js](https://github.com/sjkaliski/numbers.js),
the library must be installed using npm:

    npm install numbers

And next, the library can be imported into math.js:

```js
var math = require('mathjs'),
    parser = new math.parser.Parser();

// import the numbers.js library into math.js
math.import('numbers');

// use functions from numbers.js
math.fibonacci(7);                      // 7
parser.eval('fibonacci(7)');            // 7
```


## Build

First clone the project from github:

    git clone git://github.com/josdejong/mathjs.git

The project uses [jake](https://github.com/mde/jake) as build tool,
which must be installed globally. After jake is installed, the project
dependencies can be downloaded using npm. Then the project can be build by
executing jake in the root of the project.

    cd mathjs
    sudo npm install -g jake
    npm install
    jake

When jake is executed, it will generate the library math.js and math.min.js
from the source files, and will test the library.


## Test

To execute tests for the library, run:

    npm test


## Roadmap

- Version 0.1.0 (2013-02-18):
    - Implement all methods and constants available in the built-in Math library
    - Implement data types Complex and Unit
- Version 0.2.0 (2013-02-25):
    - Implement Parser, Scope, Node tree
    - Implement more methods
- Version 0.3.0 (2013-03-09):
    - Implement Workspace
    - Implement more methods
- Build a website (2013-03-11)
- Version 0.4.0 (2013-03-16):
    - Implement Arrays
- Version 0.5.0
    - Implement Matrices
- Version 1.0.0
    - Extensive testing
    - Add examples and documentation


## License

Copyright (C) 2013 Jos de Jong <wjosdejong@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.