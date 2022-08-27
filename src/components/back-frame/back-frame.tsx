import { ThemeProvider } from 'styled-components'
import SliderFrame from '../slider-frame/slider-frame'
import { Frame, SlideTheme } from '../../types'
import * as S from './back-frame.styled'
import { FunctionComponent } from 'react'
import { BackFrameProps } from './types'

const theme = {
  color: SlideTheme.LIGHT
}

const BackFrame: FunctionComponent<BackFrameProps> = ({
  slides,
  secondActive,
  nextSlide,
  setSliderState,
  swipeThreshold,
  elRef
}) => {
  return (
    <S.Container secondActive={secondActive} data-swipe-threshold={swipeThreshold} ref={elRef}>
      <ThemeProvider theme={theme}>
        <SliderFrame
          slides={slides}
          frameId={Frame.BACK}
          nextSlide={nextSlide}
          setSliderState={setSliderState}
        />
      </ThemeProvider>
    </S.Container>
  )
}

export default BackFrame
