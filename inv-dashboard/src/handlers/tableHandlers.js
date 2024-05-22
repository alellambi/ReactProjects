export function orderBy(e, tableData){
  function compareBy(first, second) {
    return second[`${query}`] >= first[`${query}`] ? 1 : -1
  }

  function compareByOposite(first, second) {
    return first[`${query}`].localeCompare(second[`${query}`])
  }

  const query = e.target.id
  const tableDataCopy = structuredClone(tableData)
      console.log(query)
    console.log(tableData[0])
  return query === "symbol" || query === "coin" 
    ? tableDataCopy.sort(compareByOposite)
    : tableDataCopy.sort(compareBy)

}

export function isFiltered(column, filters) {
  return filters.includes(column)
}