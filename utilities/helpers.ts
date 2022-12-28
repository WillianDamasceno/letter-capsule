export const to = async (promise: Promise<any>) => {
  return promise.then((res) => [null, res]).catch((e) => [e, null])
}

export const toJson = async (promise: Promise<any>) => {
  const [error, response] = await to(promise)

  return [error, await response.json()]
}
