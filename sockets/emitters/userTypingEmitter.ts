export const userTypingEmitter = (
  currentUser: any,
  id: any,
  socket: any,
  SocketEvents: any
) => {
  if (currentUser == null) return
  const data = {
    sender: currentUser.id,
    receiver: id,
    status: true,
  }
  socket.emit(SocketEvents.NOTIFY_TYPING, data)
}
