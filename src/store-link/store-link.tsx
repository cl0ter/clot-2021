import appStoreImg from './app-store.svg'
import appleTvStoreImg from './apple-tv-store.svg'
import * as S from './store-link.styled'
import { StoreLinkType } from '../types.d'

const StoreLink = ({
  type,
}: {
  type: StoreLinkType
}) => {
  return (
    <S.AppStore>
      { type === StoreLinkType.APP_STORE
        ? (
          <a href="./">
            <img src={ appStoreImg } alt="app store link" />
          </a>
        )
        : (
          <a href="./">
            <img src={ appleTvStoreImg } alt="apple tv store link" />
          </a>
        )
      }

    </S.AppStore>
  )
}

export default StoreLink
