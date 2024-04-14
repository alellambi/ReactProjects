import { Square } from './Square'

export function Subtable ({ index, subtable, handlePlay }) {
  // console.log(subtable)
  return (
    <main>
      {
        subtable.map((_, subIndex) => {
          return (
            <Square key={'t' + index + 's' + subIndex}
              index={index} subIndex={subIndex}
              handlePlay={handlePlay}
            >
              {subtable[subIndex]}
            </Square>
          )
        })
      }
    </main>
  )
}
