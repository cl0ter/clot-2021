import * as S from './footer.styled'
import logo from './footer-logo.svg'
import { LinkList } from '../types.d'
import Links from './links'
import { RefObject, useEffect, useRef } from 'react'

const links: LinkList[] = [{
  title: 'APPs',
  list: [
    { text: 'iOS', url: './', },
    { text: 'Android', url: './', unavailable: true },
    { text: 'Apple TV', url: './', },
    { text: 'Android TV', url: './', unavailable: true },
    { text: 'Tizen', url: './', unavailable: true },
  ],
}, {
  title: 'Company',
  list: [
    { text: 'About', url: './' },
    { text: 'Careers', url: './' },
    { text: 'Contacts', url: './' },
  ],
}, {
  title: 'Help',
  list: [
    { text: 'Help Center', url: './' },
    { text: 'Support', url: './' },
  ],
}, {
  title: 'Follow',
  list: [
    { text: 'Instagram', url: './' },
    { text: 'Facebook', url: './' },
    { text: 'Twitter', url: './' },
  ],
}]

const Footer = ({
  footerRef,
}: {
  footerRef: RefObject<HTMLSpanElement | null>
}) => {
  return (
    <S.Footer>
      <S.IntersectionMarker ref={ footerRef } />
      <S.Logo>
        <img src={ logo } alt="footer logo" />
      </S.Logo>
      <S.Links>
        <Links list={ links } />
      </S.Links>
      <S.Copyright>
        © 2021 Clot Ltd
      </S.Copyright>
    </S.Footer>
  )
}

export default Footer
