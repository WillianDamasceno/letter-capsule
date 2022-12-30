import { NextApiResponse } from "next"

export type ApiError = {
  message: string
  data?: object[]
}

export type ApiResponse = {
  success: boolean
  response?: {
    message?: string
    data?: object[]
  }
  errors?: ApiError[]
}

export const apiActions = (res: NextApiResponse<ApiResponse>) => {
  const errors: ApiError[] = []

  const setError = ({
    code = 500,
    errors,
  }: {
    code?: number
    errors?: ApiError[]
  }) => {
    return res.status(code).json({
      success: false,
      errors,
    })
  }

  const setSuccess = (
    {
      code = 200,
      message,
      data,
    }: {
      code?: number
      message?: string
      data?: object[]
    }
  ) => {
    if (errors.length) {
      setError({ errors })
    }

    return res.status(code).json({
      success: true,
      response: {
        message,
        data,
      },
    })
  }

  return {setSuccess, setError, errors}
}
