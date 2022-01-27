import Header from '../header/header'
import BackFrame from '../back-frame/back-frame'
import FrontFrame from '../front-frame/front-frame'
import Qr from '../qr/qr'
import * as S from './root.styled'
import { GlobalStyle } from './global.styled'
import { createContext, useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheetManager } from 'styled-components'
import * as events from './events'
import Loader from '../loader/loader'
import { useSlides } from './hooks'
import { Lang, Texts } from '../types'
import texts from '../../public/texts.json'

type TTT = {
  en: Partial<typeof texts['en']>
  // ru: Partial<typeof texts['ru']>,
}

const LangContext = createContext<TTT['en']>({})

const Root = () => {
  // Lang
  const [lang, setLang] = useState<Lang>(() => {
    return new URLSearchParams(window.location.search).get('lang') === 'ru'
      ? Lang.RU
      : Lang.EN
  })
  const toggleLang = useCallback(() => {
    setLang((lang) => (lang === Lang.EN ? Lang.RU : Lang.EN))
  }, [setLang])

  // Slides content
  const tempVideoBox = useRef<HTMLDivElement>(null)
  const [slides, texts, loaded] = useSlides(tempVideoBox, lang)
  useEffect(() => {
    if (!loaded) {
      return
    }
    setNextSlide((nextSlide) => ({
      ...nextSlide,
      back: 1
    }))
  }, [loaded])

  // QR
  const [qrVisible, setQrVisible] = useState(false)
  const hide = useCallback(() => setQrVisible(false), [])
  const show = useCallback(() => setQrVisible(true), [])

  // Frames
  const [activeFrame, activateFrame] = useState(0)
  const secondActive = activeFrame === 1
  const FRAMES = 2

  // Slides
  const [nextSlide, setNextSlide] = useState({ back: 0, front: 0 })

  const footerRef = useRef<HTMLSpanElement>(null)
  const footerRoot = useRef<HTMLDivElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const frontFrameRef = footerRoot

  const wheelTrigger = useCallback(
    (direction) => {
      if (qrVisible) {
        console.log('QR open, ignoring wheel')
        return
      }

      // Scrolling up
      if (
        direction === -1 &&
        activeFrame !== 0 &&
        frontFrameRef.current?.scrollTop === 0
      ) {
        activateFrame((frame) => frame + direction)
        setNextSlide({ front: -1, back: 1 })
        // Scrolling down
      } else if (direction === 1 && activeFrame !== FRAMES - 1) {
        activateFrame((frame) => frame + direction)
        setNextSlide({ front: 1, back: -1 })
      }
    },
    [activeFrame, frontFrameRef, qrVisible]
  )

  useEffect(() => {
    if (events.state.attached) {
      console.log('Listener attached, skipping update')
      return
    }
    if (!loaded) {
      console.log('Not loaded yet, skipping init')
      return
    }

    const el = rootRef.current
    if (el !== null) {
      events.add(el, wheelTrigger)
    }

    return () => {
      if (el !== null) {
        events.remove(el)
      }
    }
  }, [wheelTrigger, loaded])

  return (
    <StyleSheetManager
      disableVendorPrefixes={process.env.NODE_ENV === 'development'}
    >
      <LangContext.Provider value={texts}>
        <S.Root ref={rootRef} data-swipe-threshold={50}>
          <GlobalStyle />
          <S.TempVideoBox ref={tempVideoBox} />
          <Loader loaded={loaded} />
          <Qr visible={qrVisible} hide={hide} />
          <Header
            show={show}
            toggleLang={toggleLang}
            secondActive={secondActive}
            footerRef={footerRef}
            footerRoot={footerRoot}
          />
          <BackFrame
            slides={slides.back}
            secondActive={secondActive}
            nextSlide={nextSlide.back}
          />
          <FrontFrame
            slides={slides.front}
            secondActive={secondActive}
            footerRef={footerRef}
            footerRoot={footerRoot}
            nextSlide={nextSlide.front}
          />
        </S.Root>
      </LangContext.Provider>
    </StyleSheetManager>
  )
}

export default Root
export { LangContext }
