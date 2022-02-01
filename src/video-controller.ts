import { Frame, GlobalSliderState } from './types'

const pauseEvents = ['abort', 'error', 'pause', 'seeking', '__stalled', '__suspend', 'waiting']
const resumeEvents = ['playing', '__seeked']

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

  type EventsData = {
    handleEnd: (evt: Event) => void
    handlePause: (evt: Event) => void
    handleResume: (evt: Event) => void
    video: HTMLVideoElement
  }

  const attachedEvents: {
    handleEnd: ((evt: Event) => void) | null
    handlePause: ((evt: Event) => void) | null
    handleResume: ((evt: Event) => void) | null
    video: HTMLVideoElement | null
  } = {
    handleEnd: null,
    handlePause: null,
    handleResume: null,
    video: null
  }

  // Asserts type and values
  const assertEventsAdded = (evts: typeof attachedEvents) => {
    if (
      evts.video === null ||
      evts.handleEnd === null ||
      evts.handlePause === null ||
      evts.handleResume === null
    ) {
      throw new Error("Events weren't added")
    }
  }

  // Doesn't assert type, values only
  const assertEventsRemoved = (evts: typeof attachedEvents) => {
    if (
      evts.video !== null ||
      evts.handleEnd !== null ||
      evts.handlePause !== null ||
      evts.handleResume !== null
    ) {
      throw new Error("Events weren't properly removed")
    }
  }

  const removeEvents = () => {
    assertEventsAdded(attachedEvents)

    for (const ev of pauseEvents) {
      attachedEvents.video!.removeEventListener(ev, attachedEvents.handlePause!)
    }
    for (const ev of resumeEvents) {
      attachedEvents.video!.removeEventListener(ev, attachedEvents.handleResume!)
    }
    attachedEvents.video!.removeEventListener('ended', attachedEvents.handleEnd!)

    attachedEvents.handleEnd = null
    attachedEvents.handlePause = null
    attachedEvents.handleResume = null
    attachedEvents.video = null
  }

  const addEvents = (evts: EventsData) => {
    assertEventsRemoved(attachedEvents)

    for (const ev of pauseEvents) {
      evts.video.addEventListener(ev, evts.handlePause)
    }
    for (const ev of resumeEvents) {
      evts.video.addEventListener(ev, evts.handleResume)
    }
    evts.video.addEventListener('ended', evts.handleEnd)

    attachedEvents.handleEnd = evts.handleEnd
    attachedEvents.handlePause = evts.handlePause
    attachedEvents.handleResume = evts.handleResume
    attachedEvents.video = evts.video
  }

  const playVideo = async (activeFrame: Frame, sliderState: GlobalSliderState) => {
    const idx = sliderState[activeFrame]
    const video = videos[activeFrame][idx]
    const part = parts[activeFrame][idx]

    const handleEnd = () => {
      const nextIdxAfterThis = (idx + 1) % videos[activeFrame].length
      setSliderState((state: GlobalSliderState) => ({
        ...state,
        [activeFrame]: nextIdxAfterThis
      }))
    }
    const handlePause = (ev: Event) => {
      part.style.animationPlayState = 'paused'
    }
    const handleResume = (ev: Event) => {
      part.style.animationPlayState = 'running'
    }

    addEvents({ video, handleEnd, handlePause, handleResume })

    await video.play()

    // -- Parts handling
    if (sliderState[activeFrame] === 0) {
      parts[activeFrame].forEach((part) => {
        part.style.width = '0%'
      })
    }

    const duration = (() => {
      if (Number.isNaN(video.duration)) {
        console.warn('Failed to get duration for %o', video)
        return 10
      }
      return video.duration
    })()

    part.style.animationDuration = `${duration}s`
    part.style.animationName = ''
  }

  const stopVideo = (lastFrame: Frame, lastSliderState: GlobalSliderState) => {
    const idx = lastSliderState[lastFrame]
    const lastVideo = videos[lastFrame][idx]

    lastVideo.pause()
    lastVideo.currentTime = 0

    removeEvents()

    // -- Parts handling
    const lastPart = parts[lastFrame][idx]
    if (idx < parts[lastFrame].length - 1) {
      lastPart.style.width = '100%'
    }
    lastPart.style.animationName = '__paused'
    lastPart.style.animationPlayState = 'paused'
  }

  const updateSlide = (activeFrame: Frame, sliderState: GlobalSliderState) => {
    if (lastSliderState === null || lastFrame === null) {
      // First call, store values and play vid
      playVideo(activeFrame, sliderState)

      lastSliderState = sliderState
      lastFrame = activeFrame
    } else if (sliderState !== lastSliderState) {
      if (lastFrame === activeFrame && lastSliderState[lastFrame] === sliderState[activeFrame]) {
        // Frames and slides match, prob first iteration
        // Ignore, but update last values afterwards
      } else {
        // console.log(
        //   'Pausing and reseting last frame/slide: %o/%o. Playing next frame/slide: %o/%o',
        //   lastFrame,
        //   lastSliderState[lastFrame],
        //   activeFrame,
        //   sliderState[activeFrame]
        // )

        stopVideo(lastFrame, lastSliderState)
        playVideo(activeFrame, sliderState)
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
    attachedEvents.handleEnd = null
    attachedEvents.handlePause = null
    attachedEvents.handleResume = null
    attachedEvents.video = null
  }

  return { updateSlide, destroy }
}

export { init }
