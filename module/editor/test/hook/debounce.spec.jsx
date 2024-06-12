import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '$editor/hook/debounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should return the initial value immediately', () => {
    const value = 'initial';
    const delay = 500;

    const { result } = renderHook(() => useDebounce(value, delay));

    expect(result.current).toEqual(value);
  });

  it('should return the debounced value after the delay', () => {
    const value = 'initial';
    const delay = 500;

    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value, delay },
    });

    act(() => {
      rerender({ value: 'updated', delay });
      jest.advanceTimersByTime(delay - 100);
    });

    expect(result.current).toEqual(value);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toEqual('updated');
  });

  it('should clear the timeout on unmount', () => {
    const value = 'initial';
    const delay = 500;

    const { unmount } = renderHook(() => useDebounce(value, delay));

    expect(() => {
      unmount();
    }).not.toThrow();
  });
});
