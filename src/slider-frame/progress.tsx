import { useEffect, useMemo, useRef, useState } from 'react'
import * as S from './progress.styled'
import { Slide } from '../types.d'

const Progress = ({
  slides,
  videoRef,
  slide,
  setSlide,
}: {
  slides: Slide[],
  videoRef: React.RefObject<HTMLVideoElement>,
  slide: number,
  setSlide: (cb: (currentSlide: number) => number) => void
}) => {
  const [progress, setProgress] = useState(0)

  const latest = useRef<number>(0)
  const timeChange = useRef<number>(0)

  useEffect(
    () => {
      if (videoRef.current === null) {
        return
      }

      const updateProgress = (ev: Event): void => {
        if (videoRef.current === null) {
          setProgress(0)
          return
        }
        timeChange.current = videoRef.current.currentTime - latest.current
        latest.current = videoRef.current.currentTime
        setProgress(videoRef.current.currentTime / videoRef.current.duration)
      }

      const triggerNextSlide = () => {
        timeChange.current = 0
        latest.current = 0
        setProgress(0)
        setSlide(slide => slide + 1)
      }

      const canPlayThrough = () => {
        video.play()
      }

      const video = videoRef.current

      video.addEventListener('timeupdate', updateProgress)
      video.addEventListener('ended', triggerNextSlide)
      video.addEventListener('canplaythrough', canPlayThrough)
    },
    [videoRef, slide, setSlide],
  )
  const styles = useMemo(
    () => {
      return slides.map((_s, idx) => {
        let width = 0
        let duration = 0

        if (idx < slide) {
          width = 1
          duration = 0
        } else if (idx > slide) {
          width = 0
          duration = 0
        } else {
          width = progress
          duration = timeChange.current
        }

        return {
          width: `${width * 100}%`,
          transitionDuration: `${duration.toFixed(2)}s`,
        }
      })
    },
    [slide, slides, progress]
  )

  if (!videoRef.current) {
    return null
  }

  return (
    <S.Progress>
      <S.Bar>
        { slides.map((_slide, idx) => {
          return (
            <S.Part key={ idx }>
              <span style={ styles[idx] } />
            </S.Part>
          )
        }) }
      </S.Bar>
    </S.Progress>
  )
}

export default Progress
