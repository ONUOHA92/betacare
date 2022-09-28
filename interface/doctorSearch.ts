export interface ISearchDoctor {
  content: Content[]
  pageable: Pageable
  totalPages: number
  totalElements: number
  last: boolean
  first: boolean
  sort: Sort
  size: number
  number: number
  numberOfElements: number
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
  hospital: null
  location: null
  dateOfBirth: null
  curriculumVitae: null
  validLicense: null
  validMeansOfIdentification: null
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
  empty: boolean
  unsorted: boolean
}
