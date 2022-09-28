export interface IDoctorsProfile {
  id?: number
  firstName?: string
  lastName?: string
  phoneNumber?: string
  gender?: string
  email?: string
  profilePics?: any
  address?: any
  speciality?: string
  qualification?: string
  bio?: any
  appointmentCost?: number
  age?: number
  duration?: number
  hospital?: any
  location?: any
  dateOfBirth?: string
  curriculumVitae?: any
  validLicense?: any
  validMeansOfIdentification?: any
  experienceYear?: number
  practiseNumber?: number
  patientInteractionCount?: number
  freeConsultation?: boolean
}

export interface ISuccess {
  message: string
}

export interface ISearchDoctors {
  page: number
  searchText: string
}
