/* eslint-disable @next/next/link-passhref */
import React, { useEffect, useState, useContext } from 'react'
import { SocketContext } from 'containers/DashboardLayout'
import ChatList from 'containers/ChatList'
import ChatBox from 'containers/ChatBox'
import styles from './styles.module.css'
import Avatar from '@mui/material/Avatar'
import VisualComponent from 'componentsDoctors/VisualComponent'
import { DOCTOR, PATIENT } from 'constants/constants'
import { getBg } from 'utils/messaging/getEllipseBackground'
import { patientShallowPush } from 'utils/messaging/shallowPush'
import useSocket from 'hooks/useSocket'
import { leaveRoomEmitter } from 'sockets/emitters/leaveRoomEmitter'
import SocketEvents from 'constants/enums/socketEvents'
import { IClient } from 'interface/chat'
import { useProfile } from 'network/ReactQuery/Queries/Profile/useProfile'
import { useCall } from 'hooks/useCall'
import AudioCall from 'components/Call/voice'
import VideoCall from 'components/Call/video'
import { useRouter } from 'next/router'

const PatientMessages = () => {
  const [startVideoCall, setStartVideoCall] = useState(false)
  const [startVoiceCall, setStartVoiceCall] = useState(false)
  const [isJoiningCall, setIsJoiningCall] = useState(false)
  const [isVidChatEnabled, setIsVidChatEnabled] = useState(false)
  const [isSessionActive, setIsSessionActive] = useState(true)
  const [isChatActive, setIsChatActive] = useState(false)
  const router = useRouter()
  const [callState, callDispatch] = useCall()

  const { userProfile } = useProfile()
  const callerInfo: {
    firstName: string
    lastName: string
    profilePics: string
  } = {
    firstName: userProfile?.firstName,
    lastName: userProfile?.lastName,
    profilePics: userProfile?.profilePics,
  }
  const triggerVideoCall = () => {
    patientShallowPush('video', router)
    callDispatch({ type: 'MAKE_VIDEO_CALL' })
    setStartVoiceCall(false)
  }

  const triggerVoiceCall = () => {
    patientShallowPush('voice', router)
    callDispatch({ type: 'MAKE_VOICE_CALL' })
    setStartVideoCall(false)
  }

  const toggleChatWhileOnCall = () => {
    setIsVidChatEnabled(!isVidChatEnabled)
  }

  const endSession = () => {
    setStartVideoCall(false)
    setStartVoiceCall(false)
    setIsSessionActive(false)
    sessionStorage.removeItem('call_session')
  }
  const [currentChat, setCurrentChat] = useState(null)
  const { socket: socketContextData, onlineUsers } = useContext(SocketContext)
  const [chatMessages, chatUsers, sendMsg, id, socket, loggedInUserId] =
    useSocket(socketContextData, currentChat, PATIENT, DOCTOR)
  const selectChat = (chat: IClient) => {
    setIsChatActive(true)
    setCurrentChat((prevState: IClient) => {
      if (prevState && prevState?.id !== chat?.id) {
        leaveRoomEmitter(prevState?.id, socket, SocketEvents, loggedInUserId)
      }
      return chat
    })
  }
  useEffect(() => {
    return () => {
      leaveRoomEmitter(currentChat?.id, socket, SocketEvents, loggedInUserId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChat, socket])
  useEffect(() => {
    if (callState.callState === 'joined' || callState.callState === 'joining') {
      if (callState.callMetadata.modeOfCall === 'audio') {
        setStartVoiceCall(true)
      } else {
        setStartVideoCall(true)
      }
    }
  }, [callState])
  // const [state] = useCallState()
  // console.log('view', state)

  useEffect(() => {
    if (
      callState.callState === 'joined' ||
      callState.callState === 'joining' ||
      callState.callState === 'calling'
    ) {
      if (callState.callMetadata.modeOfCall === 'audio') {
        setStartVoiceCall(true)
      } else {
        setStartVideoCall(true)
      }
    }
  }, [callState])
  return (
    <>
      {!startVideoCall && !startVoiceCall ? (
        <>
          <div className={styles.topTab}>
            <div className={styles.head}>Recent chats</div>
            {/* TO BE IMPLEMENTED - FOLLOW UP CONVERSATION BUTTON
            <div className={styles.moveRight}>
              <Button
                wd="50px"
                hg="50px"
                color="secondary"
                className={styles.presBtn}
              >
                Follow up conversation
              </Button>
            </div> */}
          </div>
          <div className={styles.doctorsTab}>
            {chatUsers &&
              chatUsers?.slice(-3)?.map((doc: any) => (
                <React.Fragment key={doc.id}>
                  <div className={styles.doctorsTabInner}>
                    <Avatar
                      src={doc.profileImage}
                      sx={{ width: 92.05, height: 92.05 }}
                      alt="a doctor with syringe"
                    />
                    <div
                      className={styles.docName}
                    >{`${doc.firstName} ${doc.lastName}`}</div>
                  </div>
                </React.Fragment>
              ))}
          </div>

          <div className={styles.flexBox}>
            <ChatList
              getBg={getBg}
              selectChat={selectChat}
              allUsers={chatUsers}
              id={id}
              onlineUsers={onlineUsers}
              patient={false}
            />
            {isChatActive && (
              <ChatBox
                getBg={getBg}
                triggerVoiceCall={triggerVoiceCall}
                triggerVideoCall={triggerVideoCall}
                isVidChatEnabled={isVidChatEnabled}
                isSessionActive={isSessionActive}
                currentChat={currentChat}
                sendMsg={sendMsg}
                chatMessages={chatMessages}
                socket={socket}
                loggedInUserId={loggedInUserId}
                onlineUsers={onlineUsers}
                patient={false}
              />
            )}
          </div>
        </>
      ) : (
        <div className={styles.flexVidChat}>
          {startVoiceCall && (
            <AudioCall
              calleeId={currentChat?.id}
              endSession={endSession}
              caller={callerInfo}
            />
          )}
          {startVideoCall && (
            <VideoCall
              calleeId={currentChat?.id}
              endSession={endSession}
              caller={callerInfo}
            />
          )}
        </div>
      )}
    </>
  )
}

export default PatientMessages
