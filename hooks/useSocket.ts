/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react'
import { DOCTOR, PATIENT, PATIENT_ROLE } from '../constants/constants'
import { useChatUsers } from './../network/ReactQuery/Queries/ChatUsers/useChatUsers'
import { userAtom } from './../recoilStore/Atoms/userAtom'
import { useRecoilValue } from 'recoil'
import SocketEvents from 'constants/enums/socketEvents'
import { socketConnectionListener } from 'sockets/listeners/connectionListener'
import axios from 'axios'
import { baseUrl } from 'network/config/api'
import { headerGenerator } from 'utils/general/generateHeader'

export default function useSocket(
  socket: any,
  currentChat: any,
  type: 'PATIENT' | 'DOCTOR',
  counterParty: 'PATIENT' | 'DOCTOR'
) {
  const {
    email,
    id,
    token,
    roles,
    id: loggedInUserId,
  } = useRecoilValue(userAtom)

  const [chatMessages, setChatMessages] = useState([])
  const [arrivalMessage, setArrivalMessage] = useState(null)

  const currentUser = {
    id,
    email,
  }

  const { chatUsers } = useChatUsers(roles[0])

  const sendMsg = (msg: string, sendTo: string) => {
    const userType = roles[0] === PATIENT_ROLE ? PATIENT : DOCTOR
    const data = {
      sender: { id: id?.toString(), userType },
      receiver: {
        id: sendTo?.toString(),
        userType: userType === PATIENT ? DOCTOR : PATIENT,
      },
      message: msg,
      token: token,
    }
    if (socket) {
      socket.emit(SocketEvents.SEND_MESSAGE, data)
      const msgs = [...chatMessages]
      msgs.push({ sender: type, message: msg })
      setChatMessages(msgs)
    }
  }

  useEffect(() => {
    if (arrivalMessage?.id === currentChat?.id?.toString()) {
      setChatMessages((prev) => [...prev, arrivalMessage])
    }
  }, [arrivalMessage])

  useEffect(() => {
    socketConnectionListener(socket, SocketEvents, currentUser)
  }, [])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${baseUrl}/api/message/retrieve?userId=${currentChat?.id}&size=500`,
          headerGenerator(token)
        )
        setChatMessages(response?.data?.content)
      } catch (error) {
        console.error(error)
      }
    }
    if (currentChat) {
      fetchData()
    }
  }, [currentChat])

  useEffect(() => {
    if (id) {
      socket.on(
        SocketEvents.SEND_MESSAGE,
        (msg: { message: string; sender: string }) => {
          setArrivalMessage({
            message: msg.message,
            sender: counterParty,
            id: msg.sender,
          })
        }
      )
    }
    return () => {
      socket.off(SocketEvents.SEND_MESSAGE)
    }
  }, [socket])

  return [chatMessages, chatUsers, sendMsg, id, socket, loggedInUserId]
}
