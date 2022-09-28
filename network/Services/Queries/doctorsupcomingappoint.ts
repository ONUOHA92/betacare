import { GET_UP_COMMING_APPOINTMENT_ENDPOINT } from '../../config/endpoints'
import { IAddDoctorsAppoint } from '../../../interface/doctorsappointment'
import api from 'network/config/api'

export const getDoctorsUppcomingAppointmentService = async () => {
  const data = {
    page: 0,
    size: 1,
    sort: [],
  }
  const response = await api.apiGet(GET_UP_COMMING_APPOINTMENT_ENDPOINT, data)
  return response
}
