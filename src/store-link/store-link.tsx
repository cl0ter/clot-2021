import appStoreImg from './app-store.svg'
import appleTvStoreImg from './apple-tv-store.svg'
import * as S from './store-link.styled'
import { StoreLinkType } from '../types'
import { useContext } from 'react'
import { LangContext } from '../root/root'

const StoreLink = ({ type }: { type: StoreLinkType }) => {
  const texts = useContext(LangContext)

  return (
    <S.AppStore>
      {type === StoreLinkType.APP_STORE ? (
        <a href={texts.appStoreLink} target="_blank" rel="noreferrer">
          <img src={appStoreImg} alt="app store link" />
        </a>
      ) : (
        <a href={texts.appleTvStoreLink} target="_blank" rel="noreferrer">
          <img src={appleTvStoreImg} alt="apple tv store link" />
        </a>
      )}
    </S.AppStore>
  )
}

export default StoreLink
