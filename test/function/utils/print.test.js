// test print
var assert = require('assert'),
    math = require('../../../index')();

describe('print', function() {

  it('should interpolate values in a template', function() {
    assert.equal(math.print('hello, $name!', {name: 'user'}), 'hello, user!');
  });

  it('should interpolate values from a nested object in a template', function() {
    assert.equal(math.print('hello, $name.first $name.last!', {
      name: {
        first: 'first',
        last: 'last'
      }
    }), 'hello, first last!');
  });

  it('should round interpolate values with provided precision', function() {
    assert.equal(math.print('pi=$pi', {pi: math.pi}, 3), 'pi=3.14');
  });

  it('should leave unresolved variables untouched', function() {
    assert.equal(math.print('$a,$b', {b: 2}), '$a,2');
    assert.equal(math.print('$a.value,$b.value', {a: {}, b: {value: 2}}), '$a.value,2');
  });

  it('should leave trailing point intact', function() {
    assert.equal(math.print('Hello $name.', {name: 'user'}), 'Hello user.');
    assert.equal(math.print('Hello $name...', {name: 'user'}), 'Hello user...');
    assert.equal(math.print('Hello $user.name.', {user: {name: 'user'}}), 'Hello user.');
  });

  it('should throw an error on wrong number of arguments', function() {
    assert.throws (function () {math.print()}, math.error.ArgumentsError);
    assert.throws (function () {math.print('')}, math.error.ArgumentsError);
    assert.throws (function () {math.print('', {}, 6, 2)}, math.error.ArgumentsError);
  });

  it('should throw an error on wrong type of arguments', function() {
    assert.throws (function () {math.print(2, {})}, TypeError);
    assert.throws (function () {math.print('', 2)}, TypeError);
  });

});