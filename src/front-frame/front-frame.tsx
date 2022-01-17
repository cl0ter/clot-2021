import SliderFrame from '../slider-frame/slider-frame'
import { Slide, SlideTheme } from '../types'
import { ThemeProvider } from 'styled-components'
import * as S from './front-frame.styled'
import Footer from '../footer/footer'
import { RefObject } from 'react'

const theme = {
  color: SlideTheme.DARK,
}

const FrontFrame = ({
  slides,
  secondActive,
  footerRef,
  footerRoot,
  nextSlide,
}: {
  slides: Slide[],
  secondActive: boolean,
  footerRef: RefObject<HTMLSpanElement | null>,
  footerRoot: any,
  nextSlide: number,
}) => {
  return (
    <S.Container secondActive={ secondActive } ref={ footerRoot }>
      <ThemeProvider theme={ theme }>
        <SliderFrame
          slides={ slides }
          nextSlide={ nextSlide }
        />
      </ThemeProvider>
      <Footer footerRef={ footerRef } />
    </S.Container>
  )
}

export default FrontFrame
