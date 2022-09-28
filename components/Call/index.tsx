import { FunctionComponent, useEffect } from 'react'
import { useRouter } from 'next/router'
import VisualComponent from 'componentsDoctors/VisualComponent'
import { sendLocalInvitation, IMetadata } from 'utils/agora-rtm-client'
import { agoraClient, client } from 'utils/agora-rtc-client'
import useAgoraVoice from 'hooks/useAgoraVoice'
import useAgoraVideo from 'hooks/useAgoraVideo'
import { useRecoilValue } from 'recoil'
import { userAtom } from 'recoilStore/Atoms/userAtom'
import { useAgoraRtcToken } from 'network/ReactQuery/Queries/ChatMessages/agoraToken'
import { toast } from 'react-toastify'

interface ICaller {
  firstName: string
  lastName: string
  profilePics: string
}
interface IRealTimeCallProps {
  mode: 'audio' | 'video'
  currentChat?: any
  isJoining?: boolean
  caller: ICaller
  endSession?: () => void
}

const handleSendInvitation = (
  calleeId,
  token,
  id,
  join,
  typeOfCall: 'audio' | 'video',
  caller: ICaller
) => {
  const channelName = 'Beta'
  const metadata: IMetadata = {
    modeOfCall: typeOfCall,
    caller,
  }
  console.log('id', id)
  console.log('calleeId', calleeId)
  console.log('token', token)
  console.log('join', join)
  console.log('typeOfCall', typeOfCall)
  console.log('caller', caller)
  sendLocalInvitation(calleeId.toString(), channelName, metadata)
    .then((invitation) => {
      invitation.on('LocalInvitationReceivedByPeer', () => {
        console.log('SENT from ' + id)
      })
      invitation.on('LocalInvitationFailure', (reason) => {
        if (reason === 'PEER_OFFLINE') {
          toast.error('The user you are trying to call is offline')
        }
      })
      invitation.on('LocalInvitationAccepted', (response) => {
        console.log('ACCEPTED', response)
        join(channelName, token, id.toString())
      })
    })
    .catch((err) => {
      console.log('errrrrrr', err)
    })
}
const handleJoinCall = (channelId, token, userId, join) => {
  console.log('token', token)
  join(channelId, token, userId?.toString())
    .then(() => console.log('JOINED CALL'))
    .catch((err) => console.log('ERROR JOINING', err))
}
const AudioCall = ({
  mode,
  calleeId,
  isJoining,
  endSession,
  caller,
}: {
  mode: 'audio' | 'video'
  calleeId: any
  isJoining: boolean
  caller: ICaller

  endSession: () => void
}) => {
  const { id } = useRecoilValue(userAtom)
  const router = useRouter()
  let channelName: string = 'Beta'

  const { agoraRtcToken } = useAgoraRtcToken(channelName)
  const token: string = agoraRtcToken?.data?.message

  console.log('audio mounted')
  console.log('mode', mode)
  console.log('calleeId', calleeId)
  console.log('isJoining', isJoining)
  const { localAudioTrack, leave, join, joinState, remoteUsers } =
    useAgoraVoice(agoraClient)
  console.log('is-token', token)
  useEffect(() => {
    if (isJoining && token) {
      const parsed = JSON.parse(router.query.data as string)
      console.log('router-parsed', parsed)
      console.log('router-parsed-token', token)
      if (parsed.channelId && parsed.userId) {
        console.log('came to router-parsed')
        handleJoinCall('Beta', token, parsed.userId, join)
      }
    } else if (token) {
      handleSendInvitation(calleeId, token, id, join, 'audio', caller)
    }
  }, [token])
  return (
    <VisualComponent
      mode={mode}
      audioTrack={localAudioTrack}
      remoteUsers={remoteUsers}
      leave={leave}
      endSession={endSession}
    />
  )
}

const VideoCall = ({
  mode,
  calleeId,
  isJoining,
  endSession,
  caller,
  currentChat,
}: {
  mode: 'audio' | 'video'
  calleeId: any
  isJoining: boolean
  caller: ICaller
  endSession: () => void
  currentChat: any
}) => {
  const { id } = useRecoilValue(userAtom)
  const router = useRouter()
  let channelName: string = 'Beta'
  console.log('channelName', channelName)

  const { agoraRtcToken } = useAgoraRtcToken(channelName)
  const token: string = agoraRtcToken?.data?.message

  const {
    localAudioTrack,
    localVideoTrack,
    leave,
    join,
    joinState,
    remoteUsers,
  } = useAgoraVideo(agoraClient)

  // console.log('video')
  // console.log('users', remoteUsers)
  useEffect(() => {
    if (isJoining && token) {
      const parsed = JSON.parse(router.query.data as string)
      console.log('router-parsed')
      if (parsed.channelId && parsed.userId) {
        handleJoinCall('Beta', token, parsed.userId, join)
      }
    } else if (token) {
      handleSendInvitation(calleeId, token, id, join, 'video', caller)
    }
  }, [token])
  console.log('remore-users', remoteUsers)

  return (
    <VisualComponent
      mode={mode}
      audioTrack={localAudioTrack}
      videoTrack={localVideoTrack}
      remoteUsers={remoteUsers}
      leave={leave}
      currentChat={currentChat}
      caller={caller}
      endSession={endSession}
    />
  )
}

const RealTimeCall: FunctionComponent<IRealTimeCallProps> = ({
  mode,
  currentChat,
  isJoining,
  endSession,
  caller,
}) => {
  console.log('call-realtine', caller)
  return mode === 'audio' ? (
    <AudioCall
      mode={mode}
      calleeId={currentChat?.id}
      isJoining={isJoining}
      endSession={endSession}
      caller={caller}
    />
  ) : (
    <VideoCall
      mode={mode}
      calleeId={currentChat?.id}
      isJoining={isJoining}
      endSession={endSession}
      caller={caller}
      currentChat={currentChat}
    />
  )
}

export default RealTimeCall
