import { RefObject } from 'react'

export type HeaderProps = {
  show: () => void
  secondActive: boolean
  footerRef: RefObject<HTMLSpanElement>
  footerRoot: RefObject<HTMLDivElement>
  toggleLang: () => void
}

export type LogoProps = { fill: string }
