export const mapper = (data) => {
  let listData = {}
  const listIds = data.map(element => {
    const id = element.id
    listData[id] = element
    return id
  })
  return {listData, listIds}
}