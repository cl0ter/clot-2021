import { RefObject, useContext, useEffect, useRef, useState } from 'react'
import { LangContext } from '../../hooks'
import * as S from './header.styled'
import Logo from './logo'

const Header = ({
  show,
  secondActive,
  footerRef,
  footerRoot,
  toggleLang
}: {
  show: () => void
  secondActive: boolean
  footerRef: RefObject<HTMLSpanElement>
  footerRoot: RefObject<HTMLDivElement>
  toggleLang: () => void
}) => {
  const texts = useContext(LangContext)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!buttonRef.current) {
      return
    }

    const margin = (() => {
      if (secondActive) {
        return -buttonRef.current.clientWidth
      }
      return 0
    })()

    buttonRef.current.style.marginLeft = `${margin}px`
    buttonRef.current.style.opacity = secondActive ? '0' : '1'
    buttonRef.current.style.transitionDuration = '0.5s, 0.2s, 0.5s'
    buttonRef.current.style.transitionDelay = secondActive ? '0s, 0s, 0s' : '0s, 0.3s, 0s'
    buttonRef.current.style.visibility = secondActive ? 'hidden' : 'visible'
  }, [secondActive])

  const [intersecting, setIntersecting] = useState(false)

  useEffect(() => {
    if (footerRef.current === null || footerRoot.current === null) {
      return
    }

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          setIntersecting(entry.isIntersecting)
        })
      },
      { rootMargin: '0px 0px -100% 0px', root: footerRoot.current }
    )
    observer.observe(footerRef.current)
  }, [footerRef, footerRoot])

  return (
    <S.Header>
      <S.Container>
        <S.Left>
          <S.Logo>
            <Logo fill={secondActive && !intersecting ? 'white' : '#1c1c1c'} />
          </S.Logo>
        </S.Left>
        <S.Right>
          <S.Lang>
            <span onClick={toggleLang}>{texts.headerSwitchLang}</span>
          </S.Lang>
          <S.GetApp ref={buttonRef}>
            <S.Button type="button" onClick={show}>
              {texts.headerGetApp}
            </S.Button>
            <S.LinkButton href={texts.appStoreLink} target="_blank">
              {texts.headerGetApp}
            </S.LinkButton>
          </S.GetApp>
        </S.Right>
      </S.Container>
    </S.Header>
  )
}

export default Header
