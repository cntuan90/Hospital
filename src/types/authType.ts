export type LoginDataType = {
  companyCode: string,
  staffId: string,
  token?: string, // Clear affter update api
  accessToken?: string,
  refreshToken?: string,
  expiresIn: number
}

export type AuthState = {
  isAuth: boolean,
  error: string[],
  isLoading: boolean,
}

export type JwtPayloadType = { companyCode: string, sub: string, exp: number }
