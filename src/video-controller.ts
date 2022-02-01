import { Frame, GlobalSliderState } from './types'

const init = (setSliderState: any) => {
  const videos = {
    front: document.querySelectorAll<HTMLVideoElement>(`.front-video`),
    back: document.querySelectorAll<HTMLVideoElement>(`.back-video`)
  }
  const parts = {
    front: document.querySelectorAll<HTMLSpanElement>(`.front-part`),
    back: document.querySelectorAll<HTMLSpanElement>(`.back-part`)
  }

  let lastFrame: Frame | null = null
  let lastSliderState: GlobalSliderState | null = null

  const attachedEvents: {
    timeupdate: (() => void) | null
    ended: (() => void) | null
    video: HTMLVideoElement | null
  } = {
    timeupdate: null,
    ended: null,
    video: null
  }

  const removeEvents = (video: HTMLVideoElement) => {
    if (
      attachedEvents.video === null ||
      attachedEvents.timeupdate === null ||
      attachedEvents.ended === null
    ) {
      throw new Error("Events weren't added yet")
    }

    attachedEvents.video.removeEventListener('timeupdate', attachedEvents.timeupdate)
    attachedEvents.video.removeEventListener('ended', attachedEvents.ended)
  }

  const addEvents = (
    video: HTMLVideoElement,
    events: {
      timeupdate: () => void
      ended: () => void
    }
  ) => {
    attachedEvents.timeupdate = events.timeupdate
    attachedEvents.ended = events.ended
    attachedEvents.video = video
    video.addEventListener('timeupdate', events.timeupdate)
    video.addEventListener('ended', events.ended)
  }

  const playVideo = (activeFrame: Frame, sliderState: GlobalSliderState) => {
    const idx = sliderState[activeFrame]
    const video = videos[activeFrame][idx]

    const handleEnded = () => {
      const nextIdxAfterThis = (idx + 1) % videos[activeFrame].length
      setSliderState((state: GlobalSliderState) => ({
        ...state,
        [activeFrame]: nextIdxAfterThis
      }))
    }
    const handleTimeUpdate = () => {
      parts[activeFrame][idx].style.width = `${(video.currentTime / video.duration) * 100}%`
    }

    addEvents(video, { ended: handleEnded, timeupdate: handleTimeUpdate })

    video.play()
  }

  const stopVideo = (lastFrame: Frame, lastSliderState: GlobalSliderState) => {
    const idx = lastSliderState[lastFrame]
    const lastVideo = videos[lastFrame][idx]

    lastVideo.pause()
    lastVideo.currentTime = 0

    removeEvents(lastVideo)
  }

  const updateSlide = (activeFrame: Frame, sliderState: GlobalSliderState) => {
    if (lastSliderState === null || lastFrame === null) {
      console.log('first fire, stored last valuesss', sliderState)

      playVideo(activeFrame, sliderState)

      lastSliderState = sliderState
      lastFrame = activeFrame
    } else if (sliderState !== lastSliderState) {
      if (lastFrame === activeFrame && lastSliderState[lastFrame] === sliderState[activeFrame]) {
        // Ignore, don't update last values
        console.log('frames and slides match, prob first iteration?')
      } else {
        console.log(
          'Stopping and reseting last frame/slide: %o/%o. Playing next frame/slide: %o/%o',
          lastFrame,
          lastSliderState[lastFrame],
          activeFrame,
          sliderState[activeFrame]
        )

        stopVideo(lastFrame, lastSliderState)
        playVideo(activeFrame, sliderState)

        // Set last part
        if (lastSliderState[lastFrame] < parts[lastFrame].length - 1) {
          parts[lastFrame][lastSliderState[lastFrame]].style.width = '100%'
        }

        // Set all parts
        if (sliderState[activeFrame] === 0) {
          parts[activeFrame].forEach((part) => {
            part.style.width = '0%'
          })
        }
      }
      lastSliderState = sliderState
      lastFrame = activeFrame
    }

    // Irrelevant duplicate calls, ignore
  }

  const destroy = () => {
    if (lastFrame === null || lastSliderState === null) {
      // Nothing to remove, safe to return
      return
    }
    stopVideo(lastFrame, lastSliderState)
    lastFrame = null
    lastSliderState = null
    attachedEvents.ended = null
    attachedEvents.timeupdate = null
    attachedEvents.video = null
  }

  return { updateSlide, destroy }
}

export { init }
