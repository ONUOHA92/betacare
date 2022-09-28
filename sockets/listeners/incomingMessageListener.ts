export const incomingMessageListener = (
  socket: any,
  SocketEvents: any,
  addStyleToReceivedMessages: any,
  messagesContainer: any
) => {
  socket.on(SocketEvents.SEND_MESSAGE, (data) => {
    let div = messagesContainer.current
    const p = document.createElement('p')
    p.textContent = data.message
    addStyleToReceivedMessages(p)
    div.appendChild(p)
  })
  return () => {
    socket.off(SocketEvents.SEND_MESSAGE, (data) => console.log(data))
  }
}
