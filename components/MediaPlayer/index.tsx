import {
  ILocalAudioTrack,
  ILocalVideoTrack,
  IRemoteAudioTrack,
  IRemoteVideoTrack,
} from 'agora-rtc-sdk-ng'
import React from 'react'
import styles from './style.module.css'

type MediaPlayerProps = {
  audioTrack?: ILocalAudioTrack
  videoTrack?: ILocalVideoTrack
  remoteAudioTrack?: IRemoteAudioTrack
  remoteVideoTrack?: IRemoteVideoTrack
}
const MediaPlayer = ({
  audioTrack,
  videoTrack,
  remoteAudioTrack,
  remoteVideoTrack,
}: MediaPlayerProps) => {
  return <div className={styles.mediaPlayer}>MediaPlayer</div>
}

export default MediaPlayer
