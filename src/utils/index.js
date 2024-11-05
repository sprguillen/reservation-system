export const isEmpty = (obj) => !obj || Object.keys(obj).length === 0;

export const countTables = (branch) => {
  let total = 0;

  if (!isEmpty(branch)) {
    branch.sections.forEach((section) => {
      total += section.tables.length;
    })
  }

  return total;
}