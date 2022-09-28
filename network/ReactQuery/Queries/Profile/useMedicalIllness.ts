import { getPatientIllnessService } from 'network/Services/Queries/profile'
import { useQuery } from 'react-query'
import { GET_PATIENT_ILLNESS } from 'network/config/queryKeys'

export const useMedicalIllness = () => {
  const getIllnessQuery = useQuery<any, Error>(
    GET_PATIENT_ILLNESS,
    getPatientIllnessService
  )

  const { data, status, refetch } = getIllnessQuery

  return {
    patientIllnessByType: data?.data,
    status,
    refetchPatientIllnessByType: refetch,
  }
}
