import * as S from './loader.styled'
import logo from './logo.svg'

const Loader = ({
  loaded,
}: {
  loaded: boolean,
}) => {
  return (
    <S.Loader loaded={ loaded }>
      <S.Logo>
        <img src={ logo } alt="loading" />
      </S.Logo>
    </S.Loader>
  )
}

export default Loader
