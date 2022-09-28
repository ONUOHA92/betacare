import { Auth } from 'types/authTypes'
import {
  Pagination,
  PaginationPageOptions,
  ROLE_TYPE,
} from 'utils/utilityTypes'

export type State = {
  users: Users
  loading: Loading
  error: Error
  success: Success
}

export type User = {
  firstName: string
  lastName: string
  email: string
  activated: boolean
  deleted: boolean
  emailVerified: boolean
  imageUrl: string
  userType: ROLE_TYPE
}

export type Users = Pagination & {
  content: User[]
}

export type Loading = {
  users: boolean
}

export type Error = {
  users: boolean
}

export type Success = {
  users: boolean
}
export type UserPageOptions = PaginationPageOptions

export type AgentsFilterOptions = PaginationPageOptions & {
  endDate: string
  startDate: string
  superAgentCode: string
}

export enum ATypes {
  DESTROY = 'DESTROY',

  REQ_USERS = 'REQ_USERS',
  RES_USERS = 'RES_USERS',
  ERR_USERS = 'ERR_USERS',

  REQ_GET_FILTER_ACTIVE_USERS = 'REQ_GET_FILTER_ACTIVE_USERS',
  RES_GET_FILTER_ACTIVE_USERS = 'RES_GET_FILTER_ACTIVE_USERS',
  ERR_GET_FILTER_ACTIVE_USERS = 'ERR_GET_FILTER_ACTIVE_USERS',
}
