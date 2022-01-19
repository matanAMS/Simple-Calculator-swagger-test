const { Add, Multiply, Minus, Divide } = require('../functions/myFunction.js')

describe('Test for myFunction.js if the all finctions work correctly ', function () {
  test('Add 1 + 2 toBe equal 3', () => {
    expect(Add(1, 2)).toBe(3);
  });

  test('Multiply 1 * 2 toBe equal 2', () => {
    expect(Multiply(1, 2)).toBe(2);
  });

  test('Minus 1 - 2 toBe equal -1', () => {
    expect(Minus(1, 2)).toBe(-1);
  });

  test('Divide 1 / 2 toBe equal 0.5', () => {
    expect(Divide(1, 2)).toBe(0.5);
  });
})

