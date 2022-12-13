export const to = (promise: Promise<any>) => {
  return promise.then((res) => [null, res.json()]).catch((e) => [e, null])
}
