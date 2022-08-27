import { RefObject } from 'react'
import { Slide } from '../../types'

export type BackFrameProps = {
  slides: Slide[]
  secondActive: boolean
  nextSlide: number
  setSliderState: any
  swipeThreshold: number
  elRef: RefObject<HTMLDivElement>
}
