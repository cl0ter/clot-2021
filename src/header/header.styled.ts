import styled from 'styled-components'
import { link, button } from '../root/global.styled'

export const Header = styled.header`
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 4;
  display: flex;
  justify-content: center;

  @media (max-width: 428px) {
    height: 64px;
  }
`

export const Container = styled.div`
  padding: 0 var(--padding);
  box-sizing: border-box;
  max-width: 2560px;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
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

  span {
    ${link}
    color: var(--color-light-gray-50);
    cursor: pointer;
  }
`

export const GetApp = styled.div`
  transition-property: margin-left, opacity, visibility;
`

export const Button = styled.button`
  ${button}

  @media (max-width: 1024px) {
    display: none;
  }
`

export const LinkButton = styled.a`
  ${button}
  text-decoration: none;
  display: none;
  line-height: 48px;

  @media (max-width: 1024px) {
    display: block;
  }
`
