import { createGlobalStyle, css } from 'styled-components'
import basierCircleMedium from './basier-circle-medium.woff2'
import basierCircleRegular from './basier-circle-regular.woff2'

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font: 400 16px/22px 'Basier Circle';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :root {
    --color-light-fg: #1C1C1E;
    --color-light-gray-50: #8E8E93;
    --color-light-gray-20: #AEAEB2;
    --color-light-gray-10: #D1D1D6;
    --color-light-gray-5: #F3F4F5;
    --color-light-bg: #FFFFFF;
    --color-dark-fg: #F4F4F4;
    --color-dark-gray-50: #8E8E93;
    --color-dark-gray-20: #636366;
    --color-dark-gray-10: #3A3A3C;
    --color-dark-gray-5: #1c1c1e;
    --color-dark-bg: #000000;

    --color-red: #FF3A30;

    --height: max(100vh, 500px);
    --width: max(100vw, 320px);
    --padding: 32px;

    @media (max-width: 428px) {
      --padding: 16px;
    }
  }

  @font-face {
    font-family: 'Basier Circle';
    font-weight: 400;
    src: url(${basierCircleRegular});
  }

  @font-face {
    font-family: 'Basier Circle';
    font-weight: 500;
    src: url(${basierCircleMedium});
  }

  h1 {
    font-weight: 500;
    font-size: 48px;
    line-height: 56px;
    margin: 0;

    @media (max-width: 428px) {
      font-size: 34px;
      line-height: 40px;
      letter-spacing: 0.2px;
    }
  }

  h2 {
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    margin: 0;

    @media (max-width: 428px) {
      font-size: 16px;
      font-weight: 400;
      line-height: 22px;
    }
  }
`

export const link = css`
  display: inline-block; // required for transforms
  text-decoration: none;
  color: var(--color-light-fg);
  transition: opacity 0.2s, transform 0.2s;

  &:hover {
    opacity: 0.6;
  }

  &:active {
    transform: scale(0.96);
  }
`

export const button = css`
  appearance: none;
  font: inherit;
  background: var(--color-light-fg);
  color: white;
  height: 48px;
  padding: 0 24px;
  box-shadow: 0px 3px 8px rgba(25, 28, 31, 0.45);
  border-radius: 16px;
  border: 0;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.2s;
  transform: scale(1);

  &:hover {
    opacity: 0.8;
  }

  &:active {
    transform: scale(0.96);
  }
`
