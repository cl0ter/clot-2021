import styled, { css } from 'styled-components'
import { StoreLinkType } from '../../types'

export const AppStore = styled.div<{ linkType: StoreLinkType }>`
  display: flex;

  a {
    display: flex;
  }

  margin-top: 64px;

  @media (max-width: 768px) {
    margin-top: 32px;
  }

  @media (max-width: 375px) {
    margin-top: 24px;
  }

  ${({ linkType }) =>
    linkType === StoreLinkType.APP_STORE &&
    css`
      @media (max-width: 375px) {
        display: none;
      }
    `}
`
