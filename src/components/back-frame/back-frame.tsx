import { ThemeProvider } from 'styled-components'
import SliderFrame from '../slider-frame/slider-frame'
import { Frame, Slide, SlideTheme } from '../../types'
import * as S from './back-frame.styled'
import { FunctionComponent } from 'react'

const theme = {
  color: SlideTheme.LIGHT
}

type Props = {
  slides: Slide[]
  secondActive: boolean
  nextSlide: number
  setSliderState: any
}

const BackFrame: FunctionComponent<Props> = ({
  slides,
  secondActive,
  nextSlide,
  setSliderState
}) => {
  return (
    <S.Container secondActive={secondActive}>
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
