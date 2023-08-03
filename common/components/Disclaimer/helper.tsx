export const getAlertDate = () => {
  return typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("disclaimer") ?? "null")
    : null
}

export const setAlertDate = () => {
  //This adds two weeks to current date
  localStorage.setItem(
    "disclaimer",
    JSON.stringify(new Date(Date.now() + 12096e5)),
  )
}
