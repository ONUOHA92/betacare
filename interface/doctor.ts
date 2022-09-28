export interface IUpdateDoctorProfile {
  id?: number
  firstName?: string
  lastName?: string
  displayName?: string
  phoneNumber?: string
  gender?: any
  imageUrl?: any
  address?: any
  speciality?: string
  qualification?: string
  bio?: any
  age?: number
  hospital?: any
  location?: any
  dateOfBirth?: any
  duration?: number
  appointmentCost?: number
  freeConsultation?: boolean
  practiceNumber?: string
}

export interface DoctorProfile {
  id?: number
  firstName?: string
  lastName?: string
  displayName?: string
  phoneNumber?: string
  gender?: any
  profilePics?: any
  address?: any
  speciality?: string
  qualification?: string
  bio?: any
  age?: number
  hospital?: any
  location?: any
  dateOfBirth?: any
  duration?: number
  appointmentCost?: number
  freeConsultation?: boolean
  practiceNumber?: string
}

export interface IUpdateProfileResponse {
  message: string
}
