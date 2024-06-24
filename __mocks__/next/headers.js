export const cookies = jest.fn(() => ({
  get: jest.fn(),
  set: jest.fn(),
}))

export const headers = jest.fn(() => ({
  get: jest.fn(),
}))
