import * as S from './slider-frame.styled'
import StoreLink from '../store-link/store-link'
import { useCallback, useEffect, useRef, useState } from 'react'
import Progress from './progress'
import { Slide, StoreLinkType, SlideTheme, Frame } from '../../types'
import { useTheme } from 'styled-components'
import { mobile } from '../../helpers'

const resizeText = (container: HTMLDivElement | null, idx: number) => {
  if (!container) {
    console.warn('Not mounted?')
    return
  }

  const nodes = Array.from(container.querySelectorAll('[data-text]'))
  if (!nodes[idx]) {
    // Containers missing, prob first render
    return
  }

  if (mobile()) {
    container.style.height = nodes[idx].clientHeight + 'px'
  } else {
    container.style.height = ''
  }
}

const resizeVideo = (container: HTMLDivElement | null) => {
  if (!container) {
    console.warn('Not mounted?')
    return
  }

  const nodes = Array.from(container.querySelectorAll('video'))
  if (mobile()) {
    nodes.forEach((node) => (node.style.maxHeight = container.clientHeight + 'px'))
  }
}

const SliderFrame = ({
  slides,
  frameId,
  nextSlide,
  setSliderState
}: {
  slides: Slide[]
  frameId: Frame
  nextSlide: number
  setSliderState: any
}) => {
  const [slide, setSlide] = useState(0)
  const handleSlideClick = useCallback(() => {
    setSliderState((state: any) => ({
      ...state,
      [frameId]: (slide + 1) % slides.length
    }))
  }, [slides, frameId, setSliderState, slide])

  useEffect(() => {
    setSlide(nextSlide)

    resizeText(textContainerRef.current, nextSlide)
    if (frameId === Frame.FRONT) {
      resizeVideo(videoContainerRef.current)
    }
  }, [nextSlide, frameId])

  const theme = useTheme() as { color: SlideTheme }
  const textContainerRef = useRef<HTMLDivElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)

  return (
    <S.Frame>
      <S.Container>
        <S.TextContainer ref={textContainerRef} onClick={handleSlideClick}>
          {slides.map(({ description, title }, idx) => (
            <S.TextBaseline key={idx}>
              <S.Text active={slide === idx} data-text="">
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
        <S.VideoContainer
          onClick={handleSlideClick}
          horizontal={frameId === Frame.FRONT}
          vertical={frameId === Frame.BACK}
          ref={videoContainerRef}
        >
          {slides.map(({ video }, idx) => (
            <S.VideoBaseline key={idx}>
              <S.Video
                active={slide === idx}
                horizontal={frameId === Frame.FRONT}
                vertical={frameId === Frame.BACK}
                data-video=""
              >
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
        <Progress slides={slides} frameId={frameId} setSliderState={setSliderState} />
      </S.Container>
    </S.Frame>
  )
}

export default SliderFrame
