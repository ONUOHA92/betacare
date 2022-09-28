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

export const client: IAgoraRTCClient = AgoraRTC.createClient({
  mode: 'live',
  codec: 'h264',
})

export const agoraClient: IAgoraRTCClient = AgoraRTC.createClient({
  mode: 'rtc',
  codec: 'vp8',
})

const agoraVoiceOnMicrophoneChangedHandler = (cb) => {
  AgoraRTC.onMicrophoneChanged = async (changedDevice) => {
    cb(changedDevice)
  }
}

const createLocalTrack = async (
  audioConfig?: MicrophoneAudioTrackInitConfig,
  videoConfig?: CameraVideoTrackInitConfig
) => {
  const [microphoneTrack, cameraTrack] =
    await AgoraRTC.createMicrophoneAndCameraTracks(audioConfig, videoConfig)
  return [microphoneTrack, cameraTrack]
}

const channel = 'BetaCare'
// const uid = '4252'
const token =
  '006218dae3913764490b235a8f3fc745fc0IAAXgXKKr7PAOkUf/98hOc2uwvU8AsnPYoxj5CFC1xZB60a3Sb8AAAAAEAAU3oYIA3jgYgEAAQADeOBi'
const appId = '55a224603227407c8429db86f9bc4312'
export const join = async () => {
  if (!client) return
  const [microphoneTrack, cameraTrack] = await createLocalTrack()
  await client.join(channel, appId, token)
  await client.publish(cameraTrack)
  await client.publish(microphoneTrack)
  await client.on('stream-published', (stream: ILocalVideoTrack) => {
    console.log('stream-published', stream)
  })
}

export const leave = async () => {
  await client.leave()
}
