import SliderFrame from '../slider-frame/slider-frame'
import { Slide, SlideTheme } from '../types'
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
  setNextSlide
}: {
  slides: Slide[]
  secondActive: boolean
  footerRef: RefObject<HTMLSpanElement>
  footerRoot: RefObject<HTMLDivElement>
  nextSlide: number
  setNextSlide: any
}) => {
  return (
    <S.Container secondActive={secondActive} ref={footerRoot}>
      <ThemeProvider theme={theme}>
        <SliderFrame
          slides={slides}
          frameId="front"
          nextSlide={nextSlide}
          setNextSlide={setNextSlide}
        />
      </ThemeProvider>
      <Footer footerRef={footerRef} />
    </S.Container>
  )
}

export default FrontFrame
