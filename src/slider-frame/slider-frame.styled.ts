import styled, { css } from 'styled-components'
import { SlideTheme } from '../types.d'

export const Frame = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  padding: 80px 0;
  position: relative;

  ${({ theme }) => theme.color === SlideTheme.LIGHT
    ? css`
      background: var(--color-light-bg);
    `
    : css`
      background: var(--color-dark-bg);
    `
  }
`

export const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 32px;
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

  h1 {
    ${({ theme }) => theme.color === SlideTheme.LIGHT
    ? css`
      color: var(--color-light-fg);
    `
    : css`
      color: var(--color-light-bg);
    `
  }
    margin-bottom: 16px;
  }

  h2 {
    color: var(--color-light-gray-50);
    margin-bottom: 64px;
  }
`

export const Video = styled.div`
  height: calc(100vh - 160px);
  box-shadow: 0px 1.67131px 5.01393px rgba(0, 0, 0, 0.05), 0px 16.7131px 41.7827px rgba(0, 0, 0, 0.1);
  border-radius: 24px;
  overflow: hidden;

  video {
    max-height: 100%;
    max-width: 100%;
    border-radius: 24px;
  }
`
