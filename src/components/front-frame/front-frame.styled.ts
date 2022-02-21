import styled, { css } from 'styled-components'

export const Container = styled.section<{ secondActive: boolean }>`
  width: 100%;
  height: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: center top;
  transition: transform linear 0.4s, filter linear 0.4s;
  backface-visibility: hidden;

  ${({ secondActive }) =>
    secondActive
      ? css`
          transform: translate3d(0, 0, 0) rotate3d(1, 0, 0, 0deg);
          filter: brightness(1);
        `
      : css`
          transform: translate3d(0, 100%, 0) rotate3d(1, 0, 0, -90deg);
          filter: brightness(0);
        `}
`
