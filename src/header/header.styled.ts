import styled from 'styled-components'
import { link, button } from '../root/root.styled'

export const Header = styled.header`
  padding: 0 32px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 5;
`

export const Left = styled.div``

export const Right = styled.div`
  display: flex;
`

export const Logo = styled.div`
  height: 20px;

  svg {
    transition: fill 0.5s;
  }
`

export const Lang = styled.div`
  padding: 0 24px;
  display: flex;
  align-items: center;

  a {
    ${link}
    color: var(--color-light-gray-50);
  }
`

export const GetApp = styled.div`
  transition-property: margin-left, opacity, visibility;
`

export const Button = styled.button`
  ${button}
`
