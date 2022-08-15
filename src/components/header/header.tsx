import {
  FunctionComponent,
  SyntheticEvent,
  useCallback,
  useContext,
  useEffect,
  useRef
} from 'react'
import { LangContext } from '../../hooks'
import * as S from './header.styled'
import Logo from './logo'
import { HeaderProps } from './types'

const Header: FunctionComponent<HeaderProps> = ({ show, secondActive, toggleLang }) => {
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
  }, [secondActive])

  const handleToggleLang = useCallback(
    (evt: SyntheticEvent<HTMLSpanElement>) => {
      evt.preventDefault()
      toggleLang()
    },
    [toggleLang]
  )

  return (
    <S.Header>
      <S.Container>
        <S.Left>
          <S.Logo href="/">
            <Logo fill={secondActive ? 'white' : '#1c1c1c'} />
          </S.Logo>
        </S.Left>
        <S.Right>
          <S.Lang>
            <span onClick={handleToggleLang}>{texts.headerSwitchLang}</span>
          </S.Lang>
          <S.GetApp ref={buttonRef} secondActive={secondActive}>
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
