import {
  GET_PATIENT_SIGNUP_LOGS,
  GET_REGISTERED_DOCTORS_COUNT,
  GET_REGISTERED_PATIENTS_COUNT,
  GET_REGISTERED_PHARMACIES_COUNT,
  GET_REGISTERED_LABORATORIES_COUNT,
  GET_REGISTERED_SUB_ADMINS_COUNT,
} from 'network/config/queryKeys'
import {
  usePatientSignupService,
  getRegisteredDoctorCountService,
  getRegisteredPatientCountService,
  getRegisteredPharmacyCountService,
  getRegisteredLaboratoryCountService,
  getRegisteredSubAdminCountService,
} from 'network/Services/Queries/admin'
import { useQuery } from 'react-query'
import { useState } from 'react'

export const useGetPatientSignupLogs = (page: number) => {
  const [patientSignupLogs, setPatientSignupLogs] = useState(null)
  const [patientSignupLogsError, setPatientSignupLogsError] = useState(null)
  const getPatientSignupLogs = usePatientSignupService()
  const getPatientSignupLogsQuery = useQuery<any, Error>(
    GET_PATIENT_SIGNUP_LOGS,
    () => getPatientSignupLogs(page),

    {
      onSuccess: (data: any) => {
        setPatientSignupLogs(data?.data)
      },
      onError: (error: any) => {
        setPatientSignupLogsError(error?.request)
      },
    }
  )
  const { status, refetch } = getPatientSignupLogsQuery
  return {
    patientSignupLogs,
    patientSignupLogsError,
    status,
    refetchPatientSignupLogs: refetch,
  }
}

export const useRegisteredDoctorCount = () => {
  const getRegisteredDoctorCountQuery = useQuery<any, Error>(
    GET_REGISTERED_DOCTORS_COUNT,
    getRegisteredDoctorCountService
  )
  const { data, status, refetch } = getRegisteredDoctorCountQuery
  return {
    registeredDoctorCount: data?.data.total,
    status,
    refetchRegisteredDoctorCount: refetch,
  }
}

export const useRegisteredPatientCount = () => {
  const getRegisteredPatientCountQuery = useQuery<any, Error>(
    GET_REGISTERED_PATIENTS_COUNT,
    getRegisteredPatientCountService
  )
  const { data, status, refetch } = getRegisteredPatientCountQuery
  return {
    registeredPatientCount: data?.data.total,
    status,
    refetchRegisteredPatientCount: refetch,
  }
}

export const useRegisteredPharmacyCount = () => {
  const getRegisteredPharmacyCountQuery = useQuery<any, Error>(
    GET_REGISTERED_PHARMACIES_COUNT,
    getRegisteredPharmacyCountService
  )
  const { data, status, refetch } = getRegisteredPharmacyCountQuery
  return {
    registeredPharmacyCount: data?.data.total,
    status,
    refetchRegisteredPharmacyCount: refetch,
  }
}

export const useRegisteredLaboratoryCount = () => {
  const getRegisteredLaboratoryCountQuery = useQuery<any, Error>(
    GET_REGISTERED_LABORATORIES_COUNT,
    getRegisteredLaboratoryCountService
  )
  const { data, status, refetch } = getRegisteredLaboratoryCountQuery
  return {
    registeredLaboratoryCount: data?.data.total,
    status,
    refetchRegisteredLaboratoryCount: refetch,
  }
}

export const useRegisteredSubAdminCount = () => {
  const getRegisteredSubAdminCountQuery = useQuery<any, Error>(
    GET_REGISTERED_SUB_ADMINS_COUNT,
    getRegisteredSubAdminCountService
  )
  const { data, status, refetch } = getRegisteredSubAdminCountQuery
  return {
    registeredSubAdminCount: data?.data.total,
    status,
    refetchRegisteredSubAdminCount: refetch,
  }
}
