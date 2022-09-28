import { useState, useEffect } from 'react'
import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  MicrophoneAudioTrackInitConfig,
  IMicrophoneAudioTrack,
  ILocalAudioTrack,
} from 'agora-rtc-sdk-ng'

export default function useAgoraVoice(client: IAgoraRTCClient | undefined): {
  localAudioTrack: ILocalAudioTrack | undefined
  joinState: boolean
  leave: Function
  join: (
    channel: string,
    token?: string,
    uid?: string | number | null
  ) => Promise<void>
  remoteUsers: IAgoraRTCRemoteUser[]
} {
  const [localAudioTrack, setLocalAudioTrack] = useState<
    IMicrophoneAudioTrack | undefined
  >(undefined)

  const [joinState, setJoinState] = useState(false)

  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([])

  async function createLocalTracks(
    audioConfig?: MicrophoneAudioTrackInitConfig
  ): Promise<IMicrophoneAudioTrack> {
    const microphoneTrack = await AgoraRTC.createMicrophoneAudioTrack(
      audioConfig
    )
    setLocalAudioTrack(microphoneTrack)

    return microphoneTrack
  }

  AgoraRTC.onMicrophoneChanged = async (changedDevice) => {
    if (changedDevice.state === 'ACTIVE') {
      localAudioTrack?.setDevice(changedDevice.device.deviceId)
    } else if (
      changedDevice.device.label === localAudioTrack?.getTrackLabel()
    ) {
      const oldMicrophones = await AgoraRTC.getMicrophones()
      oldMicrophones[0] &&
        localAudioTrack?.setDevice(oldMicrophones[0].deviceId)
    }
    if (!localAudioTrack.enabled) {
      localAudioTrack?.setEnabled(true)
    }
  }

  async function join(
    channel: string,
    token?: string,
    uid?: string | number | null
  ) {
    if (!client) return
    const microphoneTrack = await createLocalTracks()
    console.log('channel', channel)
    console.log('token', token)
    console.log('uid', uid)

    if (
      client.connectionState !== 'CONNECTED' &&
      client.connectionState !== 'CONNECTING'
    ) {
      await client.join(
        '55a224603227407c8429db86f9bc4312',
        channel,
        token || null,
        uid
      )
      await client.publish([microphoneTrack])

      if (typeof Window !== 'undefined') {
        ;(window as any).client = client
      }

      setJoinState(true)
    }
  }

  async function leave() {
    if (localAudioTrack) {
      localAudioTrack.stop()
      localAudioTrack.close()
    }
    setRemoteUsers([])
    setJoinState(false)
    await client?.leave()
  }

  useEffect(() => {
    if (!client) return
    console.log('client', client)
    console.log('remoteUsers', client.remoteUsers)
    setRemoteUsers(client.remoteUsers)

    const handleUserPublished = async (
      user: IAgoraRTCRemoteUser,
      mediaType: 'audio' | 'video'
    ) => {
      await client.subscribe(user, mediaType)
      // toggle rerender while state of remoteUsers changed.
      console.log('handleUserPublished-user', user)
      user.audioTrack?.play()
      setRemoteUsers((remoteUsers) => [...remoteUsers, user])
    }
    const handleUserUnpublished = (user: IAgoraRTCRemoteUser) => {
      console.log('handleUserUnpublished-user', user)
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers))
    }
    const handleUserJoined = (user: IAgoraRTCRemoteUser) => {
      console.log('handleUserJoined-user', user)
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers))
    }
    const handleUserLeft = (user: IAgoraRTCRemoteUser) => {
      console.log('handleUserLeft-user', user)
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers))
    }
    client.on('user-published', handleUserPublished)
    client.on('user-unpublished', handleUserUnpublished)
    // client.on('user-joined', handleUserJoined)
    // client.on('user-left', handleUserLeft)

    return () => {
      client.off('user-published', handleUserPublished)
      client.off('user-unpublished', handleUserUnpublished)
      client.off('user-joined', handleUserJoined)
      client.off('user-left', handleUserLeft)
    }
  }, [client])

  return {
    localAudioTrack,
    joinState,
    leave,
    join,
    remoteUsers,
  }
}
