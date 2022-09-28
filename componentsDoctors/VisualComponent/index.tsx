import { useState, useEffect, useRef } from 'react'
import styles from './style.module.css'
import Image from 'next/image'
import Button from '../Button'
import smallDoctor from 'public/images/mock/small_doctor.jpg'
import smallFamily from 'public/images/mock/mother_and_daughter.jpg'
import Avatar from '@mui/material/Avatar'
import { useCallState } from 'context/callContext'
import ChatBox from 'containers/ChatBox'
import { getBg } from 'utils/messaging/getEllipseBackground'
import {
  ILocalVideoTrack,
  IRemoteVideoTrack,
  ILocalAudioTrack,
  IRemoteAudioTrack,
  IAgoraRTCRemoteUser,
} from 'agora-rtc-sdk-ng'
import Svg from 'components/Line'
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined'
import VideocamOffOutlinedIcon from '@mui/icons-material/VideocamOffOutlined'
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined'
import MicOffOutlinedIcon from '@mui/icons-material/MicOffOutlined'

// import MediaPlayer from 'components/MediaPlayer'
interface ICaller {
  firstName: string
  lastName: string
  profilePics: string
}
interface Props {
  containerWidth?: string
  containerHeight?: string
  imageWidth?: string
  imageHeight?: string
  video?: boolean
  moveTop?: boolean
  toggleChatWhileOnCall?: Function
  startVoiceCall?: boolean
  endSession?: Function
  mode?: 'audio' | 'video'
  audioTrack?: ILocalAudioTrack
  videoTrack?: ILocalVideoTrack
  remoteUsers?: IAgoraRTCRemoteUser[]
  leave?: Function
  currentChat?: any
  caller?: ICaller
}
type MediaPlayerProps = {
  audioTrack?: ILocalAudioTrack
  videoTrack?: ILocalVideoTrack
  remoteAudioTrack?: IRemoteAudioTrack
  remoteVideoTrack?: IRemoteVideoTrack
  isLocalTrack?: boolean
}

const MediaPlayer = ({
  audioTrack,
  videoTrack,
  remoteAudioTrack,
  remoteVideoTrack,
}: MediaPlayerProps) => {
  const container = useRef<HTMLDivElement>(null)
  console.log('audioTrack', audioTrack)
  console.log('videoTrack', videoTrack)
  console.log('remoteVideoTrack', remoteVideoTrack)
  useEffect(() => {
    console.log('videotrack-useEffect', videoTrack)
    console.log('remoteVideoTrack-useEffect', remoteVideoTrack)
    if (!container.current) return
    videoTrack?.play(container.current)

    remoteVideoTrack?.play(container.current)
    return () => {
      console.log('removeEEEEEEE')
      videoTrack?.stop()
      remoteVideoTrack?.stop()
    }
  }, [container, videoTrack, remoteVideoTrack])
  useEffect(() => {
    if (remoteAudioTrack) {
      audioTrack?.play()
      remoteAudioTrack?.play()
    }
    return () => {
      audioTrack?.stop()
      remoteAudioTrack?.stop()
    }
  }, [audioTrack, remoteAudioTrack])
  return <div className={styles.mediaPlayer} ref={container}></div>
}

const VisualComponent = ({
  endSession,
  mode,
  audioTrack,
  videoTrack,
  remoteUsers,
  leave,
  currentChat,
}: React.PropsWithChildren<Props>) => {
  const [isChatEnabled, setIsChatEnabled] = useState(false)
  const [switchImage, setSwitchImage] = useState(false)
  const [audioMute, setAudioMute] = useState(false)
  const [videoMute, setVideoMute] = useState(false)
  const [showVideoThumbnail, setShowVideoThumbnail] = useState(false)

  const handleToggleMute = () => {
    console.log('handleAudio', audioTrack)
    if (audioTrack?.enabled) {
      audioTrack.setEnabled(false)
      setAudioMute(false)
    } else {
      audioTrack?.setEnabled(true)
      setAudioMute(true)
    }
  }

  const handleToggleVideo = () => {
    // console.log('handleVideo', videoTrack)
    // setShowVideoThumbnail(!showVideoThumbnail)
    if (videoTrack?.enabled) {
      setShowVideoThumbnail(true)
      videoTrack.setEnabled(false)
      setVideoMute(false)
    } else {
      setShowVideoThumbnail(false)
      videoTrack?.setEnabled(true)
      setVideoMute(true)
    }
  }

  return (
    <>
      <div
        className={`${styles.container} ${
          mode === 'video' ? styles.vidCallContainer : ''
        } ${mode === 'audio' ? styles.adjustContainer : ''} `}
        style={{ width: '870px' }}
      >
        <div className={`${!switchImage ? styles.smallD : ''}`}>
          <div className={`${!switchImage ? '' : styles.doctorBox}`}>
            {mode === 'audio' && (
              <Image
                src={""}
                alt="receivers's image"
                width={150}
                height={150}
                className={`${styles.smallDImg} ${
                  mode === 'audio' ? styles.roundAvatar : ''
                }`}
              />
            )}

            {mode === 'video' && (
              <div
                className={`${
                  !switchImage && !isChatEnabled
                    ? styles.localTrackVideo
                    : styles.localTrackVideoSwitch
                }`}
                onClick={() => {
                  if (switchImage) setSwitchImage(false)
                }}
              >
                {showVideoThumbnail && (
                  <img
                    src="/images/drugImg.svg"
                    className={styles.specialImg}
                    alt="bleh"
                  />
                )}

                <MediaPlayer audioTrack={audioTrack} videoTrack={videoTrack} />
              </div>
            )}
          </div>
          {mode === 'video' && (
            <div
              className={`  ${
                isChatEnabled && !switchImage ? styles.moveImageTop : ''
              } ${!switchImage && !isChatEnabled ? styles.smallF : ''}
              ${switchImage && !isChatEnabled ? styles.localTrackVideo : ''}
            ${styles.smallBox}`}
              onClick={() => {
                setSwitchImage(true)
              }}
            >
              <img
                src="/images/drugImg.svg"
                className={`${styles.specialImage}`}
                alt="bleh"
              />

              {remoteUsers &&
                remoteUsers.map((remoteUser, i) => {
                  const remoteAudioTrack = remoteUser.audioTrack
                  const remoteVideoTrack = remoteUser.videoTrack
                  console.log('remoteVideoTrack', remoteVideoTrack)
                  return (
                    <MediaPlayer
                      key={i}
                      remoteAudioTrack={remoteAudioTrack}
                      remoteVideoTrack={remoteVideoTrack}
                    />
                  )
                })}
            </div>
          )}
        </div>
        <div
          className={`${styles.icons} ${
            mode === 'video' ? styles.adjustPadd : ''
          }`}
        >
          <div
            className={`${styles.svg} ${
              mode === 'video' ? styles.svgAdjust : ''
            }`}
            onClick={handleToggleMute}
          >
            {audioMute ? <MicOffOutlinedIcon /> : <MicNoneOutlinedIcon />}
          </div>
          {mode === 'video' && (
            <div
              className={`${styles.svg} ${
                mode === 'video' ? styles.svgAdjust : ''
              }`}
              onClick={handleToggleVideo}
            >
              {videoMute ? (
                <VideocamOffOutlinedIcon />
              ) : (
                <VideocamOutlinedIcon />
              )}
            </div>
          )}
          {/* TO BE IMPLEMENTED LATER */}
          {/* <div
            className={`${styles.svg} ${
              mode === 'video' ? styles.svgAdjust : ''
            }`}
            onClick={() => setIsChatEnabled(!isChatEnabled)}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 30 30"
              style={{ width: '21.61px' }}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 9C17.514 9 22 12.685 22 17.213C22 22.253 16.854 25.372 12.087 25.372C10.06 25.372 8.539 24.933 7.539 24.66L3.535 25.856L4.787 22.956C3.835 21.956 2 20.368 2 17.213C2 12.685 6.486 9 12 9ZM12 7C5.372 7 0 11.573 0 17.213C0 19.603 0.932 21.804 2.427 23.377L0 29L7.563 26.74C9.148 27.174 10.664 27.372 12.086 27.372C19.184 27.373 24 22.441 24 17.213C24 11.573 18.628 7 12 7Z"
                fill="#333333"
              />
              <g filter="url(#filter0_b_0_1)">
                <rect x="24" width="6" height="6" rx="3" fill="#E82121" />
              </g>
              <defs>
                <filter
                  id="filter0_b_0_1"
                  x="-16"
                  y="-40"
                  width="86"
                  height="86"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImage" stdDeviation="20" />
                  <feComposite
                    in2="SourceAlpha"
                    operator="in"
                    result="effect1_backgroundBlur_0_1"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_backgroundBlur_0_1"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </div> */}
          <div
            className={`${styles.svg} ${
              mode === 'video' ? styles.svgAdjust : ''
            } ${styles.red}`}
            onClick={() => {
              leave()
              endSession()
            }}
          >
            <Svg
              width="20"
              height="9"
              viewBox="0 0 20 9"
              fill="none"
              d="M19.5521 6.12791L19.3613 7.12391C19.1849 8.05511 18.3125 8.68151 17.3249 8.58551L15.3605 8.39591C14.5037 8.31311 13.8689 7.68791 13.6001 6.79991C13.2353 5.59391 13.0001 4.69991 13.0001 4.69991C12.0526 4.29384 11.0309 4.0895 10.0001 4.09991C8.7833 4.09991 7.9145 4.35791 7.0001 4.69991C7.0001 4.69991 6.7553 5.59511 6.4001 6.79991C6.1625 7.60391 5.7953 8.30831 4.9565 8.39231L3.0029 8.58911C2.52717 8.63479 2.0502 8.51541 1.65208 8.25101C1.25396 7.98662 0.958923 7.59331 0.816496 7.13711L0.518896 6.14231C0.3714 5.6667 0.357996 5.15962 0.480161 4.67689C0.602326 4.19416 0.855322 3.7545 1.2113 3.40631C2.9213 1.74551 5.9993 0.809506 9.9905 0.804706C13.9889 0.799906 16.7033 1.73111 18.5849 3.39191C19.3769 4.09031 19.7393 5.14151 19.5509 6.12791H19.5521Z"
              pathFill="white"
            />
          </div>
        </div>
      </div>
      {isChatEnabled && (
        <ChatBox
          getBg={getBg}
          currentChat={currentChat}
          // triggerVoiceCall={triggerVoiceCall}
          // triggerVideoCall={triggerVideoCall}
        />
      )}
    </>
  )
}

export default VisualComponent
