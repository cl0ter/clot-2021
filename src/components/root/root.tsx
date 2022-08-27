import Header from '../header/header'
import BackFrame from '../back-frame/back-frame'
import FrontFrame from '../front-frame/front-frame'
import Qr from '../qr/qr'
import * as S from './root.styled'
import { GlobalStyle } from './global.styled'
import { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheetManager } from 'styled-components'
import * as events from '../../events'
import Loader from '../loader/loader'
import { LangContext, useLang, useQr, useSlides } from '../../hooks'
import './fonts.css'
import * as videoController from '../../video-controller'
import { Frame, GlobalSliderState } from '../../types'

const Root = () => {
  // Lang
  const [lang, toggleLang] = useLang()

  // Slides content
  const [slides, texts, loaded] = useSlides(lang)

  // QR
  const [qrVisible, show, hide] = useQr()

  // Frames
  const [activeFrame, activateFrame] = useState<Frame>(Frame.BACK)
  const secondActive = activeFrame === Frame.FRONT

  // Slides
  const [sliderState, setSliderState] = useState<GlobalSliderState>({
    [Frame.BACK]: 0,
    [Frame.FRONT]: 0
  })

  const footerRoot = useRef<HTMLDivElement>(null)

  // Wheel
  const frontFrameRef = footerRoot

  const wheelTrigger = useCallback(
    (direction) => {
      if (qrVisible) {
        // QR open, ignoring wheel
        return
      }

      // Scrolling up
      if (
        direction === -1 &&
        activeFrame !== Frame.BACK &&
        frontFrameRef.current?.scrollTop === 0
      ) {
        activateFrame(Frame.BACK)
        // Scrolling down
      } else if (direction === 1 && activeFrame !== Frame.FRONT) {
        activateFrame(Frame.FRONT)
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

  const vc = useRef<ReturnType<typeof videoController.init>>()

  // Video controller
  useEffect(() => {
    if (!loaded) {
      return
    }
    vc.current = videoController.init(setSliderState)

    return () => {
      if (vc.current) {
        vc.current.destroy()
      }
    }
  }, [loaded])

  // Reset to 0 slide on frame change
  useEffect(() => {
    if (!loaded) {
      return
    }
    setSliderState((state) => ({
      ...state,
      [activeFrame]: 0
    }))
  }, [loaded, activeFrame])

  // Send frame/slider updates to controller
  useEffect(() => {
    if (!loaded) {
      return
    }
    if (vc.current) {
      vc.current.updateSlide(activeFrame, sliderState)
    }
  }, [loaded, activeFrame, sliderState])

  return (
    <StyleSheetManager disableVendorPrefixes={process.env.NODE_ENV === 'development'}>
      <>
        <GlobalStyle />
        <LangContext.Provider value={texts}>
          <S.Root ref={rootRef} data-swipe-threshold={50}>
            <Loader loaded={loaded} />
            <Qr visible={qrVisible} hide={hide} />
            <Header show={show} toggleLang={toggleLang} secondActive={secondActive} />
            <BackFrame
              slides={slides.back}
              secondActive={secondActive}
              nextSlide={sliderState.back}
              setSliderState={setSliderState}
            />
            <FrontFrame
              slides={slides.front}
              secondActive={secondActive}
              footerRoot={footerRoot}
              nextSlide={sliderState.front}
              setSliderState={setSliderState}
            >
              <Header show={show} toggleLang={toggleLang} secondActive={secondActive} duplicate />
            </FrontFrame>
          </S.Root>
        </LangContext.Provider>
      </>
    </StyleSheetManager>
  )
}

export default Root
