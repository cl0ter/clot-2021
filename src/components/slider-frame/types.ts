import { Frame, Slide } from '../../types'

export type ProgressProps = {
  slides: Slide[]
  frameId: string
  setSliderState: any
}

export type SliderFrameProps = {
  slides: Slide[]
  frameId: Frame
  nextSlide: number
  setSliderState: any
}
