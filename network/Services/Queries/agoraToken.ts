import {
  GET_AGORA_RTC_TOKEN_ENDPOINT,
  GET_AGORA_RTM_TOKEN_ENDPOINT,
} from 'network/config/endpoints'
import api from 'network/config/api'

export const getAgoraRtmTokenService = async () => {
  const response = await api.post(GET_AGORA_RTM_TOKEN_ENDPOINT, { type: 'rtm' })
  return response
}

export const getAgoraRtcTokenService = async (channelName: string) => {
  const response = await api.post(
    `${GET_AGORA_RTC_TOKEN_ENDPOINT}?channelName=${channelName}`,
    {}
  )
  return response
}
