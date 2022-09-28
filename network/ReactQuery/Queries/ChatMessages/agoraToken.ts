import { useQuery } from 'react-query'
import { GET_AGORA_RTC_TOKEN } from 'network/config/queryKeys'
import {
  getAgoraRtcTokenService,
  getAgoraRtmTokenService,
} from 'network/Services/Queries/agoraToken'

export const useAgoraRtcToken = (channelName: string) => {
  const getAgoraRtcToken = getAgoraRtcTokenService(channelName)
  const getAgoraRtcTokenQuery = useQuery<any, Error>(
    GET_AGORA_RTC_TOKEN,
    () => getAgoraRtcToken,
    {
      staleTime: Infinity,
    }
  )
  const { data, status } = getAgoraRtcTokenQuery
  return {
    agoraRtcToken: data,
    status,
  }
}

export const useAgoraRtmToken = () => {
  const getAgoraRtmTokenQuery = useQuery(
    'agoraRtmToken',
    () => getAgoraRtmTokenService()
    // {
    //   refetchOnWindowFocus: false,
    //   refetchInterval: 1000 * 60 * 60,
    // }
  )
  const { data, status } = getAgoraRtmTokenQuery
  return {
    agoraRtmToken: data,
    status,
  }
}
