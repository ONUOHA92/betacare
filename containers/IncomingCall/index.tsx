import BlankCardModal from 'components/BlankCardModal'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from './style.module.css'
import noProfile from 'public/images/no-profile.svg'
import Join from 'public/images/Join.svg'
import Exit from 'public/images/Exit.svg'
import Image from 'next/image'
import { client, IMetadata } from 'utils/agora-rtm-client'
import { agoraClient } from 'utils/agora-rtc-client'
import useAgoraVoice from 'hooks/useAgoraVoice'
import { RemoteInvitation } from 'agora-rtm-sdk'
import { useRecoilValue } from 'recoil'
import { userAtom } from 'recoilStore/Atoms/userAtom'
import { patient_routes, routes_doctor } from 'utils/routes'
import { useCall } from 'hooks/useCall'

const IncomingCall = ({ incomingCall = false, setIncomingCall = () => {} }) => {
  const [show, setShow] = useState(false)
  const [noClose, setNoClose] = useState(true)
  const { localAudioTrack, leave, join, joinState, remoteUsers } =
    useAgoraVoice(agoraClient)
  // console.log('INCOMING CALL MOUNT')
  const [callInvitation, setCallInvitation] = useState<RemoteInvitation>(null)
  const [callState, callDispatch] = useCall()
  const [incomingCallMetadata, setIncomingCallMetadata] =
    useState<IMetadata>(null)
  const user = useRecoilValue(userAtom)
  const router = useRouter()

  useEffect(() => {
    client.on('RemoteInvitationReceived', (invitation) => {
      console.log('Incoming call modal', invitation)
      console.log(
        `Remote invitation received by Incoming call modal: ${invitation.channelId}`
      )
      const callMetadata = JSON.parse(invitation.content)
      setIncomingCallMetadata(callMetadata)
      setCallInvitation(invitation)
      setShow(true)
    })
    return () => {
      client.off('RemoteInvitationReceived', (invitation) => {
        console.log('Incoming call modal', invitation)
        console.log(
          `Remote invitation received by Incoming call modal: ${invitation.channelId}`
        )
      })
    }
  }, [])

  const handleJoinCall = () => {
    setShow(false)
    if (callInvitation) {
      callInvitation.accept()
      if (user.roles[0] === 'ROLE_PATIENT') {
        callDispatch({
          type: 'ACCEPT_CALL',
          payload: {
            channelId: callInvitation.channelId,
            userId: user.id.toString(),
            callMetadata: incomingCallMetadata,
          },
        })
        router.push(patient_routes.MESSAGES)
      } else {
        callDispatch({
          type: 'ACCEPT_CALL',
          payload: {
            channelId: callInvitation.channelId,
            userId: user.id.toString(),
            callMetadata: incomingCallMetadata,
          },
        })
        router.push(routes_doctor.DOCTORS_MESSAGES)
      }
    }
  }

  const handleLeaveCall = () => {
    setShow(false)
    leave()
  }

  return (
    <BlankCardModal
      noClose={noClose}
      open={show}
      bg="transparent"
      hg="90%"
      wd="90%"
      bx="none"
    >
      <div className={styles.incomingCall}>
        <div className={styles.incomingCall__header}>
          <p className={styles.incomingCall__header__title}>Incoming call</p>
        </div>
        <div className={styles.incomingCall__body}>
          <Image
            src={incomingCallMetadata?.caller.profilePics || noProfile}
            alt="no profile"
            width={250}
            height={250}
          />
          <p
            className={styles.incomingCall__body__text}
          >{`${incomingCallMetadata?.caller.firstName} ${incomingCallMetadata?.caller.lastName}`}</p>
        </div>
        <div className={styles.incomingCall__footer}>
          <Image
            src={Join}
            alt="join"
            width={100}
            height={100}
            onClick={handleJoinCall}
          />
          <Image
            src={Exit}
            alt="exit"
            width={100}
            height={100}
            onClick={handleLeaveCall}
          />
        </div>
      </div>
    </BlankCardModal>
  )
}

export default IncomingCall
