/* eslint-disable @next/next/link-passhref */
import React, { ReactElement, useEffect, useState, useContext } from 'react'
import { SocketContext } from 'containersDoctors/DashboardLayout'
import ChatList from 'containers/ChatList'
import ChatBox from 'containers/ChatBox'
import styles from './styles.module.css'
import Avatar from '@mui/material/Avatar'
import { useRouter } from 'next/router'
import AddNote from 'containers/AddNote'
import { getBg } from 'utils/messaging/getEllipseBackground'
import { shallowPush } from 'utils/messaging/shallowPush'
import useSocket from 'hooks/useSocket'
import { DOCTOR, PATIENT } from 'constants/constants'
import { IClient } from 'interface/chat'
import { leaveRoomEmitter } from 'sockets/emitters/leaveRoomEmitter'
import SocketEvents from 'constants/enums/socketEvents'
import { useGetDoctorProfile } from 'network/ReactQuery/Queries/DoctorsProfile/useDoctorsprofile'
import AudioCall from 'components/Call/voice'
import VideoCall from 'components/Call/video'
import { useCall } from 'hooks/useCall'

const DoctorMessages = () => {
  const [startVideoCall, setStartVideoCall] = useState(false)
  const [startVoiceCall, setStartVoiceCall] = useState(false)
  const [isJoiningCall, setIsJoiningCall] = useState(false)
  const [isVidChatEnabled, setIsVidChatEnabled] = useState(false)
  const [isSessionActive, setIsSessionActive] = useState(true)
  const [isChatActive, setIsChatActive] = useState(false)
  const [addNote, setAddNote] = useState(false)
  const router = useRouter()
  const [callState, callDispatch] = useCall()

  const { doctorsProfile } = useGetDoctorProfile()
  console.log('docprofile', doctorsProfile)
  const callerInfo: {
    firstName: string
    lastName: string
    profilePics: string
  } = {
    firstName: doctorsProfile?.data.firstName,
    lastName: doctorsProfile?.data.lastName,
    profilePics: doctorsProfile?.data.profilePics,
  }
  const handleAddNote = () => setAddNote(true)

  const triggerVideoCall = () => {
    shallowPush('video', router)
    callDispatch({ type: 'MAKE_VIDEO_CALL' })
    setStartVoiceCall(false)
  }

  const triggerVoiceCall = () => {
    shallowPush('voice', router)
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
    useSocket(socketContextData, currentChat, DOCTOR, PATIENT)
  const selectChat = (chat: IClient) => {
    setIsChatActive(true)
    setCurrentChat((prevState: IClient) => {
      if (prevState && prevState?.id !== chat?.id) {
        leaveRoomEmitter(prevState?.id, socket, SocketEvents, loggedInUserId)
      }
      return chat
    })
  }
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

  useEffect(() => {
    return () => {
      leaveRoomEmitter(currentChat?.id, socket, SocketEvents, loggedInUserId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChat, socket])

  return (
    <>
      {addNote && (
        <AddNote open={addNote} handleClose={() => setAddNote(false)} />
      )}
      {!startVideoCall && !startVoiceCall ? (
        <>
          {/*
           TO BE IMPLEMENTED - ADD NOTE / VIEW NOTE 
           <div className={styles.topTab}>
            <div className={styles.head}>Recent chats</div>
            <div className={styles.moveRight}>
              <Button
                wd="50px"
                hg="50px"
                color="secondary"
                className={styles.presBtn}
                onClick={() => handleAddNote()}
              >
                Add note
              </Button>
              <Button
                wd="40px"
                hg="50px"
                color="primary"
                className={styles.presBtn2}
              >
                View note
              </Button>
            </div>
          </div> */}
          <div className={styles.doctorsTab}>
            {chatUsers &&
              chatUsers?.slice(-3)?.map((doc: any) => (
                <React.Fragment key={doc.userId}>
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

export default DoctorMessages
