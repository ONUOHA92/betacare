import { FunctionComponent, useEffect } from 'react'
import VisualComponent from 'componentsDoctors/VisualComponent'
import { sendLocalInvitation, IMetadata } from 'utils/agora-rtm-client'
import { agoraClient, client } from 'utils/agora-rtc-client'
import useAgoraVoice from 'hooks/useAgoraVoice'
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

const AudioCall = ({
  calleeId,

  endSession,
  caller,
}: {
  calleeId: any
  caller: ICaller

  endSession: () => void
}) => {
  const [callState, callDispatch] = useCall()
  const { id } = useRecoilValue(userAtom)
  let channelName: string = 'Beta'

  const { agoraRtcToken } = useAgoraRtcToken(channelName)
  const token: string = agoraRtcToken?.data?.message

  const { localAudioTrack, leave, join, joinState, remoteUsers } =
    useAgoraVoice(agoraClient)

  useEffect(() => {
    if (token) {
      if (callState.callState === 'calling') {
        handleSendInvitation(calleeId, token, id, join, 'audio', caller)
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
      mode="audio"
      audioTrack={localAudioTrack}
      remoteUsers={remoteUsers}
      leave={leave}
      endSession={endSession}
    />
  )
}

export default AudioCall
