import { IAddNextOfKin } from '../../../interface/nextofkin'
import {
  ADD_NEXT_OF_KIN_ENDPOINT,
  UPDATE_NEXT_OF_KIN_ENDPOINT,
  REMOVE_NEXT_OF_KIN_ENDPOINT,
} from '../../config/endpoints'
import api from 'network/config/api'

export const addNextOfKinService = async (payload: IAddNextOfKin) => {
  const response = api.post(ADD_NEXT_OF_KIN_ENDPOINT, payload)
  return response
}

export const updateNextOfKinService = async ({ id, ...payload }) => {
  const response = api.put(`${UPDATE_NEXT_OF_KIN_ENDPOINT}/${id}`, payload)
  return response
}

export const removeNextOfKinService = async (id: number) => {
  const response = api.delete(`${REMOVE_NEXT_OF_KIN_ENDPOINT}/${id}`)
  return response
}
