import StoreLink from '../store-link/store-link'
import * as S from './qr.styled'
import qrImg from './qr.svg'
import crossImg from './cross.svg'
import { StoreLinkType } from '../types'
import { useContext } from 'react'
import { LangContext } from '../root/root'

const Qr = ({ visible, hide }: { visible: boolean; hide: () => void }) => {
  const texts = useContext(LangContext)

  return (
    <S.Qr visible={visible}>
      <S.Container>
        <S.Header>
          <S.Hide onClick={hide}>
            <img src={crossImg} alt="hide" />
          </S.Hide>
        </S.Header>
        <S.Left>
          <h1>{texts.qrTitle}</h1>
          <h2>{texts.qrText}</h2>
          <StoreLink type={StoreLinkType.APP_STORE} />
        </S.Left>
        <S.Right>
          <img src={qrImg} alt="qr code" />
        </S.Right>
      </S.Container>
    </S.Qr>
  )
}

export default Qr
