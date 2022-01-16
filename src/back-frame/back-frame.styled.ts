import styled from 'styled-components'

export const Container = styled.section`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: center bottom;
  transform: translate3d(0, 0%, 0) rotate3d(1, 0, 0, 0deg);
  transition: transform linear 0.5s, filter linear 0.5s, z-index linear 0.5s;
  filter: brightness(1);
  z-index: 4;

  &.away {
    transform: translate3d(0, -100%, 0) rotate3d(1, 0, 0, 90deg);
    filter: brightness(0);
    z-index: 1;
  }
`
