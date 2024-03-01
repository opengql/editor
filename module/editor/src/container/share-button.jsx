import React, { useEffect, useState } from 'react';
import { useEncoding } from '../hook/encoding';
import { Button } from '../component/button';
import { ShareIcon } from '../icon/share-icon';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ShareButtonImpl = ({ code }) => {
  const { encode } = useEncoding();
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

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

  const handleClick = () => {
    (async () => {
      setIsLoading(true);
      const encodedCodeStr = encode(code);
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
  };

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

ShareButtonImpl.propTypes = {
  code: PropTypes.string.isRequired,
};

const mapStateToAction = (state) => ({
  code: state.editor.value,
});

export const ShareButton = connect(mapStateToAction)(ShareButtonImpl);
