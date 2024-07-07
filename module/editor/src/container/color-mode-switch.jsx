import React, { useEffect, useState } from 'react';
import css from '$editor/container/style/color-mode-switch.module.css';
import { SunIcon } from '$editor/icon/sun-icon';
import { MoonIcon } from '$editor/icon/moon-icon';

/***
 * Container responsible for providing functionality to indicate and switch colors scheme.
 *
 * @returns {JSX.Element}
 * @constructor
 */
export const ColorModeSwitch = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    const mq = window.matchMedia('(prefers-color-scheme: dark)');

    if (theme !== null) {
      setDarkMode(theme === 'true');
      setIsInitialized(true);
      return;
    }

    if (mq.matches) {
      setDarkMode(true);
    }

    const eventListenerCallback = (evt) => setDarkMode(evt.matches);
    mq.addEventListener('change', eventListenerCallback);
    setIsInitialized(true);

    return () => {
      mq.removeEventListener('change', eventListenerCallback);
    };
  }, []);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    document.querySelector(':root').dataset.theme = darkMode ? 'dark' : undefined;
    localStorage.setItem('theme', `${darkMode}`);
  }, [darkMode]);

  return (
    <div className={css.switchContainer}>
      <label className={css.switch}>
        <input type="checkbox" id="mode-switch" checked={darkMode} onChange={toggleDarkMode} />
        <span className={css.slider}></span>
        <div className={`${css.icon} ${css.sun}`}>
          <SunIcon className={css.sunIcon} width="20px" height="20px" />
        </div>
        <div className={`${css.icon} ${css.moon}`}>
          <MoonIcon className={css.moonIcon} width="20px" height="20px" />
        </div>
      </label>
    </div>
  );
};
