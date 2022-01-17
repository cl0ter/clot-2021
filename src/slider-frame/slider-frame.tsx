import * as S from './slider-frame.styled'
import StoreLink from '../store-link/store-link'
import { useCallback, useRef, useState } from 'react'
import Progress from './progress'
import { Slide, StoreLinkType } from '../types'
import { useTheme } from 'styled-components'
import { SlideTheme } from '../types'

const SliderFrame = ({
  slides,
}: {
  slides: Slide[]
}) => {
  const [slide, setSlide] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const currentSlideIdx = slides.length > 1 ? slide % slides.length : 0
  const currentSlide = slides[currentSlideIdx]
  const handleClick = useCallback(
    () => {
      setSlide(slide => slide + 1)
    },
    [],
  )

  const theme = useTheme() as { color: SlideTheme }

  return (
    <S.Frame>
      <S.TextContainer>
        <S.Text>
          <h1>{ currentSlide.title }</h1>
          <h2>{ currentSlide.description }</h2>
          <StoreLink type={ theme.color === SlideTheme.LIGHT ? StoreLinkType.APP_STORE : StoreLinkType.APPLE_TV }/>
        </S.Text>
      </S.TextContainer>
      <S.VideoContainer onClick={ handleClick }>
        <S.Video>
          <video key={ currentSlideIdx } ref={ videoRef } src={ currentSlide.video } muted />
        </S.Video>
      </S.VideoContainer>
      <Progress slides={ slides } videoRef={ videoRef } slide={ currentSlideIdx } setSlide={ setSlide } />
    </S.Frame>
  )
}

export default SliderFrame
