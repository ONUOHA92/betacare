import { User } from 'types/usersTypes'
import { Auth } from 'types/authTypes'
import { Pagination } from 'utils/utilityTypes'
export namespace Patients {
  export type State = {
    loading: Loading
    error: Error
    success: Success
    errorMessage: any
    pharmacyAppointments: PharmacyAppointments
    labAppointments: LabAppointments
    prescriptions: Prescriptions
    getAllActivities: null | Activities
    appointment: any
    updatePassword: null | UpdatePassword
    setPeriodTracker: null | PeriodTracker
    setPeriodTrackerStatus: Status
    getPeriodTracker: null | PeriodTracker
    getPeriodTrackerStatus: Status
    cancelAppointmentAlt: any
    cancelAppointmentStatus: Status
  }

  export interface PeriodTracker {
    lastPeriodStartDate?: string
    menstrualPeriodCycleLength: number
    menstrualPeriodFlowLength: number
    nextPeriodStartDate?: string
    weight: string
    height: string
  }

  export interface Status {
    success: boolean
    error: string
    isLoading: boolean
  }

  export interface Activities {
    content: Content[]
    pageable: Pageable
    last: boolean
    totalPages: number
    totalElements: number
    first: boolean
    size: number
    number: number
    sort: Sort
    numberOfElements: number
    empty: boolean
  }

  export interface Content {
    email: string
    date: Date
    time: string
    action: string
    phoneNumber: string
    userType: string
  }

  export interface Pageable {
    sort: Sort
    pageNumber: number
    pageSize: number
    offset: number
    paged: boolean
    unpaged: boolean
  }

  export interface Sort {
    sorted: boolean
    empty: boolean
    unsorted: boolean
  }

  export type Loading = {
    pharmacyAppointments: boolean
    labAppointments: boolean
    prescriptions: boolean
    appointment: boolean
    updatePassword: boolean
    getAllActivities: boolean
  }

  export type UpdatePassword = {
    oldPassword: string
    newPassword: string
    confirmPassword: string
  }

  export type SuccessMessage = {
    message: string
  }

  export type Error = {
    pharmacyAppointments: boolean
    labAppointments: boolean
    prescriptions: boolean
    appointment: boolean
    updatePassword: boolean
    getAllActivities: boolean
  }

  export type Success = {
    pharmacyAppointments: boolean
    labAppointments: boolean
    prescriptions: boolean
    appointment: boolean
    updatePassword: boolean
    getAllActivities: boolean
  }

  export type PharmacyAppointment = {
    pharmacy: {
      name: string
    }
    service: string
    price: number
    availableDate: string
    availableTime: string
  }
  export type CancelAppointment = {
    reason: string
    appointmentId: number
  }

  export type PharmacyAppointments = Pagination & {
    content: PharmacyAppointment[]
  }

  export type BookAppointment = {
    appointmentDate: string
    appointmentTime: string
    doctorId: number
  }

  export type Laboratory = {
    name: string
    user: User
  }

  export type LabAppointment = {
    id: 0
    laboratory: Laboratory
    service: string
    price: 0
    availableDate: string
    availableTime: string
  }

  export type LabAppointments = Pagination & {
    content: LabAppointment[]
  }

  export type Drugs = {
    name: string
    strength: string
    duration: string
    dosage: string
  }

  export type Prescription = {
    date: string
    prescriptionStatus: string
    drugs: Drugs[]
  }

  export type Prescriptions = Pagination & {
    content: Prescription[]
  }

  export enum ATypes {
    DESTROY = 'DESTROY',
    DESTROY_LOADING = 'DESTROY_LOADING',
    DESTROY_CANCEL_APPOINTMENT = 'DESTROY_CANCEL_APPOINTMENT',

    REQ_GET_PHARMACY_APPOINTMENTS = 'REQ_GET_PHARMACY_APPOINTMENTS',
    RES_GET_PHARMACY_APPOINTMENTS = 'RES_GET_PHARMACY_APPOINTMENTS',
    ERR_GET_PHARMACY_APPOINTMENTS = 'ERR_GET_PHARMACY_APPOINTMENTS',

    REQ_GET_LABORATORY_APPOINTMENTS = 'REQ_GET_LABORATORY_APPOINTMENTS',
    RES_GET_LABORATORY_APPOINTMENTS = 'RES_GET_LABORATORY_APPOINTMENTS',
    ERR_GET_LABORATORY_APPOINTMENTS = 'ERR_GET_LABORATORY_APPOINTMENTS',

    REQ_GET_PRESCRIPTIONS = 'REQ_GET_PRESCRIPTIONS',
    RES_GET_PRESCRIPTIONS = 'RES_GET_PRESCRIPTIONS',
    ERR_GET_PRESCRIPTIONS = 'ERR_GET_PRESCRIPTIONS',

    REQ_GET_ALL_APPOINTMENTS = 'REQ_GET_ALL_APPOINTMENTS',
    RES_GET_ALL_APPOINTMENTS = 'RES_GET_ALL_APPOINTMENTS',
    ERR_GET_ALL_APPOINTMENTS = 'ERR_GET_ALL_APPOINTMENTS',

    REQ_BOOK_APPOINTMENTS = 'REQ_BOOK_APPOINTMENTS',
    RES_BOOK_APPOINTMENTS = 'RES_BOOK_APPOINTMENTS',
    ERR_BOOK_APPOINTMENTS = 'ERR_BOOK_APPOINTMENTS',

    REQ_CANCEL_APPOINTMENTS = 'REQ_CANCEL_APPOINTMENTS',
    RES_CANCEL_APPOINTMENTS = 'RES_CANCEL_APPOINTMENTS',
    ERR_CANCEL_APPOINTMENTS = 'ERR_CANCEL_APPOINTMENTS',

    REQ_GET_DOCTOR_APPOINTMENTS = 'REQ_GET_DOCTOR_APPOINTMENTS',
    RES_GET_DOCTOR_APPOINTMENTS = 'RES_GET_DOCTOR_APPOINTMENTS',
    ERR_GET_DOCTOR_APPOINTMENTS = 'ERR_GET_DOCTOR_APPOINTMENTS',

    REQ_UPDATE_PASSWORD = 'REQ_UPDATE_PASSWORD',
    RES_UPDATE_PASSWORD = 'RES_UPDATE_PASSWORD',
    ERR_UPDATE_PASSWORD = 'ERR_UPDATE_PASSWORD',

    REQ_GET_ALL_ACTIVITIES = 'REQ_GET_ALL_ACTIVITIES',
    RES_GET_ALL_ACTIVITIES = 'RES_GET_ALL_ACTIVITIES',
    ERR_GET_ALL_ACTIVITIES = 'ERR_GET_ALL_ACTIVITIES',

    REQ_SET_PERIOD_TRACKER = 'REQ_SET_PERIOD_TRACKER',
    RES_SET_PERIOD_TRACKER = 'RES_SET_PERIOD_TRACKER',
    ERR_SET_PERIOD_TRACKER = 'ERR_SET_PERIOD_TRACKER',

    REQ_GET_PERIOD_TRACKER = 'REQ_GET_PERIOD_TRACKER',
    RES_GET_PERIOD_TRACKER = 'RES_GET_PERIOD_TRACKER',
    ERR_GET_PERIOD_TRACKER = 'ERR_GET_PERIOD_TRACKER',
  }

  // export interface IActionPatients extends Action {
  //   payload: any
  //   type: ATypes & Auth.ATypes.AUTH_LOGOUT
  // }
}
