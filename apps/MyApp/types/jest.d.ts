/// <reference types="jest" />

declare global {
  const describe: jest.Describe
  const it: jest.It
  const test: jest.It
  const expect: jest.Expect
  const beforeEach: jest.Lifecycle
  const afterEach: jest.Lifecycle
  const beforeAll: jest.Lifecycle
  const afterAll: jest.Lifecycle
  const jest: jest.Jest

  namespace jest {
    interface Matchers<R> {
      toBeDefined(): R
      toBeUndefined(): R
      toBeNull(): R
      toBeTruthy(): R
      toBeFalsy(): R
      toBe(value: any): R
      toEqual(value: any): R
      toContain(value: any): R
      toContainEqual(value: any): R
      toHaveLength(length: number): R
      toHaveProperty(prop: string, value?: any): R
      toMatch(regexp: RegExp | string): R
      toThrow(error?: string | RegExp | Error): R
    }
  }
}

export {}
