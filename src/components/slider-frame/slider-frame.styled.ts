import styled, { css } from 'styled-components'
import { SlideTheme } from '../../types'

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

  @media (min-width: 376px) and (max-width: 428px) {
    grid-template-columns: auto;
    grid-template-rows: auto 1fr;
    padding: 98px 0 0;
  }

  @media (max-width: 375px) {
    grid-template-columns: auto;
    grid-template-rows: auto 1fr;
    padding: 88px 0 0;
  }
`

export const TextContainer = styled.div`
  padding: 0 var(--padding);
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;

  @media (max-width: 1024px) {
    height: 220px; // Temp "default" height, on mobiles should be overwritten by js
  }
`

export const VideoContainer = styled.div<{ horizontal: boolean; vertical: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;

  ${({ vertical }) =>
    vertical &&
    css`
      @media (max-width: 1024px) and (min-width: 1024px) {
        margin-top: 142px;
        height: 600px;
      }

      @media (max-width: 1023px) {
        margin-top: 74px;
        height: 500px;
      }

      @media (max-width: 428px) {
        margin-top: 94px;
      }

      @media (max-width: 375px) {
        margin-top: 32px;
      }
    `}

  ${({ horizontal }) =>
    horizontal &&
    css`
      @media (max-width: 1024px) {
        margin: 36px 0;
      }
    `}
`

export const Text = styled.div<{ active: boolean }>`
  flex: 0 1 768px;
  opacity: 0;
  visibility: hidden;
  transition: visibility 0.3s, opacity 0.3s;

  ${({ active }) =>
    active &&
    css`
      opacity: 1;
      visibility: visible;
    `}

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

export const Video = styled.div<{ active: boolean; horizontal: boolean; vertical: boolean }>`
  border-radius: var(--video-br);
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.3s;

  ${({ vertical }) =>
    vertical &&
    css`
      --video-br: 24px;

      @media (max-width: 1280px) {
        --video-br: 20px;
      }

      @media (max-width: 1024px) {
        --video-br: 24px;
      }

      @media (max-width: 768px) {
        --video-br: 20px;
      }

      @media (max-width: 428px) {
        --video-br: 20px;
      }

      @media (max-width: 320px) {
        --video-br: 20px;
      }
    `}

  ${({ horizontal }) =>
    horizontal &&
    css`
      --video-br: 24px;

      @media (max-width: 1440px) {
        --video-br: 18px;
      }

      @media (max-width: 1280px) {
        --video-br: 16px;
      }

      @media (max-width: 1024px) {
        --video-br: 24px;
      }

      @media (max-width: 768px) {
        --video-br: 16px;
      }

      @media (max-width: 428px) {
        --video-br: 12px;
      }

      @media (max-width: 320px) {
        --video-br: 9px;
      }
    `}

  ${({ active }) =>
    active &&
    css`
      opacity: 1;
    `}

  ${({ theme }) =>
    theme.color === SlideTheme.LIGHT &&
    css`
      box-shadow: 0px 1.67131px 5.01393px rgba(0, 0, 0, 0.05),
        0px 16.7131px 41.7827px rgba(0, 0, 0, 0.1);
    `}

  video {
    --vAvailable: calc(max(100vh, var(--min-height)) - 80px - 80px);
    --hAvailable: calc((max(100vw, var(--min-width)) / 2) - var(--padding) - var(--padding));
    max-height: min(600px, var(--vAvailable));
    max-width: var(--hAvailable);
    display: block;
    border-radius: var(--video-br);

    ${({ vertical }) =>
      vertical &&
      css`
        @media (max-height: 799px) {
          max-height: min(500px, var(--vAvailable));
        }

        @media (min-width: 1024px) and (max-width: 1024px) {
          max-height: 600px;
          max-width: 100%;
        }

        @media (max-width: 1023px) {
          max-height: 500px;
          max-width: 100%;
        }
      `}

    ${({ horizontal }) =>
      horizontal &&
      css`
        @media (max-width: 1023px) {
          max-height: 100%;
          --hAvailable: calc(max(100vw, var(--min-width)) - var(--padding) - var(--padding));
        }
      `}
  }
`

export const TextBaseline = styled.div`
  height: 0px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    justify-content: flex-start;
  }
`

export const VideoBaseline = styled.div`
  height: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`
