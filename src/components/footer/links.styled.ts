import styled, { css } from 'styled-components'
import { link } from '../root/global.styled'

export const Container = styled.div`
  display: flex;
  column-gap: 32px;

  @media (max-width: 428px) {
    flex-direction: column;
    column-gap: 0px;
    row-gap: 48px;
  }
`

export const Column = styled.div`
  flex: 208px 0;
  width: 208px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    flex: 1;
    width: auto;
  }
`

export const Title = styled.div`
  margin-bottom: 32px;
  color: var(--color-light-gray-50);
`

export const List = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
`

export const Text = styled.div<{ as: 'a' | 'span' }>`
  ${({ as }) =>
    as === 'a'
      ? link
      : css`
          color: var(--color-light-gray-50);
        `}
`

export const Link = styled.div``

export const Unavailable = styled.span`
  font-size: 12px;
  line-height: 20px;
  letter-spacing: -0.1px;
  color: var(--color-red);
  vertical-align: super;
  margin-left: 1px;
`
