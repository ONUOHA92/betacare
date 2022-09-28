import { User } from 'types/usersTypes'
import { Auth } from 'types/authTypes'
export namespace Home {
  export type State = {
    isLoading: boolean
    home: Home
  }
  export interface Home {
    upcomingAppointments: Appointments
    patientInteraction: PatientsInteraction
    requestedAppointments: Appointments
    doctorName: Message
  }
  export interface Message {
    message?: string
  }

  export interface Appointments {
    totalPages?: number
    totalElements?: number
    pageable?: Pageable
    first?: boolean
    sort?: Sort
    size?: number
    content?: Content[]
    number?: number
    last?: boolean
    numberOfElements?: number
    empty?: boolean
  }

  export interface Content {
    id?: number
    date?: string
    time?: string
    patientName?: string
    status?: string
  }

  export interface Pageable {
    pageNumber?: number
    pageSize?: number
    sort?: Sort
    offset?: number
    unpaged?: boolean
    paged?: boolean
  }

  export interface Sort {
    sorted?: boolean
    empty?: boolean
    unsorted?: boolean
  }

  export interface PatientsInteraction {
    totalNumberOfConversation?: number
  }

  export enum ATypes {
    DESTROY = 'DESTROY',
    REQ_GET_UPCOMING_APPIONTMENT = 'HOME.REQ_GET_UPCOMING_APPIONTMENT',
    RES_GET_UPCOMING_APPIONTMENT = 'HOME.RES_GET_UPCOMING_APPIONTMENT',
    ERR_GET_UPCOMING_APPIONTMENT = 'HOME.ERR_GET_UPCOMING_APPIONTMENT',

    REQ_GET_REQUESTED_APPIONTMENT = 'HOME.REQ_GET_REQUESTED_APPIONTMENT',
    RES_GET_REQUESTED_APPIONTMENT = 'HOME.RES_GET_REQUESTED_APPIONTMENT',
    ERR_GET_REQUESTED_APPIONTMENT = 'HOME.ERR_GET_REQUESTED_APPIONTMENT',

    REQ_GET_PATIENTS_INTERACTION = 'HOME.REQ_GET_PATIENTS_INTERACTION',
    RES_GET_PATIENTS_INTERACTION = 'HOME.RES_GET_PATIENTS_INTERACTION',
    ERR_GET_PATIENTS_INTERACTION = 'HOME.ERR_GET_PATIENTS_INTERACTION',

    REQ_GET_DOCTOR_NAME = 'HOME.REQ_GET_DOCTOR_NAME',
    RES_GET_DOCTOR_NAME = 'HOME.RES_GET_DOCTOR_NAME',
    ERR_GET_DOCTOR_NAME = 'HOME.ERR_GET_DOCTOR_NAME',
  }

  // export interface IActionHome extends Action {
  //   payload: any
  //   type: ATypes & Auth.ATypes.AUTH_LOGOUT
  // }
}
