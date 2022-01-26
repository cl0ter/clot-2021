import * as S from './slider-frame.styled'
import StoreLink from '../store-link/store-link'
import { useCallback, useRef, useState } from 'react'
import Progress from './progress'
import { Slide, StoreLinkType, SlideTheme } from '../types'
import { useTheme } from 'styled-components'

const SliderFrame = ({
  slides,
  nextSlide
}: {
  slides: Slide[]
  nextSlide: number
}) => {
  const [slide, setSlide] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const handleClick = useCallback(() => {
    setSlide((slide) => (slide + 1) % slides.length)
  }, [slides])

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
        <S.VideoContainer onClick={handleClick}>
          {slides.map(({ video }, idx) => (
            <S.VideoBaseline key={idx}>
              <S.Video active={slide === idx}>
                <video
                  // ref={videoRef}
                  src={video}
                  muted
                  playsInline
                  preload="metadata"
                />
              </S.Video>
            </S.VideoBaseline>
          ))}
        </S.VideoContainer>
        <Progress
          slides={slides}
          videoRef={videoRef}
          slide={slide}
          setSlide={setSlide}
          nextSlide={nextSlide}
        />
      </S.Container>
    </S.Frame>
  )
}

export default SliderFrame
