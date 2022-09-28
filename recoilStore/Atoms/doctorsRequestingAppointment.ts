import { atom } from 'recoil'
import { doctorRequestCredential } from '../initialState/doctorsrequestappointment'
import { GET_DOCTOR_REQUEST_APPOINTMENT_ALL } from 'network/config/queryKeys'

export const getDoctorsProfileAtom = atom({
    key: GET_DOCTOR_REQUEST_APPOINTMENT_ALL,
    default: { ...doctorRequestCredential },
})
