export function Square ({ children, index, subIndex, handlePlay, turn }) {
  function handleClick () {
    if (children) {
      return
    }
    handlePlay(index, subIndex)
  }
  // console.log(index, subIndex)

  return (
    <div className={`square ${turn}`} onClick={handleClick}>
        {children}
    </div>
  )
}
