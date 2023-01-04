export const to = async (promise: Promise<any>) => {
  return promise
    .then((response) => [null, response])
    .catch((error) => [error, null])
}

export const toJson = async (promise: Promise<any>) => {
  const [error, response] = await to(promise)
  const data = !error && Boolean(response) ? await response?.json() : null

  return [error, data, response]
}

export const formatDateToInputValue = (date: Date | string) => {
  const datePieces = Intl.DateTimeFormat("en-us").format(new Date(date)).split("/")
  datePieces.unshift(String(datePieces.pop()))
  return datePieces.join("-")
}
