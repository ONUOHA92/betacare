import { ISignUpDoctors, ISuccess } from 'interface/signupdoctors'

export const SignUpSuccess: ISuccess | null = {
    message: '',
  }
  

export const doctorSignUp: ISignUpDoctors | null = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    language: '',
    platform: '',
    dateOfBirth: '',
    qualification: '',
    practiceNumber: 0 || '',
    areaOfSpecialization: '',
    curriculumVitae: '',
    validLicense: '',
    validMeansOfIdentification: '',
    gender: '',
    freeConsultation: '' || true
}
