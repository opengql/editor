import { renderHook, act } from '@testing-library/react';
import { useDebouncedEffect } from '$editor/hook/debounced-effect';

jest.useFakeTimers();

describe('useDebouncedEffect', () => {
  it('should call the effect callback after delay', () => {
    const effectCallback = jest.fn();

    renderHook(() => useDebouncedEffect(effectCallback, 100, []));

    expect(effectCallback).not.toHaveBeenCalled();

    act(() => jest.advanceTimersByTime(100));

    expect(effectCallback).toHaveBeenCalled();
  });

  it('should not call the effect callback immediately', () => {
    const effectCallback = jest.fn();

    renderHook(() => useDebouncedEffect(effectCallback, 100, []));

    expect(effectCallback).not.toHaveBeenCalled();

    act(() => jest.advanceTimersByTime(50));

    expect(effectCallback).not.toHaveBeenCalled();
  });

  it('should call the effect callback when dependencies change', () => {
    const effectCallback = jest.fn();

    const { rerender } = renderHook(({ deps }) => useDebouncedEffect(effectCallback, 200, deps), {
      initialProps: {
        deps: [1],
      },
    });

    expect(effectCallback).not.toHaveBeenCalled();

    act(() => jest.advanceTimersByTime(100));

    expect(effectCallback).not.toHaveBeenCalled();

    rerender({ deps: [2] });

    expect(effectCallback).not.toHaveBeenCalled();

    act(() => jest.advanceTimersByTime(200));

    expect(effectCallback).toHaveBeenCalled();
  });

  it('should clean up previous effect when dependencies change', () => {
    const destructorCallback = jest.fn();
    const effectCallback = jest.fn().mockReturnValue(destructorCallback);

    const { rerender } = renderHook(({ deps }) => useDebouncedEffect(effectCallback, 200, deps), {
      initialProps: {
        deps: ['test'],
      },
    });

    act(() => jest.advanceTimersByTime(200));

    rerender({ deps: ['test1'] });

    act(() => jest.advanceTimersByTime(200));

    expect(destructorCallback).toHaveBeenCalled();
    expect(effectCallback).toHaveBeenCalledTimes(2);
  });
});
