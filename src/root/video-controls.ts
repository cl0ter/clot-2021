import { Video } from '../slider-frame/slider-frame.styled'

const init = (setNextSlide: any) => {
  const addEventsForFrame = (frame: string) => {
    const videos = document.querySelectorAll<HTMLVideoElement>(`.${frame}-video`)
    const parts = document.querySelectorAll<HTMLSpanElement>(`.${frame}-part`)

    const setParts = (finishedIdx: number, nextIdx: number) => {
      parts.forEach((part) => {
        if (nextIdx === 0) {
          part.style.width = '0%'
        }
      })
    }

    videos.forEach((video, idx) => {
      video.addEventListener('ended', () => {
        const nextIdx = (idx + 1) % videos.length

        setNextSlide((state: any) => ({
          ...state,
          [frame]: nextIdx
        }))

        // setParts(idx, nextIdx)
        // video.pause()

        // const nextVideo = videos[nextIdx]
        // nextVideo.currentTime = 0
        // nextVideo.play()
      })
      video.addEventListener('timeupdate', () => {
        parts[idx].style.width = `${(video.currentTime / video.duration) * 100}%`
      })
    })
  }

  addEventsForFrame('back')
  addEventsForFrame('front')
  console.log('events added')

  const updateFrame = (nextFrame: number) => {
    console.log('updated frame %o', { nextFrame })
    // const frameChanged = nextFrame !== lastFrame
    // const names = {
    //   0: 'back',
    //   1: 'front'
    // }
    // const frameName = names[nextFrame as keyof typeof names]
    // if (frameChanged) {
    //   const videos = document.querySelectorAll<HTMLVideoElement>(`.${frameName}-video`)
    //   videos[0].play()
    //   lastFrame = nextFrame
    // }
    // const slideChanged = false
    // if (slideChanged) {
    //   setParts(idx, nextIdx)
    //   video.pause()
    //   const nextVideo = videos[nextIdx]
    //   nextVideo.currentTime = 0
    //   nextVideo.play()
    // }
  }

  const updateSlide = (nextSlide: any) => {
    console.log('uopdated slides %o', { nextSlide })
  }

  const destroy = () => {
    console.log('removing events')
  }

  return { updateFrame, updateSlide, destroy }
}

export { init }
