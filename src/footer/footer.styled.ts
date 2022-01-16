import { RefObject } from 'react'
import styled from 'styled-components'

export const Footer = styled.footer`
  position: relative;
  background: white;
  padding: 160px 32px 64px;
  display: grid;
  grid-template:
    'logo . links' auto
    '. . .' 148px
    'copy copy copy' auto / 20px 1fr auto
  ;
`

export const Logo = styled.div`
  grid-area: logo;
`

export const Links = styled.div`
  grid-area: links;
`

export const Copyright = styled.div`
  grid-area: copy;
  color: var(--color-light-gray-50);
`

export const IntersectionMarker = styled.span<{ ref: any }>`
  position: absolute;
  top: -40px;
  left: 0;
  bottom: 0;
  visibility: hidden;
`
