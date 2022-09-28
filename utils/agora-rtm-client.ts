import AgoraRTM, { RemoteInvitation } from 'agora-rtm-sdk'

export const client = AgoraRTM.createInstance(
  '55a224603227407c8429db86f9bc4312',
  {
    enableLogUpload: false,
  }
)

export const rtmLogin = async (id: string, token: string) => {
  if (typeof window !== 'undefined') {
    client
      .login({
        uid: id,
        token: token,
      })
      .then((val) => {
        console.log('logged in @ ', val)
        sessionStorage.setItem('agoraLogin', JSON.stringify(true))
      })
      .catch((err) => {
        console.log('login error @ ', err)
      })
  }
}
export const rtmLogout = async () => {
  if (client) {
    await client?.logout()
  }

  console.log('logged out')
}

export const queryPeerOnlineStatus = async (peerIds) => {
  console.log('queryPeerOnlineStatus-peerIds', peerIds)
  const isOnline = await client.queryPeersOnlineStatus([peerIds])
  if (isOnline) {
    console.log('Online')
  } else {
    console.log('Offline')
  }
}

export interface IMetadata {
  modeOfCall: 'audio' | 'video'
  caller: {
    firstName: string
    lastName: string
    profilePics: string
  }
}

// Create LocalInvitation
const localInvitation = async (
  calleeId: string,
  channelId: string,
  metadata: IMetadata
) => {
  const invitation = await client.createLocalInvitation(calleeId)
  invitation.content = JSON.stringify(metadata)
  invitation.channelId = channelId
  return invitation
}
// Send LocalInvitation
export const sendLocalInvitation = async (
  calleeId: string,
  channelId: string,
  metadata: IMetadata
) => {
  const invitation = await localInvitation(calleeId, channelId, metadata)
  await invitation.send()
  return invitation
}

client.on('RemoteInvitationReceived', (remoteInvitation: RemoteInvitation) => {
  console.log(`Remote invitation received: ${remoteInvitation.callerId}`)
})

// @ts-ignore
client.on('LocalInvitationCanceled', (invitation: RemoteInvitation) => {
  console.log(`Local invitation canceled: ${invitation.channelId}`)
})

// @ts-ignore
client.on('RemoteInvitationReceived', (invitation: RemoteInvitation) => {
  console.log(`Remote invitation received: ${invitation.channelId}`)
})
