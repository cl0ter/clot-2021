import * as S from './progress.styled'
import { Slide } from '../../types'
import { useCallback } from 'react'

const Progress = ({
  slides,
  frameId,
  setSliderState
}: {
  slides: Slide[]
  frameId: string
  setSliderState: any
}) => {
  const handlePartClick = useCallback(
    (idx: number) => {
      setSliderState((state: any) => ({
        ...state,
        [frameId]: idx
      }))
    },
    [frameId, setSliderState]
  )

  return (
    <S.Progress>
      <S.Bar>
        {slides.map((_slide, idx) => (
          <S.Clickable onClick={() => handlePartClick(idx)} key={idx}>
            <S.Part>
              <span className={`${frameId}-part`} />
            </S.Part>
          </S.Clickable>
        ))}
      </S.Bar>
    </S.Progress>
  )
}

export default Progress
