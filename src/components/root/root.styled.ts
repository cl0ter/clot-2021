import styled from 'styled-components'

export const Root = styled.main`
  position: relative;
  margin: 0 auto;
  width: var(--width);
  height: var(--height);
  overflow: hidden;
  perspective: 5000px;
  transform-style: preserve-3d;
`

export const TempVideoBox = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;

  video {
    position: absolute;
    left: 0;
    top: 0;
    width: 20vw;
    height: 20vh;
  }
`
