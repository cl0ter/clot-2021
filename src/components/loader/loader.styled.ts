import styled, { css, keyframes } from 'styled-components'

export const Loader = styled.section<{ loaded: boolean }>`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 6;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 1;
  visibility: visible;

  ${({ loaded }) =>
    loaded &&
    css`
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.5s, visibility 0.5s;
    `}
`

const blink = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

export const Logo = styled.div`
  animation: ${blink} 0.5s linear infinite alternate both;
`
