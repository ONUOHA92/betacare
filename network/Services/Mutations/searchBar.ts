import { ISearchDoctors } from 'interface/doctorsprofile'
import { GET_DOCTOR_BY_SEARCH } from 'network/config/endpoints'
import api from 'network/config/api'

export const searchForDoctorsService = async (payload: ISearchDoctors) => {
  const response = api.post(
    `${GET_DOCTOR_BY_SEARCH}?page=${payload.page}&size=10`,
    {
      searchText: payload?.searchText,
    }
  )
  return response
}
