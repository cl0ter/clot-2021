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
}: {
  slides: Slide[]
  secondActive: boolean,
}) => {
  return (
    <S.Container secondActive={ secondActive }>
      <ThemeProvider theme={ theme }>
        <SliderFrame
          slides={ slides }
        />
      </ThemeProvider>
    </S.Container>
  )
}

export default BackFrame
