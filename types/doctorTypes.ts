import { User } from 'types/usersTypes'
import { Auth } from 'types/authTypes'
import { Pagination } from 'utils/utilityTypes'
export namespace Doctors {
  export type State = {
    loading: Loading
    error: Error
    success: Success
    doctors: Doctors
    doctorProfileById: Doctor
    doctorAvailabilities: Record<string, unknown>

    availability: null | Message
    availability_list: null | Message
    update_appointment: null | Message
    availability_status: Status
    availabilitylist_status: Status
    update_appointement_status: Status
    updatePassword: Status
    activities: Activity[] | null
    activities_status: Status
  }

  export type Loading = {
    doctors: boolean
    doctorProfileById: boolean
  }

  export type Error = {
    doctors: boolean
    doctorProfileById: boolean
  }

  export type Success = {
    doctors: boolean
    doctorProfileById: boolean
  }

  export interface IAvailability {
    workday?: string
    startWorkTime?: string
    endWorkTime?: string
  }

  export interface Status {
    success: boolean
    error: string
    isLoading: boolean
  }
  export type UpdatePasswordDetails = {
    oldPassword: string
    newPassword: string
    confirmPassword: string
  }
  export interface Activity {
    currentDate: string
    activityLogsResponse: ActivityLog
  }

  export type ActivityLog = {
    time: string
    action: string
    userType: string
  }
  export type IMessage = IAvailability & {
    id: number
  }

  export interface Message {
    message?: string
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

  export interface UpdateAppointment {
    appointmentId: number
    status: string
    cancellation?: string
  }

  export type Doctor = {
    id?: number
    firstName: string
    lastName: string
    phoneNumber: string
    gender: string
    email: string
    profilePics: string
    address: string
    speciality: string
    qualification: string
    bio: string
    age: number
    hospital: string
    location: string
    dateOfBirth: string
  }

  export type Doctors = Pagination & {
    content: Doctor[]
  }

  export enum ATypes {
    DESTROY = 'DESTROY',

    REQ_GET_DOCTORS = 'REQ_GET_DOCTORS',
    RES_GET_DOCTORS = 'RES_GET_DOCTORS',
    ERR_GET_DOCTORS = 'ERR_GET_DOCTORS',

    REQ_GET_DOCTOR_PROFILE_BY_ID = 'REQ_GET_DOCTOR_PROFILE_BY_ID',
    RES_GET_DOCTOR_PROFILE_BY_ID = 'RES_GET_DOCTOR_PROFILE_BY_ID',
    ERR_GET_DOCTOR_PROFILE_BY_ID = 'ERR_GET_DOCTOR_PROFILE_BY_ID',

    REQ_DOCTOR_AVAILABILITY = 'REQ_DOCTOR_AVAILABILITY',
    RES_DOCTOR_AVAILABILITY = 'RES_DOCTOR_AVAILABILITY',
    ERR_DOCTOR_AVAILABILITY = 'ERR_DOCTOR_AVAILABILITY',

    REQ_SEARCH_DOCTORS = 'REQ_SEARCH_DOCTORS',
    RES_SEARCH_DOCTORS = 'RES_SEARCH_DOCTORS',
    ERR_SEARCH_DOCTORS = 'ERR_SEARCH_DOCTORS',

    REQ_FILTER_DOCTORS_BY_SPEC = 'REQ_FILTER_DOCTORS_BY_SPEC',
    RES_FILTER_DOCTORS_BY_SPEC = 'RES_FILTER_DOCTORS_BY_SPEC',
    ERR_FILTER_DOCTORS_BY_SPEC = 'ERR_FILTER_DOCTORS_BY_SPEC',

    REQ_UPDATE_DOCTOR_AVAILABILITY = 'REQ_UPDATE_DOCTOR_AVAILABILITY',
    RES_UPDATE_DOCTOR_AVAILABILITY = 'RES_UPDATE_DOCTOR_AVAILABILITY',
    ERR_UPDATE_DOCTOR_AVAILABILITY = 'ERR_UPDATE_DOCTOR_AVAILABILITY',

    REQ_UPDATE_APPOINTMENT_STATUS = 'REQ_UPDATE_APPOINTMENT_STATUS',
    RES_UPDATE_APPOINTMENT_STATUS = 'RES_UPDATE_APPOINTMENT_STATUS',
    ERR_UPDATE_APPOINTMENT_STATUS = 'ERR_UPDATE_APPOINTMENT_STATUS',

    REQ_UPDATE_DOCTOR_PASSWORD = 'SETTINGS.REQ_UPDATE_DOCTOR_PASSWORD',
    RES_UPDATE_DOCTOR_PASSWORD = 'SETTINGS.RES_UPDATE_DOCTOR_PASSWORD',
    ERR_UPDATE_DOCTOR_PASSWORD = 'SETTINGS.ERR_UPDATE_DOCTOR_PASSWORD',

    REQ_DOCTOR_ACTIVITIES = 'REQ_DOCTOR_ACTIVITIES',
    RES_DOCTOR_ACTIVITIES = 'RES_DOCTOR_ACTIVITIES',
    ERR_DOCTOR_ACTIVITIES = 'ERR_DOCTOR_ACTIVITIES',
  }

  // export interface IActionDoctors extends Action {
  //   payload: any
  //   type: ATypes & Auth.ATypes.AUTH_LOGOUT
  // }
}
