export const user = [...Array(10)].map((_, index) => ({
  id: `${index}`,
  name: `name_${index}`,
}));