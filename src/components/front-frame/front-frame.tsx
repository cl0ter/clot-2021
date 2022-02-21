import SliderFrame from '../slider-frame/slider-frame'
import { Frame, Slide, SlideTheme } from '../../types'
import { ThemeProvider } from 'styled-components'
import * as S from './front-frame.styled'
import Footer from '../footer/footer'
import { RefObject } from 'react'

const theme = {
  color: SlideTheme.DARK
}

const FrontFrame = ({
  slides,
  secondActive,
  footerRef,
  footerRoot,
  nextSlide,
  setSliderState
}: {
  slides: Slide[]
  secondActive: boolean
  footerRef: RefObject<HTMLSpanElement>
  footerRoot: RefObject<HTMLDivElement>
  nextSlide: number
  setSliderState: any
}) => {
  return (
    <S.Container secondActive={secondActive} ref={footerRoot}>
      <ThemeProvider theme={theme}>
        <SliderFrame
          slides={slides}
          frameId={Frame.FRONT}
          nextSlide={nextSlide}
          setSliderState={setSliderState}
        />
      </ThemeProvider>
      <Footer footerRef={footerRef} />
    </S.Container>
  )
}

export default FrontFrame
