import SliderFrame from '../slider-frame/slider-frame'
import { Slide, SlideTheme } from '../types.d'
import { ThemeProvider } from 'styled-components'
import * as S from './front-frame.styled'
import Footer from '../footer/footer'
import { RefObject, useRef } from 'react'

const theme = {
  color: SlideTheme.DARK
}

const FrontFrame = ({
  slides,
  away,
  footerRef,
  footerRoot,
}: {
  slides: Slide[],
  away: boolean,
  footerRef: RefObject<HTMLSpanElement | null>,
  footerRoot: any,
}) => {
  return (
    <S.Container className={ away ? 'away' : undefined } ref={ footerRoot }>
      <ThemeProvider theme={ theme }>
        <SliderFrame
          slides={ slides }
        />
      </ThemeProvider>
      <Footer footerRef={ footerRef } />
    </S.Container>
  )
}

export default FrontFrame
