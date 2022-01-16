import StoreLink from '../store-link/store-link'
import * as S from './qr.styled'
import qrImg from './qr.svg'
import crossImg from './cross.svg'
import { StoreLinkType } from '../types.d'

const Qr = ({
  visible,
  hide,
}: {
  visible: boolean,
  hide: () => void,
}) => {
  return (
    <S.Qr visible={ visible }>
      <S.Header>
        <S.Hide onClick={ hide }>
          <img src={ crossImg } alt="hide" />
        </S.Hide>
      </S.Header>
      <S.Left>
        <h1>Scan QR code to get the Clot app</h1>
        <h2>Open your smartphone camera and point it to the QR code, click on the link generated to download the app</h2>
        <StoreLink type={ StoreLinkType.APP_STORE } />
      </S.Left>
      <S.Right>
        <img src={ qrImg } alt="qr code" />
      </S.Right>
    </S.Qr>
  )
}

export default Qr
