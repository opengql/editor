import '@testing-library/jest-dom';
import React from 'react';
import fetchMock from 'jest-fetch-mock';
import { storeRender } from '../helper/store-render';
import { ShareButton } from '../../src/container/share-button';
import { act, fireEvent, waitFor } from '@testing-library/react';
import { editorActions } from '../../src/state/slice/editor-slice';

function mockFetchApi(url) {
  const shortenLinkResponse = { url };
  fetchMock.mockResponse(JSON.stringify(shortenLinkResponse));
}

describe('ShareButton', () => {
  beforeAll(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
    fetchMock.mockClear();
  });

  afterAll(() => {
    fetchMock.disableMocks();
  });

  const initState = (store, { value }) => {
    act(() => {
      store.dispatch(editorActions.setValue(value ?? 'example code'));
    });
  };

  const renderShareButton = (state = {}) => {
    const result = storeRender(<ShareButton />);
    initState(result.store, state);
    return result;
  };

  it('should render button label', () => {
    const { getByRole } = renderShareButton();

    const buttonElement = getByRole('button');

    expect(buttonElement).toHaveTextContent('Share');
  });

  it('should call shortenLink function and copy shortened URL to clipboard on button click', async () => {
    const clipboardMock = {
      writeText: jest.fn(() => Promise.resolve()),
    };

    Object.defineProperty(window, 'navigator', {
      writable: true,
      value: { clipboard: clipboardMock },
    });

    const url = 'https://shorten.wilenskid.pl/abc';

    Object.defineProperty(window, 'location', {
      writable: true,
      value: { href: 'https://example.com/?code=fdsaf23dfdas' },
    });

    mockFetchApi(url);

    const { getByRole, getByText, queryByText } = renderShareButton();

    const buttonElement = getByRole('button');

    await act(() => fireEvent.click(buttonElement));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(clipboardMock.writeText).toHaveBeenCalledWith(url));

    expect(getByText('Copied!')).toBeInTheDocument();

    await waitFor(() => expect(queryByText('Copied!')).not.toBeInTheDocument());
  });

  it('should call shortenLink function and copy shortened URL to clipboard on button click', async () => {
    const clipboardMock = {
      writeText: jest.fn(() => Promise.resolve()),
    };

    Object.defineProperty(window, 'navigator', {
      writable: true,
      value: { clipboard: clipboardMock },
    });

    const url = 'https://shorten.wilenskid.pl/abc';

    Object.defineProperty(window, 'location', {
      writable: true,
      value: { href: 'https://example.com/' },
    });

    mockFetchApi(url);

    const { getByRole, getByText, queryByText } = renderShareButton();

    const buttonElement = getByRole('button');

    await act(() => fireEvent.click(buttonElement));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(clipboardMock.writeText).toHaveBeenCalledWith(url));

    expect(getByText('Copied!')).toBeInTheDocument();

    await waitFor(() => expect(queryByText('Copied!')).not.toBeInTheDocument());
  });
});
