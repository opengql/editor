window.matchMedia = jest.fn().mockReturnValue({
  matches: false,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
});
