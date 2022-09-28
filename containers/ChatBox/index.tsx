import React, { useEffect, useRef, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import LargeCardWithChildren from 'components/LargeCardWithChildren'
import styles from 'containers/PatientMessage/styles.module.css'
import myStyles from './style.module.css'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import IconButton from '@mui/material/IconButton'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { statusTracker } from 'utils/messaging/status-tracker'
import SocketEvents from 'constants/enums/socketEvents'
import { IOtherMessage } from 'interface/message'
import { DOCTOR, PATIENT } from 'constants/constants'
import {
  useChatNotifications,
  useCleanUpChatNotifications,
} from 'network/ReactQuery/Queries/ChatNotifications/useChatNotifications'
import { NotificationContext } from 'containersDoctors/DashboardLayout'
import { NotificationContext as NotificationContextPatient } from 'containers/DashboardLayout'
import { START_TYPING } from 'constants/chat'
import { IOtherNotification, IRefMessage, IServerSignal } from 'interface/chat'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { chatNotificationsAtom } from 'recoilStore/Atoms/chatAtom'

import { useCallState } from 'context/callContext'

interface Props {
  getBg?: Function
  triggerVoiceCall?: Function
  triggerVideoCall?: Function
  isSessionActive?: boolean
  isVidChatEnabled?: boolean
  currentChat?: any
  sendMsg?: Function
  socket?: any
  chatMessages?: any[]
  loggedInUserId?: number
  onlineUsers?: string[]
  patient?: boolean
}

const ChatBox = ({
  getBg,
  triggerVoiceCall,
  triggerVideoCall,
  isVidChatEnabled,
  isSessionActive,
  currentChat,
  sendMsg,
  socket,
  chatMessages,
  loggedInUserId,
  onlineUsers,
  patient,
}: React.PropsWithChildren<Props>) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null)
  const { refetchChatNotifications } = useChatNotifications()
  const setNewNotification = useSetRecoilState(chatNotificationsAtom)

  const newNotification = useRecoilValue(chatNotificationsAtom)
  const clientInRetrospect = patient ? PATIENT : DOCTOR
  const updateNotifications = useSetRecoilState(chatNotificationsAtom)
  const messageBoxRef = useRef()
  const refMessage = useRef()
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const [text, setText] = useState('')
  const [renderComp, setRenderComp] = useState(0)

  const triggerSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (text) {
      sendMsg(text, currentChat?.id)
      setText('')
    }
  }

  const [, dispatch] = useCallState()

  const scrollDivToBottom = (messageBoxRef: React.MutableRefObject<any>) => {
    messageBoxRef.current !== null &&
      messageBoxRef?.current?.scrollIntoView({
        behaviour: 'smooth',
        block: 'end',
      })
    document?.body?.scrollIntoView(false)
  }

  useEffect(() => {
    ;(refMessage as IRefMessage).current = chatMessages
    chatMessages?.length > 0 && scrollDivToBottom(messageBoxRef)
  }, [chatMessages])

  useEffect(() => {
    const data = {
      owner: currentChat?.id.toString(),
      guest: loggedInUserId?.toString(),
    }
    socket?.emit(SocketEvents.JOINROOM, data)

    const userNoti = newNotification?.filter(
      (noti: IOtherNotification) => noti.userId !== currentChat?.id?.toString()
    )

    updateNotifications(userNoti)
    setNewNotification(userNoti)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChat])

  const { cleanUpNotify } = useCleanUpChatNotifications(currentChat?.id)

  useEffect(() => {
    if (cleanUpNotify?.message) {
      refetchChatNotifications()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cleanUpNotify])

  useEffect(() => {
    scrollDivToBottom(messageBoxRef)
  }, [socket, chatMessages])

  useEffect(() => {
    socket?.on(SocketEvents.MESSAGE_SENT, (data: IServerSignal) => {
      if ((refMessage as IRefMessage)?.current?.length <= 1) {
        const newMsgId = 1
        const [firstItem] = (refMessage as IRefMessage)?.current?.slice(-1)
        firstItem['id'] = newMsgId
        setRenderComp(newMsgId)
      } else {
        if (refMessage) {
          const [secondToLastItem] = (
            refMessage as IRefMessage
          )?.current?.slice(-2)
          const [lastItem] = (refMessage as IRefMessage)?.current?.slice(-1)
          if (data && lastItem && secondToLastItem) {
            const newMsgId = Number(secondToLastItem?.id) + 1
            lastItem['id'] = newMsgId
            setRenderComp(newMsgId)
          }
        }
      }
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, refMessage])

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        sx={{ marginLeft: '-5rem', marginTop: '-1.5rem' }}
        PaperProps={{
          style: {
            boxShadow: 'none',
            border: '1px solid #E5E5E5',
          },
        }}
      >
        <Typography sx={{ width: 113, height: 78 }}>
          <div className={myStyles.callFlex}>
            <div
              className={myStyles.voiceCall}
              onClick={() => {
                triggerVoiceCall()
              }}
            >
              Voice call
            </div>
            <div
              className={myStyles.videoCall}
              onClick={() => triggerVideoCall()}
            >
              Video call
            </div>
          </div>
        </Typography>
      </Popover>

      <div
        className={`${styles.box} ${styles.makeRelative} ${
          isVidChatEnabled ? styles.removeMarginTop : ''
        } `}
      >
        <LargeCardWithChildren
          wd={isVidChatEnabled ? '385px' : '488px'}
          hg={isVidChatEnabled ? '771px' : '793px'}
          maxw="100%"
          removeMargins={true}
        >
          <div className={`${styles.wrapper} ${styles.pdTopZero}`}>
            <>
              <div className={styles.card} style={{ position: 'sticky' }}>
                <div className={styles.left}>
                  <div className={styles.makerelative}>
                    <Avatar
                      src={currentChat?.profileImage}
                      sx={{ width: 69, height: 69 }}
                      alt="client avatar"
                    />
                    <span
                      className={styles.circlebadge}
                      style={{
                        background: getBg(
                          statusTracker(
                            onlineUsers,
                            currentChat?.id?.toString()
                          )
                        ),
                      }}
                    ></span>
                  </div>
                  <div>
                    <div
                      className={styles.cardname}
                    >{`${currentChat?.firstName} ${currentChat?.lastName}`}</div>
                    {!patient && (
                      <div className={styles.cardtitle}>
                        {currentChat?.areaOfSpecialization}
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.right} ${styles.bkground}`}
                  aria-describedby={id}
                  onClick={handleClick}
                >
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.6155 0.479261L12.4747 0.738461C13.241 0.969302 13.9255 1.41429 14.4474 2.02104C14.9693 2.62779 15.307 3.37104 15.4207 4.16326C15.7771 6.64486 14.9803 9.54646 13.0591 12.8741C11.1427 16.1933 9.0331 18.3317 6.7111 19.2677C5.96503 19.5683 5.1483 19.6485 4.35802 19.4985C3.56774 19.3485 2.83714 18.9748 2.2531 18.4217L1.6015 17.8049C1.17934 17.405 0.916716 16.8655 0.86242 16.2865C0.808125 15.7076 0.965856 15.1286 1.3063 14.6573L2.9335 12.4013C3.15349 12.0967 3.46328 11.8686 3.81943 11.7489C4.17558 11.6293 4.56024 11.6241 4.9195 11.7341L7.3807 12.4865L7.4443 12.4985C7.7155 12.5381 8.3407 11.9513 9.1207 10.6001C9.9367 9.18646 10.1071 8.35966 9.8815 8.14606L8.6287 6.97846C8.17121 6.55167 7.85878 5.99238 7.73525 5.37904C7.61173 4.7657 7.68329 4.12907 7.9399 3.55846L8.7319 1.79326C8.97083 1.26155 9.39511 0.834966 9.92552 0.593166C10.4559 0.351366 11.0562 0.310878 11.6143 0.479261H11.6155ZM9.8275 2.28526L9.0343 4.05046C8.88006 4.39274 8.83693 4.77474 8.91097 5.14279C8.98501 5.51085 9.1725 5.84645 9.4471 6.10246L10.7023 7.27126C11.5063 8.03086 11.2399 9.33046 10.1611 11.2001C9.1447 12.9593 8.2183 13.8281 7.2235 13.6769L7.0747 13.6457L4.5691 12.8813C4.44933 12.8445 4.32105 12.8461 4.20226 12.8859C4.08346 12.9257 3.98011 13.0017 3.9067 13.1033L2.2795 15.3593C2.10911 15.595 2.03015 15.8846 2.0573 16.1742C2.08445 16.4638 2.21586 16.7337 2.4271 16.9337L3.0787 17.5505C3.49589 17.9453 4.01765 18.2121 4.582 18.319C5.14634 18.426 5.72954 18.3688 6.2623 18.1541C8.2999 17.3333 10.2259 15.3809 12.0199 12.2741C13.8175 9.16006 14.5447 6.51166 14.2327 4.33366C14.1515 3.76763 13.9103 3.23659 13.5374 2.80309C13.1645 2.36959 12.6754 2.0517 12.1279 1.88686L11.2675 1.62766C10.9886 1.54384 10.6886 1.56434 10.4237 1.68533C10.1587 1.80633 9.94683 2.01956 9.8275 2.28526Z"
                      fill="#1F56C3"
                    />
                  </svg>
                </div>
              </div>
              <div className={styles.chatmsg} ref={messageBoxRef}>
                {chatMessages?.map((message: IOtherMessage, index: number) => {
                  return (
                    <React.Fragment key={index}>
                      <div
                        className={
                          patient
                            ? message?.sender === PATIENT
                              ? styles.myMsg
                              : styles.doctorMsg
                            : message?.sender === DOCTOR
                            ? styles.myMsg
                            : styles.doctorMsg
                        }
                      >
                        {message?.message}
                        &nbsp;
                        {message?.id && message?.sender === clientInRetrospect && (
                          <div className={styles.chatmsgContainer}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke="rgba(192,192,192, .9)"
                                strokeLinecap="round"
                                strokeWidth="1.5"
                                d="M1.5 12.5l4.076 4.076a.6.6 0 00.848 0L9 14M16 7l-4 4"
                              ></path>
                              <path
                                stroke="rgba(192,192,192, .9)"
                                strokeLinecap="round"
                                strokeWidth="1.5"
                                d="M7 12l4.576 4.576a.6.6 0 00.848 0L22 7"
                              ></path>
                            </svg>
                          </div>
                        )}
                      </div>
                    </React.Fragment>
                  )
                })}
              </div>
            </>
          </div>
          {isSessionActive ? (
            <div className={styles.fixBottom}>
              <Paper
                component="form"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: 455,
                  maxWidth: '100%',
                  height: 62,
                }}
                onSubmit={triggerSendMessage}
              >
                <IconButton sx={{ p: '10px' }} aria-label="menu">
                  <svg
                    width="22"
                    height="20"
                    viewBox="0 0 22 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.5 15.9999C9.5 15.9999 5 20.4999 2.75 18.2499C0.5 15.9999 1.25 12.9999 5 9.99987C8.75 6.99987 11 6.24987 12.5 9.24987M12.5 3.99987C12.5 3.99987 17 -0.500127 19.25 1.74987C21.5 3.99987 20.75 6.99987 17 9.99987C13.25 12.9999 11 13.7499 9.5 10.7499L12.5 3.99987Z"
                      stroke="#999999"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </IconButton>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder={START_TYPING}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  inputProps={{ 'aria-label': START_TYPING }}
                />
                <div className={styles.adjustFlex}>
                  <IconButton
                    color="primary"
                    sx={{ width: 57, height: '100%' }}
                    aria-label="directions"
                    className={styles.sendIcon}
                    type="submit"
                  >
                    <svg
                      width="19"
                      height="19"
                      viewBox="0 0 19 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.4236 1.16626C18.3241 1.06717 18.1985 0.998559 18.0614 0.968502C17.9243 0.938445 17.7814 0.948189 17.6497 0.996589L1.43417 6.89823C1.29432 6.95132 1.17392 7.04573 1.08896 7.16893C1.004 7.29213 0.958496 7.43829 0.958496 7.58798C0.958496 7.73768 1.004 7.88383 1.08896 8.00703C1.17392 8.13023 1.29432 8.22465 1.43417 8.27774L8.51003 11.1105L11.3404 18.1925C11.3935 18.3263 11.4847 18.4416 11.6026 18.5242C11.7205 18.6068 11.8599 18.653 12.0037 18.6572C12.1527 18.6542 12.2972 18.606 12.4183 18.5191C12.5393 18.4322 12.6312 18.3106 12.6818 18.1704L18.5784 1.94085C18.6286 1.81033 18.6407 1.66822 18.6133 1.53107C18.5859 1.39393 18.5201 1.26741 18.4236 1.16626V1.16626ZM12.0037 15.854L9.94731 10.69L13.4779 7.15643L12.4386 6.11626L8.87856 9.67938L3.74856 7.59167L16.6694 2.922L12.0037 15.854Z"
                        fill="white"
                      />
                    </svg>
                  </IconButton>
                </div>
              </Paper>
            </div>
          ) : (
            <div className={styles.endSession}>
              <div className={styles.endSessionT1}>
                This consultation has ended.
              </div>
              <div className={styles.endSessionT2}>
                You can request a follow up consultation with this doctor for
                half the price.
              </div>
              <div className={styles.endSessionT3}>
                <Link href="/" passHref>
                  <span className={styles.endSessionT3Link}>Click here</span>
                </Link>{' '}
                to request a follow up consultation.
              </div>
            </div>
          )}
        </LargeCardWithChildren>
      </div>
    </>
  )
}

export default ChatBox
