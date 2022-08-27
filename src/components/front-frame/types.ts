import { RefObject } from 'react'
import { Slide } from '../../types'

export type FrontFrameProps = {
  slides: Slide[]
  secondActive: boolean
  footerRoot: RefObject<HTMLDivElement>
  nextSlide: number
  setSliderState: any
  swipeThreshold: number
}
