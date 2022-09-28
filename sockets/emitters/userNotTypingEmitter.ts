export const userNotTypingEmitter = async (
  currentUser: any,
  id: any,
  socket: any,
  SocketEvents: any
) => {
  if (currentUser == null) return
  const data = {
    sender: currentUser.id,
    receiver: id,
    status: false,
  }
  socket.emit(SocketEvents.NOTIFY_TYPING, data)
}
