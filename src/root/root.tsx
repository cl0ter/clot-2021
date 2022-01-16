import Header from '../header/header'
import BackFrame from '../back-frame/back-frame'
import FrontFrame from '../front-frame/front-frame'
import Qr from '../qr/qr'
import * as S from './root.styled'
import { useCallback, useRef, useState } from 'react'
import { Slide } from '../types'
import appVid1 from './app-1.mp4'
import appVid2 from './app-2.mp4'
import tvVid1 from './tv-1.mp4'
import tvVid2 from './tv-2.mp4'
import { StyleSheetManager } from 'styled-components'

const Root = ({
  away
}: {
  away: boolean,
}) => {
  const [visible, setVisible] = useState(false)
  const hide = useCallback(() => setVisible(false), [])
  const show = useCallback(() => setVisible(true), [])
  const [activeFrame, activateFrame] = useState(0)

  const backSlides: Slide[] = [
    {
      title: 'The best Wallet for NFTs',
      description: 'for iOS and Android',
      video: appVid1,
    },
    {
      title: 'All wallets in one place',
      description: 'some description',
      video: appVid2,
    },
  ]

  const frontSlides: Slide[] = [
    {
      title: 'First NFT App for TV',
      description: 'for Apple TV, Androind TV and Tizen',
      video: tvVid1,
    },
    {
      title: 'All wallets in one place',
      description: 'some description',
      video: tvVid2,
    },
  ]

  const footerRef = useRef<HTMLSpanElement | null>(null)
  const footerRoot = useRef<HTMLDivElement | null>(null)

  return (
    <StyleSheetManager disableVendorPrefixes={ process.env.NODE_ENV === 'development' }>
      <S.Root>
        <S.Global />

        <Qr visible={ visible } hide={ hide } />
        <Header show={ show } away={ away } footerRef={ footerRef } footerRoot={ footerRoot }/>
        <BackFrame slides={ backSlides } away={ away } />
        <FrontFrame slides={ frontSlides } away={ away } footerRef={ footerRef } footerRoot={ footerRoot } />
      </S.Root>
    </StyleSheetManager>
  )
}

export default Root
