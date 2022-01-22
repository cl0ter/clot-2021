import styled, { css } from 'styled-components'
import { SlideTheme } from '../types'

export const Progress = styled.section`
  position: absolute;
  bottom: 16px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;

  @media (max-width: 428px) {
    top: 64px;
    bottom: auto;
  }
`

export const Bar = styled.div`
  flex: 1;
  max-width: 2560px;
  padding: 0 var(--padding);
  box-sizing: border-box;
  height: 4px;
  display: grid;
  grid-auto-flow: column;
  column-gap: 4px;

  @media (max-width: 428px) {
    height: 2px;
  }
`

export const Part = styled.div`
  ${({ theme }) =>
    theme.color === SlideTheme.LIGHT
      ? css`
          background: var(--color-light-gray-10);
        `
      : css`
          background: var(--color-dark-gray-10);
        `}

  height: 100%;
  border-radius: 4px;
  overflow: hidden;

  span {
    border-radius: 4px;
    display: block;
    height: 100%;
    transition-property: width;
    transition-timing-function: linear;

    ${({ theme }) =>
      theme.color === SlideTheme.LIGHT
        ? css`
            background: var(--color-light-fg);
          `
        : css`
            background: white;
          `}
  }
`
