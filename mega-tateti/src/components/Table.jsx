// import { Square } from './Square'

export function Table ({ children }) {
  return (
    <main className="board">
      {/* {
        table.map((_, index) => {
          return (
            <Square key={index} index={index} handlePlay={handlePlay}>
              {table[index]}
            </Square>
          )
        })
      } */}
      {children}
    </main>
  )
}
