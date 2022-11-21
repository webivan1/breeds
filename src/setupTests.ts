import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'

// Object.defineProperty(global, 'IS_REACT_ACT_ENVIRONMENT', {
//   // get: () => true,
//   // set: () => {
//   //   // return nothing
//   // },
// })

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers)

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup()
})
