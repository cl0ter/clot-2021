import styled, { css } from 'styled-components'
import { SlideTheme } from '../types'

export const Frame = styled.section`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;

  ${({ theme }) =>
    theme.color === SlideTheme.LIGHT
      ? css`
          background: var(--color-light-bg);
        `
      : css`
          background: var(--color-dark-bg);

          @media (max-width: 428px) {
            background: var(--color-light-fg);
          }
        `}
`

export const Container = styled.div`
  flex: 1;
  max-width: 2560px;
  display: grid;
  box-sizing: border-box;
  padding: 80px 0;
  grid-template-columns: 1fr 1fr;

  @media (min-width: 769px) and (max-width: 1024px) {
    grid-template-columns: auto;
    grid-template-rows: auto 1fr;
    padding: 192px 0 0;
  }

  @media (min-width: 429px) and (max-width: 768px) {
    grid-template-columns: auto;
    grid-template-rows: auto 1fr;
    padding: 128px 0 0;
  }

  @media (max-width: 428px) {
    grid-template-columns: auto;
    grid-template-rows: auto 1fr;
    padding: 98px 0 0;
  }
`

export const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 var(--padding);
`

export const VideoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export const Text = styled.div`
  flex: 1;
  max-width: 768px;

  @media (max-width: 1024px) {
    max-width: none;
  }

  h1 {
    ${({ theme }) =>
      theme.color === SlideTheme.LIGHT
        ? css`
            color: var(--color-light-fg);
          `
        : css`
            color: var(--color-light-bg);
          `}
    margin-bottom: 16px;
  }

  h2 {
    color: var(--color-light-gray-50);
    margin-bottom: 64px;

    @media (max-width: 768px) {
      margin-bottom: 32px;
    }
  }
`

export const Video = styled.div`
  border-radius: 24px;
  overflow: hidden;
  ${({ theme }) =>
    theme.color === SlideTheme.LIGHT &&
    css`
      box-shadow: 0px 1.67131px 5.01393px rgba(0, 0, 0, 0.05),
        0px 16.7131px 41.7827px rgba(0, 0, 0, 0.1);
    `}

  video {
    max-height: calc(var(--height) - 110px - 110px);
    max-width: calc(
      min(2560px, var(--width)) / 2 - var(--padding) - var(--padding)
    );
    border-radius: 24px;
    display: block;

    @media (max-width: 1024px) {
      max-height: 50vh;
      max-width: 50vw;
    }
  }
`
