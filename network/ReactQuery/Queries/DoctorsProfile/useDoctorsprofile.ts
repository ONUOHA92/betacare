import React, { useState } from 'react'
import {
  getDoctorsProfileService,
  useDoctorInHouseService,
  getSingleDoctorProfileService,
} from 'network/Services/Queries/doctorsprofile'
import { DoctorProfile } from 'interface/doctor'
import { useQuery } from 'react-query'
import {
  GET_DOCTOR_PROFILE_KEY,
  GET_ALL_DOCTORS,
  GET_DOCTOR_PROFILE,
} from 'network/config/queryKeys'

export const useGetDoctorProfile = () => {
  const [doctorsProfile, setDoctorsProfile] = useState<null | {
    data: DoctorProfile
  }>(null)
  const [doctorsProfileError, setDoctorsProfileError] = useState('')
  const { isLoading, refetch } = useQuery<any, Error>(
    GET_DOCTOR_PROFILE_KEY,
    getDoctorsProfileService,
    {
      onSuccess: (data) => {
        setDoctorsProfile(data)
      },
      onError: (error: any) => {
        console.log(error)
        setDoctorsProfileError(error?.request)
      },
    }
  )

  return {
    doctorsProfile,
    isLoading,
    doctorsProfileError,
    refetchDoctorProfile: refetch,
  }
}

export const useGetAllDoctors = (page: number) => {
  const getAllDoctors = useDoctorInHouseService()
  const totalDoctorsQuery = useQuery<any, Error>(GET_ALL_DOCTORS, () =>
    getAllDoctors(page)
  )
  const { data, status, refetch } = totalDoctorsQuery

  return {
    allDoctors: data?.data,
    status,
    refetchAllDoctors: refetch,
  }
}

export const useSingleDoctorProfile = (id: number) => {
  const getDoctorQuery = useQuery<any, Error>(
    GET_DOCTOR_PROFILE,
    () => getSingleDoctorProfileService(id),
    {
      cacheTime: 0,
    }
  )

  const { data, status, refetch } = getDoctorQuery

  return {
    singleDoctorProfile: data?.data,
    status,
    refetchSingleDoctorProfile: refetch,
  }
}
