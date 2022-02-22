import { RefObject } from 'react'
import styled from 'styled-components'
import { link } from '../root/global.styled'

export const Footer = styled.footer`
  position: relative;
  background: white;
  display: flex;
  justify-content: center;
`

export const Container = styled.div`
  flex: 1;
  max-width: 2560px;
  box-sizing: border-box;
  padding: 160px var(--padding) 64px;
  display: grid;
  grid-template:
    'logo . links' auto
    '. . .' 148px
    'copy copy copy' auto / 20px 1fr auto;

  @media (min-width: 429px) and (max-width: 1024px) {
    grid-template:
      'logo' auto
      '.' 64px
      'links' auto
      '.' 148px
      'copy' auto / auto;
  }

  @media (max-width: 428px) {
    padding-top: 64px;
    grid-template:
      'logo' auto
      '.' 48px
      'links' auto
      '.' 48px
      'copy' auto / auto;
  }
`

export const Logo = styled.div`
  grid-area: logo;
`

export const Links = styled.div`
  grid-area: links;
`

export const Bottom = styled.div`
  grid-area: copy;
  color: var(--color-light-gray-50);
  display: flex;
  justify-content: space-between;

  @media (max-width: 428px) {
    justify-content: stretch;
    flex-direction: column;
    row-gap: 48px;
  }
`

export const IntersectionMarker = styled.span<{
  ref: RefObject<HTMLSpanElement>
}>`
  position: absolute;
  top: -40px;
  left: 0;
  bottom: 0;
  visibility: hidden;

  @media (max-width: 428px) {
    top: -32px;
  }
`

export const Copy = styled.div`
  @media (max-width: 428px) {
    order: 2;
  }
`

export const BottomLinks = styled.div`
  display: grid;
  grid-auto-flow: column;
  column-gap: 30px;

  @media (max-width: 428px) {
    order: 1;
    grid-auto-flow: row;
    row-gap: 16px;
    column-gap: 0px;
  }
`

export const BottomLink = styled.a`
  ${link}
  color: inherit;
`
