import { ThemeProvider } from 'styled-components'
import SliderFrame from '../slider-frame/slider-frame'
import { Slide, SlideTheme } from '../types'
import * as S from './back-frame.styled'

const theme = {
  color: SlideTheme.LIGHT,
}

const BackFrame = ({
  slides,
  secondActive,
  nextSlide,
}: {
  slides: Slide[]
  secondActive: boolean,
  nextSlide: number,
}) => {
  return (
    <S.Container secondActive={ secondActive }>
      <ThemeProvider theme={ theme }>
        <SliderFrame
          slides={ slides }
          nextSlide={ nextSlide }
        />
      </ThemeProvider>
    </S.Container>
  )
}

export default BackFrame
