import * as S from './footer.styled'
import logo from './footer-logo.svg'
import { LinkList } from '../../types'
import Links from './links'
import { RefObject, useContext } from 'react'
import { LangContext } from '../../hooks'

const Footer = ({ footerRef }: { footerRef: RefObject<HTMLSpanElement> }) => {
  const texts = useContext(LangContext)

  const footerLinks: LinkList[] = texts.footerLinks || []
  const bottomLinks: LinkList['list'] = texts.bottomLinks || []

  return (
    <S.Footer>
      <S.Container>
        <S.IntersectionMarker ref={footerRef} />
        <S.Logo>
          <img src={logo} alt="footer logo" />
        </S.Logo>
        <S.Links>
          <Links list={footerLinks} />
        </S.Links>
        <S.Bottom>
          <S.Copy>{texts.copyright}</S.Copy>
          <S.BottomLinks>
            {bottomLinks.map((link, idx) => (
              <S.BottomLink key={idx} href={link.url} target="_blank" rel="noopener noreferrer">
                {link.text}
              </S.BottomLink>
            ))}
          </S.BottomLinks>
        </S.Bottom>
      </S.Container>
    </S.Footer>
  )
}

export default Footer
