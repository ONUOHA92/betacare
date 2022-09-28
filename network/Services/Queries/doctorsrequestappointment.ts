import { GET_REQUEST_APPOINTMENT_ALL } from '../../config/endpoints'
import { IAddDoctorsRequestALL } from '../../../interface/doctorsrequestappointment'
import api from 'network/config/api'

export const getDoctorsRequestAppointmentServices = async () => {
  const data = {
    page: 0,
    size: 1,
  }

  const response = await api.apiGet(GET_REQUEST_APPOINTMENT_ALL, data)
  return response
}
