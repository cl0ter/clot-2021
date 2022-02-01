import * as S from './slider-frame.styled'
import StoreLink from '../store-link/store-link'
import { useCallback, useEffect, useState } from 'react'
import Progress from './progress'
import { Slide, StoreLinkType, SlideTheme } from '../../types'
import { useTheme } from 'styled-components'

const SliderFrame = ({
  slides,
  frameId,
  nextSlide,
  setSliderState
}: {
  slides: Slide[]
  frameId: string
  nextSlide: number
  setSliderState: any
}) => {
  const [slide, setSlide] = useState(0)
  const handleVideoClick = useCallback(() => {
    setSliderState((state: any) => ({
      ...state,
      [frameId]: (slide + 1) % slides.length
    }))
  }, [slides, frameId, setSliderState, slide])

  useEffect(() => {
    setSlide(nextSlide)
  }, [nextSlide])

  const theme = useTheme() as { color: SlideTheme }

  return (
    <S.Frame>
      <S.Container>
        <S.TextContainer>
          {slides.map(({ description, title }, idx) => (
            <S.TextBaseline key={idx}>
              <S.Text active={slide === idx}>
                <h1>{title}</h1>
                <h2>{description}</h2>
                <StoreLink
                  type={
                    theme.color === SlideTheme.LIGHT
                      ? StoreLinkType.APP_STORE
                      : StoreLinkType.APPLE_TV
                  }
                />
              </S.Text>
            </S.TextBaseline>
          ))}
        </S.TextContainer>
        <S.VideoContainer onClick={handleVideoClick}>
          {slides.map(({ video }, idx) => (
            <S.VideoBaseline key={idx}>
              <S.Video active={slide === idx}>
                <video
                  className={`${frameId}-video`}
                  src={video}
                  muted
                  playsInline
                  preload="auto"
                />
              </S.Video>
            </S.VideoBaseline>
          ))}
        </S.VideoContainer>
        <Progress slides={slides} frameId={frameId} />
      </S.Container>
    </S.Frame>
  )
}

export default SliderFrame
