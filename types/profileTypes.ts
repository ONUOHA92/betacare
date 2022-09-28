import { User } from 'types/usersTypes'
export namespace Profile {
  export type State = {
    profile: IProfile | null
    profile_status: ActionResponse
  }

  export type ActionResponse = {
    success: boolean
    error: string
    isLoading: boolean
  }

  export interface IProfile {
    id: number
    firstName: string
    lastName: string
    phoneNumber: string
    gender: any
    email: string
    profilePics: any
    address: any
    speciality: string
    qualification: string
    bio: any
    age: number
    hospital: any
    location: any
    dateOfBirth: any
  }

  export enum ATypes {
    DESTROY = 'DESTROY',

    REQ_GET_DOCTOR_PROFILE = 'PROFILE.REQ_GET_DOCTOR_PROFILE',
    RES_GET_DOCTOR_PROFILE = 'PROFILE.RES_GET_DOCTOR_PROFILE',
    ERR_GET_DOCTOR_PROFILE = 'PROFILE.ERR_GET_DOCTOR_PROFILE',
  }

  // export interface IActionProfile extends Action {
  //   payload: any
  //   type: ATypes
  // }
}
