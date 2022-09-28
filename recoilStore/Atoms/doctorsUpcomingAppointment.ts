import { atom } from 'recoil'
import { doctorsUpcomingAppointment } from '../initialState/doctorsuppcomingappointment'
import { GET_DOCTOR_UP_COMING_APPOINTMENT } from 'network/config/queryKeys'

export const getDoctorsUpcomingAtom = atom({
    key: GET_DOCTOR_UP_COMING_APPOINTMENT,
    default: { ...doctorsUpcomingAppointment },
})