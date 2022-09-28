export const sendMessageEmitter = (
  e: any,
  textContainer: any,
  socket: any,
  SocketEvents: any,
  messagesContainer: any,
  currentUser: any,
  addStyleToSentMessages: any
) => {
  const id = e.target.id.toString()
  const message = textContainer.current.value
  textContainer.current.value = ''
  let userType = currentUser.userType
  const data = {
    sender: { id: currentUser.id.toString(), userType },
    receiver: { id, userType: userType === 'PATIENT' ? 'DOCTOR' : 'PATIENT' },
    message,
    token: currentUser.token,
  }
  let div = messagesContainer.current
  const p = document.createElement('p')
  p.textContent = message
  addStyleToSentMessages(p)
  div.appendChild(p)
  socket.emit(SocketEvents.SEND_MESSAGE, data)
}
