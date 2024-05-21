import { options } from "#/asset/iconOptions.js"
export function IconSelector({turns, setSelector, restartGame}) {
  
  function handleClick(e){
    turns.o = options[e.target.id][0]
    turns.x = options[e.target.id][1]

    restartGame()
    setSelector(false)
  }

  return (
    <div className="board">
      {options.map((array, index) => {
        return (
          <div key={index}>
            <button id={`${index}`} onClick={handleClick}>{array[0] + " VS " + array[1]}</button>
          </div>
        )
      })}
    </div>
  )
}