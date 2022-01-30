import React from 'react'
import * as S from './progress.styled'
import { Slide } from '../types'

const Progress = ({
  slides,
  frameId
}: {
  slides: Slide[]
  frameId: string
}) => {
  return (
    <S.Progress>
      <S.Bar>
        {slides.map((_slide, idx) => (
          <S.Part key={idx}>
            <span className={`${frameId}-part`} />
          </S.Part>
        ))}
      </S.Bar>
    </S.Progress>
  )
}

export default Progress
