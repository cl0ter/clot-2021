import styled, { css } from 'styled-components'
import { SlideTheme } from '../types.d'

export const Progress = styled.section`
  padding: 0 32px;
  position: absolute;
  bottom: 16px;
  left: 0;
  right: 0;
`

export const Bar = styled.div`
  height: 4px;
  display: grid;
  grid-auto-flow: column;
  column-gap: 4px;
`

export const Part = styled.div`
  ${({ theme }) => theme.color === SlideTheme.LIGHT
    ? css`
      background: var(--color-light-gray-10);
    `
    : css`
      background: var(--color-dark-gray-10);
    `
  }

  height: 100%;
  border-radius: 4px;
  overflow: hidden;

  span {
    border-radius: 4px;
    display: block;
    height: 100%;
    transition-property: width;
    transition-timing-function: linear;

    ${({ theme }) => theme.color === SlideTheme.LIGHT
      ? css`
        background: var(--color-light-fg);
      `
      : css`
        background: white;
      `
    }
  }
`
