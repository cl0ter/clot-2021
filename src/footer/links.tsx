import * as S from './links.styled'
import { LinkList } from '../types'

const Links = ({ list }: { list: LinkList[] }) => {
  return (
    <S.Container>
      {list.map((item, idx) => (
        <S.Column key={idx}>
          <S.Title>{item.title}</S.Title>
          <S.List>
            {item.list.map((listItem, idx) => (
              <S.Link key={idx}>
                <S.Text
                  as={listItem.unavailable ? 'span' : 'a'}
                  href={listItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {listItem.text}
                </S.Text>
                {listItem.unavailable && <S.Unavailable>Soon</S.Unavailable>}
              </S.Link>
            ))}
          </S.List>
        </S.Column>
      ))}
    </S.Container>
  )
}

export default Links
