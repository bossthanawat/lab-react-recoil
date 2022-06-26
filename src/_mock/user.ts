

export const user = [...Array(5)].map((_, index) => ({
  id: `${index}`,
  name: `name_${index}`,
  friendList: [...Array(5)].map((_, index) =>`${index}`).filter((id)=> id !== `${index}`)
}));