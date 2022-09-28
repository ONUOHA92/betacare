import { ISuccess, IDoctorsProfile } from 'interface/doctorsprofile'

export const DoctorsProfleSuccess: ISuccess | null = {
  message: '',
}

export const doctoesProfileCredential: IDoctorsProfile | null = {
  id: 0,
  firstName: '',
  lastName: '',
  phoneNumber: '',
  gender: '',
  email: '',
  profilePics: '',
  address: '',
  speciality: '',
  qualification: '',
  bio: '',
  appointmentCost: 0,
  age: 0,
  duration: 0,
  hospital: '',
  location: '',
  dateOfBirth: '',
  curriculumVitae: '',
  validLicense: '',
  validMeansOfIdentification: '',
  experienceYear: 0,
  practiseNumber: 0,
  patientInteractionCount: 0,
  freeConsultation: false,
}
