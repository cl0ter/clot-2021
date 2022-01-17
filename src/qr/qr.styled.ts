import styled, { css } from 'styled-components'
import { button } from '../root/global.styled'

export const Qr = styled.section<{ visible: boolean }>`
  position: fixed;
  z-index: 5;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: white;
  transition: transform 0.2s, opacity 0.2s, visibility 0.2s;
  transform: scale(0.96);
  opacity: 0;
  visibility: hidden;
  display: flex;
  justify-content: center;

  ${({ visible }) => visible && css`
    transform: scale(1);
    opacity: 1;
    visibility: visible;
  `}

  @media (max-width: 1024px) {
    display: none;
  }
`

export const Container = styled.div`
  max-width: 2560px;
  flex: 1;
  display: grid;
  grid-template:
    'header header' 80px
    'left right' auto
    'footer footer' 80px / 1fr 1fr;
`

export const Header = styled.header`
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 var(--padding);
`

export const Left = styled.div`
  grid-area: left;
  padding: 0 var(--padding);
  align-self: center;
  justify-self: center;
  max-width: 768px;

  h1 {
    margin-bottom: 16px;
    color: var(--color-light-fg);
  }

  h2 {
    margin-bottom: 64px;
    color: var(--color-light-gray-50);
  }
`

export const Right = styled.div`
  grid-area: right;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0 var(--padding);

  img {
    max-width: 100%;
    max-height: 100%;
  }
`

export const Hide = styled.button`
  ${button}
  padding: 0 18px;
`
