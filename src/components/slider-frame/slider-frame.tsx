import * as S from './slider-frame.styled'
import StoreLink from '../store-link/store-link'
import { FunctionComponent, useCallback, useEffect, useRef, useState } from 'react'
import Progress from './progress'
import { StoreLinkType, SlideTheme, Frame } from '../../types'
import { useTheme } from 'styled-components'
import { mobile } from '../../helpers'
import { SliderFrameProps } from './types'

// Limit resizing calls to 1
let textResized = false
let videoResized = false

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
    textResized = true
  } else if (textResized) {
    container.style.height = ''
    textResized = false
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
    videoResized = true
  } else if (videoResized) {
    nodes.forEach((node) => (node.style.maxHeight = ''))
    videoResized = false
  }
}

const SliderFrame: FunctionComponent<SliderFrameProps> = ({
  slides,
  frameId,
  nextSlide,
  setSliderState
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
                  muted
                  playsInline
                  preload="auto"
                  // autoPlay
                >
                  <source src={video} type="video/mp4" />
                </video>
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
