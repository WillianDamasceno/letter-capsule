export const to = async (promise: Promise<any>) => {
  return promise.then((res) => [null, res]).catch((e) => [e, null])
}

export const toJson = async (promise: Promise<any>) => {
  const [error, res] = await to(promise)
  const response = Boolean(res) && (await res?.json())

  return [error, response]
}
