import { getDoctorsConversationService } from 'network/Services/Queries/conversations'
import { useQuery } from 'react-query'
import { GET_TOTAL_CONVERSATIONS } from 'network/config/queryKeys'

export const useGetDoctorsConversations = () => {
  const totalAppointmentsQuery = useQuery<any, Error>(
    GET_TOTAL_CONVERSATIONS,
    getDoctorsConversationService
  )
  const { data, status, refetch } = totalAppointmentsQuery

  return {
    totalDoctorsConversation: data?.data,
    status,
    refetchTotalDoctorsConversation: refetch,
  }
}
