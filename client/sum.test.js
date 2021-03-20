const functions = require('./sum');
// const subtract = require('./subtract')

test('adds 1 + 2 to equal 3', () => {
  expect(functions.sum(1, 2)).toBe(3)
})

test('subtracts 6 - 2 to equal 4', () => {
  expect(functions.subtract(6, 2)).toBe(3)
})