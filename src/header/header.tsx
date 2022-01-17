import { RefObject, useEffect, useRef, useState } from 'react'
import * as S from './header.styled'
import Logo from './logo'

const Header = ({
  show,
  secondActive,
  footerRef,
  footerRoot,
}: {
  show: () => void,
  secondActive: boolean,
  footerRef: RefObject<HTMLSpanElement | null>
  footerRoot: any,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(
    () => {
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
    },
    [secondActive],
  )

  const [intersecting, setIntersecting] = useState(false)

  useEffect(
    () => {
      if (footerRef.current === null || footerRoot.current === null) {
        return
      }

      const observer = new IntersectionObserver(
        (entries: IntersectionObserverEntry[]) => {
          entries.forEach(entry => {
            setIntersecting(entry.isIntersecting)
          })
        },
        { rootMargin: '0px 0px -100% 0px', root: footerRoot.current },
      )
      observer.observe(footerRef.current)
    },
    [footerRef, footerRoot],
  )

  return (
    <S.Header>
      <S.Left>
        <S.Logo>
          <Logo fill={ (secondActive && !intersecting) ? 'white' : '#1c1c1c' } />
        </S.Logo>
      </S.Left>
      <S.Right>
        <S.Lang>
          <a href="./">RU</a>
        </S.Lang>
        <S.GetApp ref={ buttonRef }>
          <S.Button type="button" onClick={ show }>Get App</S.Button>
        </S.GetApp>
      </S.Right>
    </S.Header>
  )
}

export default Header
