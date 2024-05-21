import { TURNS } from "#consts.js"

export function Square ({ children, index, subIndex, handlePlay, turn }) {
  function handleClick () {
    if (children) {
      return
    }
    handlePlay(index, subIndex)
  }
  // console.log(index, subIndex)
  const url = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'  width='100' height='120' viewport='0 0 100 100' style='fill:black;font-size:32px;'><text y='50%'>${turn}</text></svg>") 40 40,auto`
  return (
    <div className={`square ${turn}`} onClick={handleClick} style={{cursor: url}}>
        {children}
    </div>
  )
}
