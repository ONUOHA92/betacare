export interface ISignUpDoctors {
    id?: number
    firstName?: string
    lastName?: string
    email?: string
    password?: string
    phoneNumber?: string
    language?: string
    platform?: string
    dateOfBirth?: string
    qualification?: string
    practiceNumber?: number | string
    areaOfSpecialization?: string
    curriculumVitae?: string
    validLicense?: string
    validMeansOfIdentification?: string
    gender?: string
    freeConsultation?: string | boolean
  }


  export interface ISuccess {
    message: string
  }

