import Header from '../header/header'
import BackFrame from '../back-frame/back-frame'
import FrontFrame from '../front-frame/front-frame'
import Qr from '../qr/qr'
import * as S from './root.styled'
import { GlobalStyle } from './global.styled'
import { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheetManager } from 'styled-components'
import * as events from './events'
import Loader from '../loader/loader'
import { LangContext, useLang, useQr, useSlides } from './hooks'
import './fonts.css'
import * as videoControls from './video-controls'

const Root = () => {
  // Lang
  const [lang, toggleLang] = useLang()

  // Slides content
  const tempVideoBox = useRef<HTMLDivElement>(null)
  const [slides, texts, loaded] = useSlides(tempVideoBox, lang)

  // QR
  const [qrVisible, show, hide] = useQr()

  // Frames
  const [activeFrame, activateFrame] = useState(0)
  const secondActive = activeFrame === 1
  const FRAMES = 2

  // Slides
  const [nextSlide, setNextSlide] = useState({ back: 0, front: 0 })

  // Logo intersection
  const footerRef = useRef<HTMLSpanElement>(null)
  const footerRoot = useRef<HTMLDivElement>(null)

  // Wheel
  const frontFrameRef = footerRoot

  const wheelTrigger = useCallback(
    (direction) => {
      if (qrVisible) {
        console.log('QR open, ignoring wheel')
        return
      }

      // Scrolling up
      if (direction === -1 && activeFrame !== 0 && frontFrameRef.current?.scrollTop === 0) {
        activateFrame((frame) => frame + direction)
        // Scrolling down
      } else if (direction === 1 && activeFrame !== FRAMES - 1) {
        activateFrame((frame) => frame + direction)
      }
    },
    [activeFrame, frontFrameRef, qrVisible]
  )

  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (events.state.attached) {
      console.warn('Listener attached, skipping update')
      return
    }
    if (!loaded) {
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

  const vc = useRef<any>(null)

  // Video controls
  useEffect(() => {
    if (!loaded) {
      return
    }
    vc.current = videoControls.init(setNextSlide)

    return () => {
      vc.current.destroy()
    }
  }, [loaded])

  // Frame updated
  useEffect(() => {
    if (!loaded) {
      return
    }
    vc.current.updateFrame(activeFrame)
  }, [loaded, activeFrame])

  // Slide updated
  useEffect(() => {
    if (!loaded) {
      return
    }
    vc.current.updateSlide(nextSlide)
  }, [loaded, nextSlide])

  return (
    <StyleSheetManager disableVendorPrefixes={process.env.NODE_ENV === 'development'}>
      <>
        <GlobalStyle />
        <LangContext.Provider value={texts}>
          <S.Root ref={rootRef} data-swipe-threshold={50}>
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
              setNextSlide={setNextSlide}
            />
            <FrontFrame
              slides={slides.front}
              secondActive={secondActive}
              footerRef={footerRef}
              footerRoot={footerRoot}
              nextSlide={nextSlide.front}
              setNextSlide={setNextSlide}
            />
          </S.Root>
        </LangContext.Provider>
      </>
    </StyleSheetManager>
  )
}

export default Root
