import React, { useCallback, useEffect, useState } from 'react';
import { useEncoding } from '$editor/hook/encoding';
import { Button } from '$editor/component/button';
import { ShareIcon } from '$editor/icon/share-icon';
import { useEditorValue } from '$editor/store/hook/editor';

/***
 * Container that allows to copy reference link that can be shared with other users.
 *
 * @returns {JSX.Element}
 * @constructor
 */
export const ShareButton = () => {
  const editorValue = useEditorValue();

  const { encode } = useEncoding();
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  /***
   * Async method that generates the shortened link for provided long url.
   *
   * @param {string} url
   * @returns {Promise<{ url: string }>}
   */
  const shortenLink = async (url) =>
    await fetch('https://shorten.wilenskid.pl/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url,
      }),
    }).then(async (response) => await response.json());

  /***
   * Method that handle the logic behind the long url generation and copy of shortened link.
   *
   * @type {(function(): void)}
   */
  const handleClick = useCallback(() => {
    (async () => {
      setIsLoading(true);
      const encodedCodeStr = encode(editorValue);
      const codeParamValue = encodeURIComponent(encodedCodeStr);
      let targetUrl = window.location.href;

      if (targetUrl.includes('code=')) {
        targetUrl = targetUrl.replace(/([&?])code=[^&]*(&|$)/, '$1');
      }

      if (targetUrl.includes('?')) {
        targetUrl += `&code=${codeParamValue}`;
      } else {
        targetUrl += `?code=${codeParamValue}`;
      }

      const shortenUrl = await shortenLink(targetUrl);
      await navigator.clipboard.writeText(shortenUrl.url);
      setIsLoading(false);
      setIsCopied(true);
    })().catch(console.error);
  }, [editorValue]);

  useEffect(() => {
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }, [isCopied]);

  return (
    <Button
      icon={<ShareIcon width="0.8rem" height="0.8rem" />}
      label="Share"
      onClick={handleClick}
      isLoading={isLoading}
      isCopied={isCopied}
      testId="ti-share-button"
    />
  );
};
