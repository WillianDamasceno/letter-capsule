export const to = (promise: Promise<any>) => {
  return promise.then((res) => [null, res]).catch((e) => [e, null])
}
