export interface IFilterDoctorBySpec {
  speciality?: string
}

export interface IFilterDoctorBySpecParams {
  page?: number
  size?: number
  sort?: string[]
}

export interface IFilterDoctorBySpecResponse {
  content: Content[]
  pageable: Pageable
  totalPages: number
  totalElements: number
  last: boolean
  first: boolean
  sort: Sort
  numberOfElements: number
  size: number
  number: number
  empty: boolean
}

export interface Content {
  id: number
  firstName: string
  lastName: string
  phoneNumber: string
  gender: string
  email: string
  profilePics: null | string
  address: null | string
  speciality: string
  qualification: string
  bio: null | string
  appointmentCost: number
  age: number
  duration: number
  hospital: null | string
  location: null | string
  dateOfBirth: null | string
  curriculumVitae: null | string
  validLicense: null | string
  validMeansOfIdentification: null | string
  experienceYear: number
  practiseNumber: string
  patientInteractionCount: number
  freeConsultation: boolean
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
  unsorted: boolean
  empty: boolean
}

export interface DoctorId {
  id: number
}

export interface IBookAppointment {
  appointmentDate: string
  appointmentTime: string
  doctorId: number
}

export interface ICancelAppointment {
  reason: string
  appointmentId: number
}

export interface IDoctorAvailabilityUpdate {
  workday: string
  startWorkTime: string
  endWorkTime: string
}

export interface IDoctorAppointmentUpdate {
  appointmentId: number
  status: string
  reason?: string
}
