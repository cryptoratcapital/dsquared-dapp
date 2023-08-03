export const numberFormat = (num: number | string, precision = 3) => {
  let formattedStr = Number(num).toLocaleString("en-US", {
    maximumFractionDigits: precision,
  })
  if (Number(formattedStr) === 0 && num > 0) {
    formattedStr = `< 0.${"0".repeat(precision - 1)}1`
  }
  return formattedStr
}

export const percentageFormat = (num: number | string) => {
  return Number(num).toFixed(2)
}
