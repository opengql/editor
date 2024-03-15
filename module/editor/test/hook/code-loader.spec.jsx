import { renderHook } from '@testing-library/react';
import { useCodeLoader } from '../../src/hook/code-loader';

describe('useCodeLoader', () => {
  beforeEach(() => {
    delete window.location;
  });

  it('should load and decode code correctly', () => {
    window.location = {
      search: '?code=H4sIAAAAAAAAA%2FN1DHH2UNAosApILSrOz9PUjbby8QxzDY739IvVtdNItnLOLKnU5AIAHq3DWycAAAA%3D',
    };

    const { result } = renderHook(() => useCodeLoader());

    expect(result.current).toEqual('MATCH (p:Person)-[:LIVES_IN]->(c:City)\n');
  });

  it('should return undefined if no code parameter is present', () => {
    window.location = {
      search: '',
    };

    const { result } = renderHook(() => useCodeLoader());

    expect(result.current).toBeUndefined();
  });
});
