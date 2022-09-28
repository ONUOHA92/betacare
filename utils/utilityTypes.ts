export enum Status {
  FAILED = 'FAILED',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  IN_PROGRESS = 'IN_PROGRESS',
}
export interface PaginationPageOptions {
  size?: number
  page?: number
  sort?: boolean
}

export type Sort = {
  empty?: boolean
  sorted?: boolean
  unsorted?: boolean
}
export type Pagination = {
  empty?: boolean
  first?: boolean
  last?: boolean
  number?: number
  numberOfElements?: number
  size?: number
  sort?: Sort
  totalElements?: number
  totalPages?: number
}

export enum ROLE_TYPE {
  PATIENT = 'PATIENT',
  DOCTOR = 'DOCTOR',
}

export const specialities = [
  'GENERAL_PRACTITIONER',
  'GYNAECOLOGIST',
  'PAEDIATRICIAN',
  'ONCOLOGIST',
  'THERAPIST',
  'ORTHODONTIST',
  'OCULIST',
  'PSYCHIATRIST',
  'ENT',
  'DENTIST',
  'ORTHOPAEDIC_SURGEON',
]

export const specialitiesWithAll = [
  'ALL',
  'GENERAL_PRACTITIONER',
  'GYNAECOLOGIST',
  'PAEDIATRICIAN',
  'ONCOLOGIST',
  'THERAPIST',
  'ORTHODONTIST',
  'OCULIST',
  'PSYCHIATRIST',
  'ENT',
  'DENTIST',
  'ORTHOPAEDIC_SURGEON',
]
