import { useState, useEffect } from 'react'
import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  MicrophoneAudioTrackInitConfig,
  CameraVideoTrackInitConfig,
  IMicrophoneAudioTrack,
  ICameraVideoTrack,
  ILocalVideoTrack,
  ILocalAudioTrack,
} from 'agora-rtc-sdk-ng'

export default function useAgoraVideo(client: IAgoraRTCClient | undefined): {
  localAudioTrack: ILocalAudioTrack | undefined
  localVideoTrack: ILocalVideoTrack | undefined
  joinState: boolean
  leave: Function
  join: (
    channel: string,
    token?: string,
    uid?: string | number | null
  ) => Promise<void>
  remoteUsers: IAgoraRTCRemoteUser[]
} {
  const [localVideoTrack, setLocalVideoTrack] = useState<
    ILocalVideoTrack | undefined
  >(undefined)
  const [localAudioTrack, setLocalAudioTrack] = useState<
    ILocalAudioTrack | undefined
  >(undefined)

  const [joinState, setJoinState] = useState(false)

  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([])

  async function createLocalTracks(
    audioConfig?: MicrophoneAudioTrackInitConfig,
    videoConfig?: CameraVideoTrackInitConfig
  ): Promise<[IMicrophoneAudioTrack, ICameraVideoTrack]> {
    const [microphoneTrack, cameraTrack] =
      await AgoraRTC.createMicrophoneAndCameraTracks(audioConfig, videoConfig)
    setLocalAudioTrack(microphoneTrack)
    setLocalVideoTrack(cameraTrack)
    return [microphoneTrack, cameraTrack]
  }

  async function join(
    channel: string,
    token?: string,
    uid?: string | number | null
  ) {
    if (!client) return
    const [microphoneTrack, cameraTrack] = await createLocalTracks()
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
      await client.publish([microphoneTrack, cameraTrack])

      if (typeof Window !== 'undefined') {
        ;(window as any).client = client
        ;(window as any).videoTrack = cameraTrack
      }

      setJoinState(true)
    }
  }

  async function leave() {
    if (localAudioTrack) {
      localAudioTrack.stop()
      localAudioTrack.close()
    }
    if (localVideoTrack) {
      localVideoTrack.stop()
      localVideoTrack.close()
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
      // user.audioTrack?.play()
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers))
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
    client.on('user-joined', handleUserJoined)
    client.on('user-left', handleUserLeft)

    return () => {
      client.off('user-published', handleUserPublished)
      client.off('user-unpublished', handleUserUnpublished)
      client.off('user-joined', handleUserJoined)
      client.off('user-left', handleUserLeft)
    }
  }, [client])

  return {
    localAudioTrack,
    localVideoTrack,
    joinState,
    leave,
    join,
    remoteUsers,
  }
}
