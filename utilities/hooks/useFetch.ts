import { useEffect, useState } from "react"

interface Options {
  refetch?: boolean
  attempts?: number
  delayBetweenAttempts?: number
  callback?: (arg: any) => any
}

const defaultOptions: Options = {
  refetch: true,
  attempts: 5,
  delayBetweenAttempts: 5000,
  callback: (arg: any) => arg,
}

export const useFetch = (
  url: string,
  requestInit: RequestInit = {
    method: "GET",
  },
  options: Options = defaultOptions
) => {
  options = Object.assign({}, defaultOptions, options)

  const [data, setData] = useState<any>(null)
  const [response, setResponse] = useState<any>(null)
  const [error, setError] = useState(null)

  const [loading, setLoading] = useState(false)
  const [finished, setFinished] = useState(false)

  const refetch = async () => {
    setLoading(true)
    setFinished(false)

    await fetch(url, requestInit)
      .then((response) => {
        setResponse(response)
        return response
      })
      .then(async (response) => {
        if (!options.callback) {
          return setData(response)
        }

        const callbackResult = options.callback(response)

        if (callbackResult instanceof Promise) {
          return setData(await callbackResult)
        }

        return setData(callbackResult)
      })
      .catch((error) => setError(error))

    setLoading(false)
    setFinished(true)
  }

  useEffect(() => {
    refetch()

    return () => {
      setData(null)
      setLoading(false)
      setError(null)
    }
  }, [url])

  return { data, finished, loading, error, response, refetch }
}
