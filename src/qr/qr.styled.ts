import styled, { css } from 'styled-components'
import { button } from '../root/root.styled'

export const Qr = styled.section<{ visible: boolean }>`
  position: fixed;
  z-index: 6;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: white;
  display: grid;
  grid-template:
    'header header' 80px
    'left right' auto
    'footer footer' 80px / 1fr 1fr;
  transition: transform 0.2s, opacity 0.2s, visibility 0.2s;
  transform: scale(0.96);
  opacity: 0;
  visibility: hidden;

  ${({ visible }) => visible && css`
    transform: scale(1);
    opacity: 1;
    visibility: visible;
  `}
`

export const Header = styled.header`
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 32px;
`

export const Left = styled.div`
  grid-area: left;
  padding: 0 32px;
  align-self: center;

  h1 {
    margin-bottom: 16px;
  }

  h2 {
    margin-bottom: 64px;
  }
`

export const Right = styled.div`
  grid-area: right;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
  }
`

export const Hide = styled.button`
  ${button}
  padding: 0 18px;
`
