export const mockNavigateFunc = jest.fn();

export const mockNavigate = () => {
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigateFunc,
  }));
};
