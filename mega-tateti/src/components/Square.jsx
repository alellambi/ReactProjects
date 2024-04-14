export function Square ({ children, index, subIndex, handlePlay }) {
  function handleClick () {
    if (children) {
      return
    }
    handlePlay(index, subIndex)
  }
  // console.log(index, subIndex)

  return (
    <div className="square" onClick={handleClick}>
        {children}
    </div>
  )
}
