import SliderFrame from '../slider-frame/slider-frame'
import { Frame, SlideTheme } from '../../types'
import { ThemeProvider } from 'styled-components'
import * as S from './front-frame.styled'
import Footer from '../footer/footer'
import { FunctionComponent } from 'react'
import { FrontFrameProps } from './types'

const theme = {
  color: SlideTheme.DARK
}

const FrontFrame: FunctionComponent<FrontFrameProps> = ({
  slides,
  secondActive,
  footerRoot,
  nextSlide,
  setSliderState
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
      <Footer />
    </S.Container>
  )
}

export default FrontFrame
