import { RefObject } from 'react'
import { LinkList } from '../../types'

export type FooterProps = {
  footerRef: RefObject<HTMLSpanElement>
}

export type LinksProps = {
  list: LinkList[]
}
