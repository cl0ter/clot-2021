import { ThemeProvider } from 'styled-components'
import SliderFrame from '../slider-frame/slider-frame'
import { Slide, SlideTheme } from '../types.d'
import * as S from './back-frame.styled'

const theme = {
  color: SlideTheme.LIGHT
}

const BackFrame = ({
  slides,
  away,
}: {
  slides: Slide[]
  away: boolean,
}) => {
  return (
    <S.Container className={ away ? 'away' : undefined }>
      <ThemeProvider theme={ theme }>
        <SliderFrame
          slides={ slides }
        />
      </ThemeProvider>
    </S.Container>
  )
}

export default BackFrame
