import { FunctionComponent } from 'react'
import * as S from './loader.styled'
import logo from './logo.svg'
import { LoaderProps } from './types'

const Loader: FunctionComponent<LoaderProps> = ({ loaded }) => {
  return (
    <S.Loader loaded={loaded}>
      <S.Logo>
        <img src={logo} alt="loading" />
      </S.Logo>
    </S.Loader>
  )
}

export default Loader
