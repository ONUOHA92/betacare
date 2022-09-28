import { FunctionComponent, useEffect } from 'react'
import VisualComponent from 'componentsDoctors/VisualComponent'
import { sendLocalInvitation, IMetadata } from 'utils/agora-rtm-client'
import { agoraClient, client } from 'utils/agora-rtc-client'
import useAgoraVideo from 'hooks/useAgoraVideo'
import { useRecoilValue } from 'recoil'
import { userAtom } from 'recoilStore/Atoms/userAtom'
import { useAgoraRtcToken } from 'network/ReactQuery/Queries/ChatMessages/agoraToken'
import { toast } from 'react-toastify'
import { useCall } from 'hooks/useCall'

interface ICaller {
  firstName: string
  lastName: string
  profilePics: string
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
        console.log('FAILURE', reason)
        if (reason === 'PEER_OFFLINE') {
          toast.error('The user you are trying to call is offline')
        } else {
          toast.error('Call failed, please logout and try again')
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

const VideoCall = ({
  calleeId,
  endSession,
  caller,
}: {
  calleeId: string
  caller: ICaller
  endSession: () => void
}) => {
  const [callState, callDispatch] = useCall()
  const { id } = useRecoilValue(userAtom)

  let channelName: string = 'Beta'
  //   console.log('channelName', channelName)

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
    if (token) {
      if (callState.callState === 'calling') {
        handleSendInvitation(calleeId, token, id, join, 'video', caller)
        callDispatch({ type: 'JOINED_CALL' })
      } else if (callState.callState === 'joining') {
        handleJoinCall('Beta', token, callState.userId, join)
        callDispatch({ type: 'JOINED_CALL' })
      } else {
        console.log('RETURNING TO CALL SCREEN')
      }
    }
  }, [token, callState])

  return (
    <VisualComponent
      mode="video"
      audioTrack={localAudioTrack}
      videoTrack={localVideoTrack}
      remoteUsers={remoteUsers}
      leave={leave}
      caller={caller}
      endSession={endSession}
    />
  )
}

export default VideoCall
