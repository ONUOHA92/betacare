import { IAddSubUser } from '../../../interface/subuser'
import {
  ADD_SUB_USER_ENDPOINT,
  REMOVE_SUB_USER_ENDPOINT,
} from '../../config/endpoints'
import api from 'network/config/api'

export const addSubUserService = async (payload: IAddSubUser) => {
  const response = api.post(ADD_SUB_USER_ENDPOINT, payload)
  return response
}

export const removeSubUserService = async (id: number) => {
  const response = api.delete(REMOVE_SUB_USER_ENDPOINT, id)
  return response
}
