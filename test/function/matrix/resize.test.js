// test resize
var assert = require('assert'),
    math = require('../../../index')(),
    Matrix = math.type.Matrix;

describe('resize', function() {

  it('should resize an array', function() {
    var array = [[0,1,2],[3,4,5]];
    assert.deepEqual(math.resize(array, [3, 2]), [[0,1], [3,4], arr(uninit, uninit)]);

    // content should be cloned
    var x = math.complex(2, 3);
    var a = [x];
    var b = math.resize(a, [2], 4);
    assert.deepEqual(b, [x, 4]);
    assert.notStrictEqual(b[0], x);
  });

  it('should resize an array with a default value', function() {
    var array = [[0,1,2],[3,4,5]];
    assert.deepEqual(math.resize(array, [3, 2], 5), [[0,1], [3,4], [5,5]]);
    assert.deepEqual(math.resize(array, [3]), [0,1,2]);
  });

  it('should resize an array with bignumbers', function() {
    var zero = math.bignumber(0);
    var one = math.bignumber(1);
    var two = math.bignumber(2);
    var three = math.bignumber(3);
    var array = [one, two, three];
    assert.deepEqual(math.resize(array, [three, two], zero),
        [[one,two], [zero, zero], [zero, zero]]);
  });

  it('should resize a matrix', function() {
    var matrix = new Matrix([[0,1,2],[3,4,5]]);
    assert.deepEqual(math.resize(matrix, [3, 2]),
        new Matrix([[0,1], [3,4], arr(uninit, uninit)]));
    assert.deepEqual(math.resize(matrix, new Matrix([3, 2])),
        new Matrix([[0,1], [3,4], arr(uninit, uninit)]));

    // content should be cloned
    var x = math.complex(2, 3);
    var a = new Matrix([x]);
    var b = math.resize(a, [2], 4);
    assert.deepEqual(b, new Matrix([x, 4]));
    assert.notStrictEqual(b.valueOf()[0], x);
  });

  it('should resize an array into a scalar', function() {
    var array = [[0,1,2],[3,4,5]];
    assert.deepEqual(math.resize(array, []), 0);
  });

  it('should resize a matrix into a scalar', function() {
    var matrix = new Matrix([[0,1,2],[3,4,5]]);
    assert.deepEqual(math.resize(matrix, []), 0);
  });

  it('should resize a scalar into an array when array is specified in settings', function() {
    var math = require('../../../index')({
      matrix: 'array'
    });

    assert.deepEqual(math.resize(2, [3], 4), [2, 4, 4]);
    assert.deepEqual(math.resize(2, [2,2], 4), [[2,4], [4,4]]);
  });

  it('should resize a scalar into a matrix', function() {
    assert.deepEqual(math.resize(2, [3], 4), new Matrix([2, 4, 4]));
    assert.deepEqual(math.resize(2, [2,2], 4), new Matrix([[2,4], [4,4]]));
  });

  it('should resize a scalar into a scalar', function() {
    var x = math.complex(2, 3);
    var y = math.resize(x, []);
    assert.deepEqual(x, y);
    assert.notStrictEqual(x, y);
  });

  it('should resize a string', function() {
    assert.equal(math.resize('hello', [2]), 'he');
    assert.equal(math.resize('hello', [8]), 'hello   ');
    assert.equal(math.resize('hello', [5]), 'hello');
    assert.equal(math.resize('hello', [8], '!'), 'hello!!!');
  });

  it('should throw an error on invalid arguments', function() {
    assert.throws(function () {math.resize()});
    assert.throws(function () {math.resize([])});
    assert.throws(function () {math.resize([], 2)});
    assert.throws(function () {math.resize([], [], 4, 555)});

    assert.throws(function () {math.resize([], ['no number'])}, /Invalid size/);
    assert.throws(function () {math.resize([], [2.3])}, /Invalid size/);

    assert.throws(function () {math.resize('hello', [])});
    assert.throws(function () {math.resize('hello', [2,3])});
    assert.throws(function () {math.resize('hello', [8], 'charzzz')});
    assert.throws(function () {math.resize('hello', [8], 2)});


    assert.throws(function () {math.resize('hello', ['no number'])}, /Invalid size/);
    assert.throws(function () {math.resize('hello', [2.3])}, /Invalid size/);
  });
});


/**
 * Helper function to create an Array containing uninitialized values
 * Example: arr(uninit, uninit, 2);    // [ , , 2 ]
 */
var uninit = {};
function arr() {
  var array = [];
  array.length = arguments.length;
  for (var i = 0; i < arguments.length; i++) {
    var value = arguments[i];
    if (value !== uninit) {
      array[i] = value;
    }
  }
  return array;
}
