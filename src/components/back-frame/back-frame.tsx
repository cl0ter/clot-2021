import { ThemeProvider } from 'styled-components'
import SliderFrame from '../slider-frame/slider-frame'
import { Slide, SlideTheme } from '../../types'
import * as S from './back-frame.styled'

const theme = {
  color: SlideTheme.LIGHT
}

const BackFrame = ({
  slides,
  secondActive,
  nextSlide,
  setSliderState
}: {
  slides: Slide[]
  secondActive: boolean
  nextSlide: number
  setSliderState: any
}) => {
  return (
    <S.Container secondActive={secondActive}>
      <ThemeProvider theme={theme}>
        <SliderFrame
          slides={slides}
          frameId="back"
          nextSlide={nextSlide}
          setSliderState={setSliderState}
        />
      </ThemeProvider>
    </S.Container>
  )
}

export default BackFrame
