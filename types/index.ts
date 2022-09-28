import { AxiosResponse } from 'axios'

export type ErrorResponse = Record<any, any>
export type RequestResponse = AxiosResponse<any, any> | any
export type  PaletteMode = 'light' | 'dark'