import {
  ISuccess,
  IAddDoctorsRequestALL,
} from 'interface/doctorsrequestappointment'

export const doctorsRequestSucess: ISuccess | null = {
  message: '',
}

export const doctorRequestCredential: IAddDoctorsRequestALL | null = {
  page: 0,
  size: 1,
  sort: [''],
}
