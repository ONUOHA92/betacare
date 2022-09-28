import {
  useActivityService,
  useDoctorActivityService,
  useAdminActivityService,
} from 'network/Services/Queries/activity'
import { useQuery } from 'react-query'
import { getSubUserAtom } from '../../../../recoilStore/Atoms/subUserAtom'
import {
  GET_USER_ACTIVITY,
  GET_DOCTOR_ACTIVITY,
  GET_ADMIN_ACTIVITY,
} from 'network/config/queryKeys'

export const useActivity = (page: number) => {
  const getAllActivities = useActivityService()
  const getAllActivitiesQuery = useQuery<any, Error>(GET_USER_ACTIVITY, () =>
    getAllActivities(page)
  )

  const { data, status, refetch } = getAllActivitiesQuery
  return {
    allActivities: data?.data?.content,
    status,
    refetchAllActivities: refetch,
  }
}

export const useDoctorActivity = (page: number) => {
  const getAllActivities = useDoctorActivityService()
  const getAllActivitiesQuery = useQuery<any, Error>(GET_DOCTOR_ACTIVITY, () =>
    getAllActivities(page)
  )

  const { data, status, refetch, isError } = getAllActivitiesQuery
  return {
    allActivities: data?.data?.content,
    status,
    refetchAllActivities: refetch,
  }
}

export const useAdminActivity = (page: number) => {
  const getAllActivities = useAdminActivityService()
  const getAllActivitiesQuery = useQuery<any, Error>(GET_ADMIN_ACTIVITY, () =>
    getAllActivities(page)
  )

  const { data, status, refetch, isError } = getAllActivitiesQuery
  return {
    allActivities: data?.data?.content,
    status,
    refetchAllActivities: refetch,
  }
}
