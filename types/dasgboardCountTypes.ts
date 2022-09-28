import { Auth } from 'types/authTypes'

export namespace Dashboard {
  export type State = {
    dashboardCount: DashboardCount
  }

  export type DashboardCount = {
    pharmacyAppointmentCount: PharmacyAppointmentCount
    labAppointmentCount: LabAppointmentCount
    doctorsAppointmentCount: DoctorsAppointmentCount
    doctorConversationCount: DoctorConversationCount
    prescriptionCount: PrescriptionCount
  }

  export type PharmacyAppointmentCount = {
    totalNumberOfPharmacyAppointments: number
  }

  export type LabAppointmentCount = {
    totalNumberOfLaboratoryAppointments: number
  }

  export type DoctorsAppointmentCount = {
    totalNumberOfDoctorsAppointments: number
  }

  export type DoctorConversationCount = {
    totalNumberOfConversation: number
  }

  export type PrescriptionCount = {
    totalNumberOfPrescription: number
  }

  export enum ATypes {
    DESTROY = 'DESTROY',

    REQ_PHARMACY_APPOINTMENT_COUNT = 'REQ_PHARMACY_APPOINTMENT_COUNT',
    RES_PHARMACY_APPOINTMENT_COUNT = 'RES_PHARMACY_APPOINTMENT_COUNT',
    ERR_PHARMACY_APPOINTMENT_COUNT = 'ERR_PHARMACY_APPOINTMENT_COUNT',

    REQ_LAB_APPOINTMENT_COUNT = 'REQ_LAB_APPOINTMENT_COUNT',
    RES_LAB_APPOINTMENT_COUNT = 'RES_LAB_APPOINTMENT_COUNT',
    ERR_LAB_APPOINTMENT_COUNT = 'ERR_LAB_APPOINTMENT_COUNT',

    REQ_DOCTOR_APPOINTMENT_COUNT = 'REQ_DOCTOR_APPOINTMENT_COUNT',
    RES_DOCTOR_APPOINTMENT_COUNT = 'RES_DOCTOR_APPOINTMENT_COUNT',
    ERR_DOCTOR_APPOINTMENT_COUNT = 'ERR_DOCTOR_APPOINTMENT_COUNT',

    REQ_CONVERSATION_COUNT = 'REQ_CONVERSATION_COUNT',
    RES_CONVERSATION_COUNT = 'RES_CONVERSATION_COUNT',
    ERR_CONVERSATION_COUNT = 'ERR_CONVERSATION_COUNT',

    REQ_PRESCRIPTION_COUNT = 'REQ_PRESCRIPTION_COUNT',
    RES_PRESCRIPTION_COUNT = 'RES_PRESCRIPTION_COUNT',
    ERR_PRESCRIPTION_COUNT = 'ERR_PRESCRIPTION_COUNT',
  }

  // export interface IActionDashboard extends Action {
  //   payload: any
  //   type: ATypes & Auth.ATypes.AUTH_LOGOUT
  // }
}
