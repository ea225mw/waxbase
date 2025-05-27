import { multiply } from '../src/controllers/multiply'

test('multiply two numbers', () => {
  expect(multiply(3, 8)).toBe(24)
})
