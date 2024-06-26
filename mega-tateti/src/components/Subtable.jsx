import { Square } from './Square'

export function Subtable ({ index, subtable, handlePlay, isFinished, isDisabled, turn }) {
  // console.log(index, isDisabled)
  let dynamicClass = 'subBoard'
  // console.log('Is Finished en ', index, 'es', isFinished)
  if (isFinished) dynamicClass += ' finished'
  if (isDisabled) dynamicClass += ' disabled'
  else dynamicClass += ' selected'

  // console.log(dynamicClass)

  return (
    <>
      {/* {
        isFinished
          ? (<div className="subWinnerModal">
              {isFinished}
            </div>)
          : null
      } */}
      <article className={dynamicClass}>
        {
          subtable.map((_, subIndex) => {
            return (
              <Square key={'t' + index + 's' + subIndex}
                index={index} subIndex={subIndex}
                handlePlay={handlePlay}
                isDisabled={isDisabled}
                turn={turn}
              >
                {subtable[subIndex]}
              </Square>
            )
          })
        }
      </article>
    </>
  )
}
